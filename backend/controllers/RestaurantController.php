<?php

require_once __DIR__ . "/../models/Restaurant.php";

class RestaurantController
{
    private Restaurant $restaurantModel;

    public function __construct(PDO $db)
    {
        $this->restaurantModel = new Restaurant($db);
    }

    public function getDiscoverableRestaurants(): array
    {
        return $this->restaurantModel->findDiscoverable();
    }

    public function getRestaurantById(int $id): ?array
    {
        return $this->restaurantModel->findById($id);
    }
}