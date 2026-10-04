<?php

session_start();

require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../controllers/RestaurantController.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);

    exit;
}

$restaurantController = new RestaurantController($pdo);

try {
    $restaurants = $restaurantController->getDiscoverableRestaurants();

    echo json_encode([
        "success" => true,
        "data" => [
            "restaurants" => $restaurants
        ]
    ]);
} catch (Exception $e) {
    error_log($e->getMessage());

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to load restaurants."
    ]);
}