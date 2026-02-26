FROM php:8.3-cli

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends git unzip libzip-dev curl \
  && docker-php-ext-install zip \
  && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

EXPOSE 8000