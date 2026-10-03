<?php

class Dish
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function findAvailableForDiscovery(): array
    {
        $stmt = $this->db->prepare("
            SELECT
                dishes.*,
                restaurants.name AS restaurant_name
            FROM dishes
            INNER JOIN restaurants
                ON restaurants.id = dishes.restaurant_id
            WHERE dishes.is_available = TRUE
            AND restaurants.is_active = TRUE
            AND restaurants.verification_status = 'VERIFIED'
            ORDER BY dishes.created_at DESC
        ");

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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
