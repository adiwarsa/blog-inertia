<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
        $table->id();
        $table->string('thumbnail')->nullable();
        $table->foreignId('author_id')->constrained('users')->cascadeOnDelete();
        $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
        $table->string('title');
        $table->string('slug');
        $table->text('excerpt')->nullable();
        $table->longText('body');
        $table->integer('status')->default(\App\Models\Enums\ArticleStatusEnum::Draft->value);
        $table->timestamp('published_at')->nullable();
        $table->timestamp('scheduled_at')->nullable();
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
