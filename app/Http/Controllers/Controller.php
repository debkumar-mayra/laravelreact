<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public $per_page = 5;

    public function __construct() {
        
    }
}