<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropUploadableColumnsInFiles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->dropColumn('uploadable_type');
            $table->dropColumn('uploadable_id');
            $table->dropColumn('uploadable_section');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->nullableMorphs('uploadable');
            $table->string('uploadable_section')->after('uploadable_id')->nullable();
        });
    }
}
