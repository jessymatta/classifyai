<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calls', function (Blueprint $table) {
            $table->id();
            $table->integer('operator_id');
            $table->string('cutomer_nbr');
            $table->string('audio_url');
            $table->string('duration');
            $table->decimal('positive_emotions_pct');
            $table->decimal('negative_emotions_pct');
            $table->decimal('neutral_emotions_pct');
            $table->string('script_url');
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
        Schema::dropIfExists('calls');
    }
};
