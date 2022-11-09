<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs('uploadable');
            $table->text('filename')->nullable();
            $table->string('disk', 32)->default('local');
            $table->string('path')->nullable();
            $table->string('mimetype', 50)->nullable();
            $table->string('ext', 10)->nullable();
            $table->integer('size')->nullable();
            $table->text('url');
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
        Schema::dropIfExists('files');
    }
}
