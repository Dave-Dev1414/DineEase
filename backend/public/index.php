<?php

$requestUri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

if ($requestUri === "/dineease/api/users") {
    require_once __DIR__ . "/../routes/User.php";
    exit;
}

echo "Route not found";