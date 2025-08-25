<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ViewTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('view_types')->insert([
            [
                'name' => 'Form View',
                'key' => 'form',
                'description' => "Vue détaillée d'un seul enregistrement; Permet d'éditer, voir ou créer des enregistrements.",
                'created_at' => $now, 
                'updated_at' => $now,
            ],
            [
                'name' => 'Tree View',
                'key' => 'tree',
                'description' => "Affiche une liste d'enregistrements sous forme de tableau; Utilisée pour la navigation rapide, tri, filtrage.",
                'created_at' => $now, 
                'updated_at' => $now,
            ],
            [
                'name' => 'Kanban View',
                'key' => 'kanban',
                'description' => "Vue sous forme de colonnes (ex : opportunités commerciales), Très visuelle, adaptée à des workflows.",
                'created_at' => $now, 
                'updated_at' => $now,
            ],
            [ 
                'name' => "Calendar View",
                'key' => 'calendar',
                'description' => "Représente des enregistrements sous forme de calendrier (jour, semaine, mois); Souvent utilisée pour les tâches, événements, rendez-vous.",
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [ 
                'name' => 'Gantt View',
                'key' => 'gantt',
                'description' => "Vue en diagramme de Gantt (planning); Idéale pour la gestion de projet ou de production.",
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [ 
                'name' => 'Graph View',
                'key' => 'graph',
                'description' => "Vue analytique (barres, lignes, camemberts); Pour rapports et tableaux de bord.",
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [ 
                'name' => 'Pivot View',
                'key' => 'pivot',
                'description' => "Vue dynamique pour l'analyse des données; Similaire à un tableau croisé dynamique Excel.",
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [ 
                'name' => 'List View',
                'key' => 'list',
                'description' => 'Variante de tree, souvent utilisée dans les sélections (ex : pop-ups).',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [ 
                'name' => 'Search View',
                'key' => 'search',
                'description' => "Définie les filtres, groupes, et champs de recherche dans d'autres vues.",
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [ 
                'name' => 'Activity View',
                'key' => 'activity',
                'description' => 'Vue dédiée au suivi des activités (suivie de tâches, relances...).',
                'created_at' => $now, 
                'updated_at' => $now,
            ],
            [ 
                'name' => 'Map View',
                'key' => 'map',
                'description' => 'Affiche les données géolocalisées sur une carte; Utilise des champs de coordonnées ou adresses.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [ 
                'name' => 'Cohort View',
                'key' => 'cohort',
                'description' => 'Pour analyser le comportement dans le temps (ex : taux de rétention).',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [ 
                'name' => 'Dashboard View',
                'key' => 'dashboard',
                'description' => 'Vue personnalisée, souvent construite avec du code JS/XML pour regrouper plusieurs widgets.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
