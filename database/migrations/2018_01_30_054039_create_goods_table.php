<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('goods')) {
            Schema::create('goods', function (Blueprint $table) {
                $table->increments('id')->unique();
                $table->string('name')->unique();
                $table->string('unit');
                $table->integer('price');
                $table->integer('place_id');
                $table->foreign('place_id')
                    ->references('id')
                    ->on('places');
                $table->integer('subdivision_id');
                $table->foreign('subdivision_id')
                    ->references('id')
                    ->on('subdivisions');
                $table->integer('supplier_id');
                $table->foreign('supplier_id')
                    ->references('id')
                    ->on('suppliers')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
                $table->timestamps();
                $table->softDeletes();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('goods');
    }
}
