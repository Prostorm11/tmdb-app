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

    #[Route('/api/movies/{id}', methods: ['GET'])]
public function movieDetail(int $id, TmdbClient $tmdb): JsonResponse
{
    $data = $tmdb->get("/movie/{$id}", ['language' => 'en-US']);
    return $this->json($this->normalizeMoviesDetail($data));
}

    #[Route('/api/tv/{id}', methods: ['GET'])]
    public function tvDetail(int $id, TmdbClient $tmdb): JsonResponse
    {
        $data = $tmdb->get("/tv/{$id}", ['language' => 'en-US']);
        return $this->json($this->normalizeTvDetail($data));
    }

    // ... in TmdbController

    private function normalizeMoviesDetail(array $m): array
    {
        $poster = !empty($m['poster_path']) ? 'https://image.tmdb.org/t/p/w780' . $m['poster_path'] : null;
        $backdrop = !empty($m['backdrop_path']) ? 'https://image.tmdb.org/t/p/original' . $m['backdrop_path'] : null;

        return [
            'id'       => $m['id'] ?? null,
            'title'    => $m['title'] ?? $m['original_title'] ?? '',
            'poster'   => $poster,
            'backdrop' => $backdrop,
            'rating'   => $m['vote_average'] ?? null,
            'date'     => $m['release_date'] ?? null,
            'overview' => $m['overview'] ?? '',
            'tagline'  => $m['tagline'] ?? '',
            'runtime'  => $m['runtime'] ? $m['runtime'] . ' min' : null,
            'genres'   => array_map(fn($g) => $g['name'], $m['genres'] ?? []),
            'status'   => $m['status'] ?? null,
            // Add more later if needed: budget, revenue, homepage, etc.
        ];
    }

    private function normalizeTvDetail(array $t): array
    {
        $poster = !empty($t['poster_path']) ? 'https://image.tmdb.org/t/p/w780' . $t['poster_path'] : null;
        $backdrop = !empty($t['backdrop_path']) ? 'https://image.tmdb.org/t/p/original' . $t['backdrop_path'] : null;

        $episodeRuntime = !empty($t['episode_run_time']) ? $t['episode_run_time'][0] ?? null : null;

        return [
            'id'                => $t['id'] ?? null,
            'name'              => $t['name'] ?? $t['original_name'] ?? '',
            'poster'            => $poster,
            'backdrop'          => $backdrop,
            'rating'            => $t['vote_average'] ?? null,
            'date'              => $t['first_air_date'] ?? null,
            'overview'          => $t['overview'] ?? '',
            'tagline'           => $t['tagline'] ?? '',
            'genres'            => array_map(fn($g) => $g['name'], $t['genres'] ?? []),
            'number_of_seasons' => $t['number_of_seasons'] ?? null,
            'number_of_episodes'=> $t['number_of_episodes'] ?? null,
            'episode_runtime'   => $episodeRuntime ? $episodeRuntime . ' min/ep' : null,
            'status'            => $t['status'] ?? null,
            // Bonus: 'created_by' => array_map(fn($c) => $c['name'], $t['created_by'] ?? []),
        ];
    }
}