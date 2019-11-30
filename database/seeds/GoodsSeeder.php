<?php


use Illuminate\Database\Seeder;
use App\Good;

class GoodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (Schema::hasTable('goods')) {

            $good_name = [
                'Արկղ',
                'Ռեզին',
                'Պարարտանյութ',
                'Թուղթ',
                'Փաթեթ',
                'Ժապավեն',
                'Դույլ',
                'Կրիշկա',
            ];
            $good_unit = [
                'հատ',
                'տուփ',
                'կգ',
                'տուփ',
                'հատ',
                'մետր',
                'հատ',
                'հատ',

            ];
            $good_price = [
                100,
                500,
                200,
                250,
                300,
                350,
                1000,
                1000
            ];
            $id = [1,2,1,2,1,2,1,2];
            for($i = 0; $i < count($good_name); $i++){
                $good = new Good;
                $good->name = $good_name[$i];
                $good->unit = $good_unit[$i];
                $good->price = $good_price[$i];
                $good->place()->associate($id[$i]);
                $good->subdivision()->associate($id[$i]);
                $good->supplier()->associate($id[$i]);
                $good->save();
            }
        }
    }
}
