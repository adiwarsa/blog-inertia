<?php
namespace App\Markdown\Youtube;

use League\CommonMark\Node\Node;

final class YouTubeIframe extends Node
{
    private YouTubeUrlInterface $url;

    public function setUrl(YouTubeUrlInterface $url): YouTubeIframe
    {
        $this->url = $url;

        return $this;
    }

    public function getUrl(): YouTubeUrlInterface
    {
        return $this->url;
    }
}