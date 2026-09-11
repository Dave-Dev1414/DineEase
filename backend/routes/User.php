<?php

require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../controllers/UserController.php";
require_once __DIR__ . "/../exceptions/ValidationException.php";
require_once __DIR__ . "/../exceptions/DuplicateEmailException.php";

header("Content-Type: application/json");

$userController = new UserController($pdo);

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["token"])) {
    $token = $_GET["token"];

    try {
        $userController->verifyEmail($token);

        echo json_encode([
            "success" => true,
            "message" => "Your email has been verified successfully."
        ]);
    } catch (ValidationException $e) {
        http_response_code(400);

        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
    }

    exit;
}

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

        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Account created successfully.",
            "user_id" => $userId
        ]);
    } catch (Exception $e) {
        http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
} catch (DuplicateEmailException $e) {
    http_response_code(409);

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