<?php

class User
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM users WHERE email = :email LIMIT 1"
        );

        $stmt->execute([
            "email" => $email
        ]);

        $user = $stmt->fetch();

        return $user ?: null;
    }

    public function create(string $name, string $email, string $passwordHash): int
    {
        $stmt = $this->db->prepare(
            "INSERT INTO users (name, email, password_hash)
             VALUES (:name, :email, :password_hash)"
        );

        $stmt->execute([
            "name" => $name,
            "email" => $email,
            "password_hash" => $passwordHash
        ]);

        return (int) $this->db->lastInsertId();
    }

    public function saveVerificationToken(
    int $userId,
    string $token,
    string $expiresAt
): void
{
    $checkStmt = $this->db->prepare(
        "SELECT id FROM users WHERE id = :id LIMIT 1"
    );

    $checkStmt->execute([
        "id" => $userId
    ]);

    if (!$checkStmt->fetch()) {
        throw new Exception("User not found.");
    }

    $stmt = $this->db->prepare(
        "UPDATE users
         SET email_verification_token = :token,
             email_verification_expires_at = :expires_at
         WHERE id = :id"
    );

    $stmt->execute([
        "token" => $token,
        "expires_at" => $expiresAt,
        "id" => $userId
    ]);
}
         public function getVerificationToken(int $userId): ?string
{
    $stmt = $this->db->prepare(
        "SELECT email_verification_token
         FROM users
         WHERE id = :id
         LIMIT 1"
    );

    $stmt->execute([
        "id" => $userId
    ]);

    $user = $stmt->fetch();

    return $user["email_verification_token"] ?? null;
}
        public function findByVerificationToken(string $token): ?array
{
    $stmt = $this->db->prepare(
        "SELECT * FROM users
         WHERE email_verification_token = :token
         AND email_verification_expires_at > NOW()
         LIMIT 1"
    );

    $stmt->execute([
        "token" => $token
    ]);

    $user = $stmt->fetch();

    return $user ?: null;
}
       public function verifyEmail(int $userId): void
{
    $stmt = $this->db->prepare(
        "UPDATE users
         SET email_verified_at = NOW(),
             email_verification_token = NULL,
             email_verification_expires_at = NULL
         WHERE id = :id"
    );

    $stmt->execute([
        "id" => $userId
    ]);
}
}