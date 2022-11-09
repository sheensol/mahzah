<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("slug");
            $table->text("description_min")->nullable();
            $table->text("description_max")->nullable();
            $table->string("language")->default("English");
            $table->string("img")->nullable();
            $table->string("status")->default('Draft');
            $table->float('price')->default(0);
            $table->boolean("is_free_course")->default(0);
            $table->boolean("is_private")->default(0);
            $table->boolean("is_hidden")->default(0);
            $table->text("meta_keywords")->nullable();
            $table->text("meta_description")->nullable();
            $table->boolean("enable_drip_content")->default(0);
            $table->integer('instructor_id')->nullable()->index();
            $table->integer('creator_id')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
