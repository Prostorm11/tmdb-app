<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OptionsController
{
    #[Route('/api/{path}', requirements: ['path' => '.*'], methods: ['OPTIONS'])]
    public function options(): Response
    {
        return new Response('', Response::HTTP_NO_CONTENT);
    }
}