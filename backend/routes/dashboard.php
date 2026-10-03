<?php
session_start();
require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../controllers/DashboardController.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "You are not logged in."
    ]);
    exit;
}

$dashboardController = new DashboardController($pdo);

try {
    $data = $dashboardController->getDashboardData(
        (int) $_SESSION["user_id"]
    );

    echo json_encode([
        "success" => true,
        "data" => $data
    ]);
} catch (Exception $e) {
    error_log($e->getMessage());

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to load dashboard data."
    ]);
}