<?php

require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../controllers/UserController.php";

$userController = new UserController($pdo);