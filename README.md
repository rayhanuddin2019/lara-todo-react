
## Setup Instruction


- clone project from github
- run cmd -> npm i
- run cmd -> composer update
- run cmd -> npm run build
- update database DB_DATABASE and sanctrun config in .env file
- Update APP_URL, SESSION_DOMAIN, SANCTUM_STATEFUL_DOMAINS in .env
- run cmd -> php artisan key:generate
- run cmd -> php artisan migrate

## Video Instruction
https://www.awesomescreenshot.com/video/35661409?key=08a29e54647ed555bd37d291f511cb16

Note: if you would like to remove public from url need to change in public/index.php and keep project in a folder 

      `  // Register the Composer autoloader...
        require __DIR__.'/../vendor/autoload.php';
        
        // Bootstrap Laravel and handle the request...
        (require_once __DIR__.'/../bootstrap/app.php')
            ->handleRequest(Request::capture()); `


