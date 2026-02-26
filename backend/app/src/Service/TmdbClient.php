<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class TmdbClient
{
    public function __construct(
        private HttpClientInterface $httpClient,
        private string $tmdbBaseUrl,
        private string $tmdbApiKey,
    ) {}

    public function get(string $path, array $query = []): array
    {
        if (!$this->tmdbApiKey) {
            throw new \RuntimeException('TMDB_API_KEY is missing.');
        }

        $url = rtrim($this->tmdbBaseUrl, '/') . '/' . ltrim($path, '/');

        $response = $this->httpClient->request('GET', $url, [
            'query' => array_merge($query, [
                'api_key' => $this->tmdbApiKey, // TMDB v3 key
            ]),
        ]);

        return $response->toArray();
    }
}