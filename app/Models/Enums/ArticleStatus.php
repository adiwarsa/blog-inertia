<?
namespace App\Models\Enums;

enum ArticleStatus: int
{
    case Draft = 1;
    case Published = 2;
    case Scheduled = 3;
    case Archived = 4;
}