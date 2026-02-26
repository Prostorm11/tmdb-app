<?php

namespace App\Controller;

use App\Service\TmdbClient;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TmdbController extends AbstractController
{
    #[Route('/api/movies/top-rated', methods: ['GET'])]
    public function topRatedMovies(TmdbClient $tmdb): JsonResponse
    {
        $data = $tmdb->get('/movie/top_rated', ['language' => 'en-US', 'page' => 1]);
        return $this->json($this->normalizeMovies($data));
    }

    #[Route('/api/tv/top-rated', methods: ['GET'])]
    public function topRatedTv(TmdbClient $tmdb): JsonResponse
    {
        $data = $tmdb->get('/tv/top_rated', ['language' => 'en-US', 'page' => 1]);
        return $this->json($this->normalizeTv($data));
    }

    private function normalizeMovies(array $data): array
    {
        $results = array_map(fn(array $m) => [
            'id' => $m['id'] ?? null,
            'title' => $m['title'] ?? '',
            'poster' => !empty($m['poster_path']) ? 'https://image.tmdb.org/t/p/w342'.$m['poster_path'] : null,
            'rating' => $m['vote_average'] ?? null,
            'date' => $m['release_date'] ?? null,
            'overview' => $m['overview'] ?? '',
        ], $data['results'] ?? []);

        return ['page' => $data['page'] ?? 1, 'results' => $results];
    }

    private function normalizeTv(array $data): array
    {
        $results = array_map(fn(array $t) => [
            'id' => $t['id'] ?? null,
            'name' => $t['name'] ?? '',
            'poster' => !empty($t['poster_path']) ? 'https://image.tmdb.org/t/p/w342'.$t['poster_path'] : null,
            'rating' => $t['vote_average'] ?? null,
            'date' => $t['first_air_date'] ?? null,
            'overview' => $t['overview'] ?? '',
        ], $data['results'] ?? []);

        return ['page' => $data['page'] ?? 1, 'results' => $results];
    }
}