<?php

use App\Subdivision;
use Illuminate\Database\Seeder;

class SubdivisionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (Schema::hasTable('subdivisions')) {

            Subdivision::create([
                "name" => 'Փաթեթավորում',

            ]);
            Subdivision::create([
                "name" => 'Պարարտանյութեր',

            ]);
            Subdivision::create([
                "name" => 'Թունաքիմիկատներ',

            ]);
        }
    }
}
