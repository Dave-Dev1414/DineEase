<?php

class EmailVerificationService
{
    public function generateToken(): string
    {
        return bin2hex(random_bytes(32));
    }
}