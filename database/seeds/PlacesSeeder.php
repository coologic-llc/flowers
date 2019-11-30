<?php

use Illuminate\Database\Seeder;
use App\Place;
class PlacesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (Schema::hasTable('places')) {
            Place::create([
                "name" => 'ջերմոց',
            ]);
            Place::create([
                "name" => 'փաթեթավորման',
            ]);
        }
    }
}
