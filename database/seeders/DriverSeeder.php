<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

use Carbon\Carbon;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Path to your CSV file
        $csvFile = database_path('seeders/data/drivers.csv');
        
        // Check if file exists
        if (!File::exists($csvFile)) {
            $this->command->error("The CSV file does not exist at path: {$csvFile}");
            return;
        }

        // Open the CSV file
        $file = fopen($csvFile, 'r');
        
        // Skip the header row
        fgetcsv($file);
        
        $drivers = [];
        $now = Carbon::now();
        
        // Read each row and prepare data
        while (($row = fgetcsv($file)) !== false) {
            $drivers[] = [
                'nom' => $row[1],
                'postnom' => $row[2],
                'prenom' => $row[3],
                'created_at' => $now,
                'updated_at' => $now
            ];
            
            // Insert in chunks to manage memory
            if (count($drivers) >= 50) {
                DB::table('drivers')->insert($drivers);
                $drivers = [];
            }
        }
        
        // Insert any remaining records
        if (!empty($drivers)) {
            DB::table('drivers')->insert($drivers);
        }
        
        fclose($file);
    }
}
