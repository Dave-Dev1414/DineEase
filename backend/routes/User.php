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

if (
    $_SERVER["REQUEST_METHOD"] === "POST" &&
    isset($_GET["action"]) &&
    $_GET["action"] === "resend-verification"
) {
    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data["email"] ?? "";

    try {
        $userController->resendVerificationEmail($email);

        echo json_encode([
            "success" => true,
            "message" => "A new verification email has been sent."
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
    } catch (DuplicateEmailException $e) {
        http_response_code(409);

        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
    } catch (ValidationException $e) {
        http_response_code(400);

        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
    } catch (Exception $e) {
        error_log($e->getMessage());

        http_response_code(500);

        echo json_encode([
            "success" => false,
            "message" => "Something went wrong while processing your request."
        ]);
    }

    exit;
}

http_response_code(405);

echo json_encode([
    "success" => false,
    "message" => "Method not allowed."
]);