<?php
$sessionTimeout = 30 * 60;
session_start();
if (isset($_SESSION["last_activity"])) {
    if (time() - $_SESSION["last_activity"] > $sessionTimeout) {
        session_unset();
        session_destroy();
        session_start();
    }
}

$_SESSION["last_activity"] = time();

require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../controllers/UserController.php";
require_once __DIR__ . "/../exceptions/ValidationException.php";
require_once __DIR__ . "/../exceptions/DuplicateEmailException.php";

header("Content-Type: application/json");

$userController = new UserController($pdo);
if (!isset($_SESSION["user_id"]) && isset($_COOKIE["dineease_remember"])) {
    $token = $_COOKIE["dineease_remember"];
    $tokenHash = hash("sha256", $token);

    $rememberedSession = $userController->findRememberedSession($tokenHash);

    if ($rememberedSession) {
        session_regenerate_id(true);
        $_SESSION["user_id"] = $rememberedSession["user_id"];
        $userController->updateRememberedSessionUsage(
            $rememberedSession["id"]
        );
    } else {
        setcookie(
            "dineease_remember",
            "",
            [
                "expires" => time() - 3600,
                "path" => "/",
                "httponly" => true,
                "secure" => false,
                "samesite" => "Lax"
            ]
        );
    }
}

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

if (
    $_SERVER["REQUEST_METHOD"] === "POST" &&
    isset($_GET["action"]) &&
    $_GET["action"] === "login"
) {
    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data["email"] ?? "";
    $password = $data["password"] ?? "";
    $rememberMe = !empty($data["rememberMe"]);

    try {
        $user = $userController->loginUser(
    $email,
    $password,
    $rememberMe
       );

        session_regenerate_id(true);
        $_SESSION["user_id"] = $user["id"];
        if ($rememberMe && isset($user["remember_token"])) {
    setcookie(
        "dineease_remember",
        $user["remember_token"],
        [
            "expires" => time() + (30 * 24 * 60 * 60),
            "path" => "/",
            "httponly" => true,
            "secure" => false,
            "samesite" => "Lax"
        ]
    );
         }

        echo json_encode([
            "success" => true,
            "message" => "Login successful.",
            "user" => [
                "id" => $user["id"],
                "name" => $user["name"],
                "email" => $user["email"]
            ]
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

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_GET["action"]) && $_GET["action"] === "logout") {
    if (isset($_COOKIE["dineease_remember"])) {
        $tokenHash = hash("sha256", $_COOKIE["dineease_remember"]);

        $userController->deleteRememberedSession($tokenHash);

        setcookie(
            "dineease_remember",
            "",
            [
                "expires" => time() - 3600,
                "path" => "/",
                "httponly" => true,
                "secure" => false,
                "samesite" => "Lax"
            ]
        );
    }

    session_unset();
    session_destroy();

    echo json_encode([
        "success" => true,
        "message" => "Logout successful."
    ]);

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

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["action"]) && $_GET["action"] === "me") {
    if (!isset($_SESSION["user_id"])) {
        http_response_code(401);

        echo json_encode([
            "success" => false,
            "message" => "You are not logged in."
        ]);

        exit;
    }

    $user = $userController->getUserById($_SESSION["user_id"]);

    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user["id"],
            "name" => $user["name"],
            "email" => $user["email"]
        ]
    ]);

    exit;
}

http_response_code(405);

echo json_encode([
    "success" => false,
    "message" => "Method not allowed."
]);
