<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(MarqueSeeder::class);
        $this->call(TypeVehiculeSeeder::class);
        $this->call(VehiculeSeeder::class);
        $this->call(DriverSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(ViewTypeSeeder::class);
    }
}
