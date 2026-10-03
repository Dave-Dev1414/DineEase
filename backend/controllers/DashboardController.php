<?php

require_once __DIR__ . "/../models/Restaurant.php";
require_once __DIR__ . "/../models/Dish.php";

class DashboardController
{
    private Restaurant $restaurantModel;
    private Dish $dishModel;

    public function __construct(PDO $db)
    {
        $this->restaurantModel = new Restaurant($db);
        $this->dishModel = new Dish($db);
    }

    public function getDashboardData(int $userId): array
    {
        return [
            "restaurants" => $this->restaurantModel->findDiscoverable(),
            "dishes" => $this->dishModel->findAvailableForDiscovery()
        ];
    }
}
