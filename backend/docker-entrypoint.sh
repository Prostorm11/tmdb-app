#!/bin/sh
set -e

composer install --no-interaction

php -S 0.0.0.0:8000 -t public
