<?php
namespace App\Markdown\Youtube;

interface YouTubeUrlParserInterface
{
    public function parse(string $url): ?YouTubeUrlInterface;
}