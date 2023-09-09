<?php

if (! function_exists('flashMessage')) {
    function flashMessage($title, $message, $type = 'success'): void
    {
        session()->flash('title', $title);
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}