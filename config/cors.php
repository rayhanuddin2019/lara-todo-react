<?php 

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Specify the paths you want to apply CORS to
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost','http://127.0.0.1'], // Replace with the specific origin you want to allow
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
