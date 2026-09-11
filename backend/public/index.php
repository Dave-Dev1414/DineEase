<?php

require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../controllers/UserController.php";

$userController = new UserController($pdo);

$userId = $userController->createUser(
    "Test User",
    "controller-test@example.com",
    "test123"
);

echo "User created through controller with ID: " . $userId;