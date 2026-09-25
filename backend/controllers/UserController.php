<?php

require_once __DIR__ . "/../models/User.php";
require_once __DIR__ . "/../exceptions/ValidationException.php";
require_once __DIR__ . "/../exceptions/DuplicateEmailException.php";
require_once __DIR__ . "/../services/EmailVerificationService.php";
require_once __DIR__ . "/../services/EmailService.php";

class UserController
{
    private User $userModel;
    private EmailVerificationService $emailVerificationService;
    private EmailService $emailService;

    public function __construct(PDO $db)
    {
        $this->userModel = new User($db);
        $this->emailVerificationService = new EmailVerificationService();
        $this->emailService = new EmailService();
    }

    public function createUser(string $name, string $email, string $password): int
    {
        if (empty(trim($name))) {
            throw new ValidationException("Please enter your name.");
        }

        $email = trim($email);

        if (empty($email)) {
            throw new ValidationException("Please enter your email address.");
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new ValidationException("Please enter a valid email address.");
        }

        if (empty($password)) {
            throw new ValidationException("Please enter a password.");
        }

        if (strlen($password) < 8) {
            throw new ValidationException("Your password must be at least 8 characters.");
        }

        $existingUser = $this->userModel->findByEmail($email);

        if ($existingUser) {
            throw new DuplicateEmailException("An account with this email already exists.");
        }

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $userId = $this->userModel->create(
            $name,
            $email,
            $passwordHash
        );

        $token = $this->emailVerificationService->generateToken();

        $expiresAt = date(
            "Y-m-d H:i:s",
            strtotime("+1 hour")
        );

        $this->userModel->saveVerificationToken(
            $userId,
            $token,
            $expiresAt
        );

        $this->emailService->sendVerificationEmail(
            $name,
            $email,
            $token
        );

        return $userId;
    }

    public function verifyEmail(string $token): void
    {
        $user = $this->userModel->findByVerificationToken($token);

        if (!$user) {
            throw new ValidationException(
                "This verification link is invalid, has been used or has expired."
            );
        }

        $this->userModel->verifyEmail((int) $user["id"]);
    }

    public function resendVerificationEmail(string $email): void
    {
        $email = trim($email);

        $user = $this->userModel->findByEmail($email);

        if (!$user) {
            throw new ValidationException(
                "We couldn't find an account with that email address."
            );
        }

        if ($user["email_verified_at"]) {
            throw new ValidationException(
                "This email address has already been verified."
            );
        }

        if (!$this->userModel->canResendVerificationEmail((int) $user["id"])) {
            throw new ValidationException(
                "Please wait before requesting another verification email."
            );
        }

        $token = $this->emailVerificationService->generateToken();

        $expiresAt = date(
            "Y-m-d H:i:s",
            strtotime("+1 hour")
        );

        $this->userModel->saveVerificationToken(
            (int) $user["id"],
            $token,
            $expiresAt
        );

        $this->emailService->sendVerificationEmail(
            $user["name"],
            $user["email"],
            $token,
            true
        );
    }

    public function loginUser(
    string $email,
    string $password,
    bool $rememberMe = false
      ): array
    {
        $email = trim($email);

        if (empty($email)) {
            throw new ValidationException("Please enter your email address.");
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new ValidationException("Please enter a valid email address.");
        }

        if (empty($password)) {
            throw new ValidationException("Please enter your password.");
        }

        $user = $this->userModel->findByEmail($email);

        if (!$user || !password_verify($password, $user["password_hash"])) {
            throw new ValidationException("The email or password is incorrect.");
        }

        if (!$user["email_verified_at"]) {
            throw new ValidationException(
                "Please verify your email address before logging in."
            );
        }

        if ($rememberMe) {
    $token = bin2hex(random_bytes(32));
    $tokenHash = hash("sha256", $token);
    $expiresAt = date("Y-m-d H:i:s", time() + (30 * 24 * 60 * 60));

    $this->userModel->createRememberedSession(
        $user["id"],
        $tokenHash,
        $expiresAt
    );

    $user["remember_token"] = $token;
         }

         return $user;
    }

    public function getUserById(int $id): ?array
    {
        return $this->userModel->findById($id);
    }

    public function findRememberedSession(string $tokenHash): ?array
    {
    return $this->userModel->findRememberedSession($tokenHash);
    }
 
    public function updateRememberedSessionUsage(int $id): void
      {
    $this->userModel->updateRememberedSessionUsage($id);
     }

     public function deleteRememberedSession(string $tokenHash): void
     {
    $this->userModel->deleteRememberedSession($tokenHash);
      }
}
