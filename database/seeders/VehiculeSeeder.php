<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

use Carbon\Carbon;

class VehiculeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Path to your CSV file
        $csvFile = database_path('seeders/data/vehicles.csv');
        
        // Check if file exists
        if (!File::exists($csvFile)) {
            $this->command->error("The CSV file does not exist at path: {$csvFile}");
            return;
        }

        // Open the CSV file
        $file = fopen($csvFile, 'r');
        
        // Skip the header row
        fgetcsv($file);
        
        $vehicles = [];
        $now = Carbon::now();
        
        // Read each row and prepare data
        while (($row = fgetcsv($file)) !== false) {
            $vehicles[] = [
                'immatriculation' => $row[1],
                'chassis' => $row[2],
                'reference_interne' => $row[3],
                'date_mise_en_circulation' => $row[4],
                'id_marque_vehicule' => 5, // 5 is the id for MERCEDES, $row[5],
                'id_type_vehicule' => $row[6],
                'kilometre_initial' => $row[7],
                'created_at' => $now,
                'updated_at' => $now
            ];
            
            // Insert in chunks to manage memory
            if (count($vehicles) >= 50) {
                DB::table('vehicules')->insert($vehicles);
                $vehicles = [];
            }
        }
        
        // Insert any remaining records
        if (!empty($vehicles)) {
            DB::table('vehicules')->insert($vehicles);
        }
        
        fclose($file);
    }
}
