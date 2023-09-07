<?php
namespace App\Models\Enums;

enum ArticleStatusEnum: int
{
    case Draft = 1;
    case Published = 2;
    case Scheduled = 3;
    case Archived = 4;
}