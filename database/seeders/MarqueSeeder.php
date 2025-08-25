<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class MarqueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('marques')->insert([
            [
                'designation' => 'DOUBLE COIN',
                'type_marque' => 'Pneu',
                'code' => 'DC',
                //'date_add' => '2022-08-11',
                //'t_marquecol' => null,
                'prix' => 0,
            ],
            [
                'designation' => 'TRIANGLE',
                'type_marque' => 'Pneu',
                'code' => 'TR',
                //'date_add' => '2022-08-11',
                //'t_marquecol' => null,
                'prix' => 0,
            ],
            [
                'designation' => 'ORNET',
                'type_marque' => 'Pneu',
                'code' => 'OR',
                //'date_add' => '2022-08-11',
                //'t_marquecol' => null,
                'prix' => 0,
            ],
            [
                'designation' => 'DUNLOP',
                'type_marque' => 'pneu',
                'code' => '09-20220N',
                //'date_add' => '2022-09-14',
                //'t_marquecol' => null,
                'prix' => 325,
            ],
            [
                'designation' => 'MERCEDES',
                'type_marque' => 'Véhicule',
                'code' => 'ACTROS',
                //'date_add' => '2022-09-14',
                //'t_marquecol' => null,
                'prix' => 250,
            ],
        ]);
    }
}
