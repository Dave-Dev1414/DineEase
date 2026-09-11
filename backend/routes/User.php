<?php

require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../controllers/UserController.php";

header("Content-Type: application/json");

$userController = new UserController($pdo);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data["name"] ?? "";
    $email = $data["email"] ?? "";
    $password = $data["password"] ?? "";

    try {
        $userId = $userController->createUser(
            $name,
            $email,
            $password
        );

        echo json_encode([
            "success" => true,
            "message" => "Account created successfully.",
            "user_id" => $userId
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
    }

    exit;
}

echo json_encode([
    "success" => false,
    "message" => "Method not allowed."
]);