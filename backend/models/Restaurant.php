<?php

class Restaurant
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function findByOwnerId(int $ownerId): array
    {
        $stmt = $this->db->prepare("
            SELECT *
            FROM restaurants
            WHERE owner_id = :owner_id
            ORDER BY created_at DESC
        ");

        $stmt->execute([
            "owner_id" => $ownerId
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare("
            SELECT *
            FROM restaurants
            WHERE id = :id
            LIMIT 1
        ");

        $stmt->execute([
            "id" => $id
        ]);

        $restaurant = $stmt->fetch(PDO::FETCH_ASSOC);

        return $restaurant ?: null;
    }
}