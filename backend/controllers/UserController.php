<?php

require_once __DIR__ . "/../models/User.php";
require_once __DIR__ . "/../exceptions/ValidationException.php";
require_once __DIR__ . "/../exceptions/DuplicateEmailException.php";
require_once __DIR__ . "/../services/EmailVerificationService.php";

class UserController
{
    private User $userModel;
    private EmailVerificationService $emailVerificationService;

    public function __construct(PDO $db)
    {
        $this->userModel = new User($db);
        $this->emailVerificationService = new EmailVerificationService();
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

         
       return $userId;
       
       }
       public function verifyEmail(string $token): void
{
    $user = $this->userModel->findByVerificationToken($token);

    if (!$user) {
        throw new ValidationException(
            "This verification link is invalid or has expired."
        );
    }

    $this->userModel->verifyEmail((int) $user["id"]);
}
      }