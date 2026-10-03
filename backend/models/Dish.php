<?php

class Dish
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function findByRestaurantId(int $restaurantId): array
    {
        $stmt = $this->db->prepare("
            SELECT *
            FROM dishes
            WHERE restaurant_id = :restaurant_id
            ORDER BY created_at DESC
        ");

        $stmt->execute([
            "restaurant_id" => $restaurantId
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findAvailableByRestaurantId(int $restaurantId): array
    {
        $stmt = $this->db->prepare("
            SELECT *
            FROM dishes
            WHERE restaurant_id = :restaurant_id
            AND is_available = TRUE
            ORDER BY created_at DESC
        ");

        $stmt->execute([
            "restaurant_id" => $restaurantId
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}