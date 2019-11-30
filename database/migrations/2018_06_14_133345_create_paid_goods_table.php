<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaidGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paid_goods', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('good_id');
            $table->foreign('good_id')
                ->references('id')
                ->on('goods')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->integer('amt');
            $table->integer('balance');
            $table->string('release_date');
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
        Schema::dropIfExists('paid_goods');
    }
}
