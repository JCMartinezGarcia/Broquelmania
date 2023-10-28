<?php

namespace App\Models\Utils;

class ModelsUtils
{

    /**
     * 
     */
    public static function validateMatchingEmails($firstEmail, $secondEmail)
    {
        return $firstEmail === $secondEmail;
    }
}
