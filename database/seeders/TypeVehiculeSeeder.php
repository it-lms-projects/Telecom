<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TypeVehiculeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('type_vehicules')->insert([
            [
                'designation' => 'Remorque',
                'code' => 'R',
            ],
            [
                'designation' => 'Semi-Remorque',
                'code' => 'S',
            ],
            [
                'designation' => 'Truck',
                'code' => 'T',
            ],
            [
                'designation' => 'VL',
                'code' => 'VL',
            ],
        ]);
    }
}
