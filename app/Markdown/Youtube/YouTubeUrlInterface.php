<?php
namespace App\Markdown\Youtube;

interface YouTubeUrlInterface
{
    public function getVideoId(): string;

    public function getStartTimestamp(): ?string;
}