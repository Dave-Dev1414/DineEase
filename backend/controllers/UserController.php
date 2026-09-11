<?php

require_once __DIR__ . "/../models/User.php";

class UserController
{
    private User $userModel;

    public function __construct(PDO $db)
    {
        $this->userModel = new User($db);
    }

    public function createUser(string $name, string $email, string $password): int
    {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        return $this->userModel->create(
            $name,
            $email,
            $passwordHash
        );
    }
}