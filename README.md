
## Setup Instruction


- clone project from github
- run cmd -> npm i
- run cmd -> composer update
- run cmd -> npm run build
- update database DB_DATABASE and sanctrun config in .env file
- Update APP_URL, SESSION_DOMAIN, SANCTUM_STATEFUL_DOMAINS in .env
- run cmd -> php artisan key:generate
- run cmd -> php artisan migrate
