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
        $restaurants = $this->restaurantModel->findByOwnerId($userId);
        $dishes = [];

        foreach ($restaurants as $restaurant) {
            $restaurantDishes = $this->dishModel->findByRestaurantId($restaurant["id"]);

            foreach ($restaurantDishes as $dish) {
                $dish["restaurant_name"] = $restaurant["name"];
                $dishes[] = $dish;
            }
        }

        return [
            "restaurants" => $restaurants,
            "dishes" => $dishes
        ];
    }
}