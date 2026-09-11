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
}