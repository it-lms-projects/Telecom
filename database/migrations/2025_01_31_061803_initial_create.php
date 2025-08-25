<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /**
         * 1. Base tables (no dependencies)
         */
        /*Schema::create('tool_allocation', function (Blueprint $table) {
            $table->id();
            $table->string('designation', 45);
            $table->string('type_marque', 45);
            $table->string('code', 45);
            $table->double('prix')->default(0);
            $table->timestamps();
        });

        Schema::create('gate_passes', function (Blueprint $table) {
            $table->id();
            $table->string('designation', 45);
            $table->string('code', 45);
            $table->timestamps();
        });

        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 45)->nullable();
            $table->string('postnom', 45)->nullable();
            $table->string('prenom', 45)->nullable();
            $table->timestamps();
        });

        Schema::create('views', function (Blueprint $table) {
            $table->id();
            $table->string('name', 128);
            $table->string('key', 128);
            $table->boolean('can_save_current_search')->default(false);
            $table->boolean('can_import_records')->default(false);
            $table->boolean('can_link_to_worksheet')->default(false);
            $table->boolean('can_add_to_dashboard')->default(false);
            $table->boolean('can_insert_into_worksheet')->default(false);
            $table->timestamps();
        });

        Schema::create('view_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 128);
            $table->string('key', 128);
            $table->string('description');
            $table->timestamps();
        });*/

        /**
         * 2. Dependent tables (foreign keys point to base tables)
         */
        /*Schema::create('sim_cards', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_marque_vehicule');
            $table->unsignedBigInteger('id_type_vehicule');
            $table->string('immatriculation', 45);
            $table->string('chassis', 45);
            $table->string('reference_interne', 45);
            $table->string('date_mise_en_circulation', 255);
            $table->decimal('kilometre_initial', 10, 2);
            $table->timestamps();

            $table->foreign('id_marque_vehicule')->references('id')->on('marques')->onDelete('cascade');
            $table->foreign('id_type_vehicule')->references('id')->on('type_vehicules')->onDelete('cascade');
        });*/

        /**
         * 2. Dependent tables (foreign keys point to base tables)
         */
        /*Schema::create('phones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_marque_vehicule');
            $table->unsignedBigInteger('id_type_vehicule');
            $table->string('immatriculation', 45);
            $table->string('chassis', 45);
            $table->string('reference_interne', 45);
            $table->string('date_mise_en_circulation', 255);
            $table->decimal('kilometre_initial', 10, 2);
            $table->timestamps();

            $table->foreign('id_marque_vehicule')->references('id')->on('marques')->onDelete('cascade');
            $table->foreign('id_type_vehicule')->references('id')->on('type_vehicules')->onDelete('cascade');
        });*/

        /**
         * 2. Dependent tables (foreign keys point to base tables)
         */
        /*Schema::create('requisition_forms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_marque_vehicule');
            $table->unsignedBigInteger('id_type_vehicule');
            $table->string('immatriculation', 45);
            $table->string('chassis', 45);
            $table->string('reference_interne', 45);
            $table->string('date_mise_en_circulation', 255);
            $table->decimal('kilometre_initial', 10, 2);
            $table->timestamps();

            $table->foreign('id_marque_vehicule')->references('id')->on('marques')->onDelete('cascade');
            $table->foreign('id_type_vehicule')->references('id')->on('type_vehicules')->onDelete('cascade');
        });

        Schema::create('maintenance_jobs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_vehicule');
            $table->unsignedBigInteger('id_driver');
            $table->string('relation', 45);
            $table->string('duration', 45);
            $table->date('start_date');
            $table->date('end_date');
            $table->string('location')->nullable();
            $table->string('destination', 45)->nullable();
            $table->double('kilometer_index')->default(0);
            $table->timestamps();

            $table->foreign('id_vehicule')->references('id')->on('vehicules')->onDelete('cascade');
            $table->foreign('id_driver')->references('id')->on('drivers')->onDelete('cascade');
        });

        Schema::create('maintenance_tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_work_job');
            $table->string('title', 45);
            $table->string('description', 45);
            $table->date('begin_date');
            $table->date('end_date');
            $table->timestamps();

            $table->foreign('id_work_job')->references('id')->on('work_jobs')->onDelete('cascade');
        });

        Schema::create('filters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('view_id');
            $table->unsignedBigInteger('parent_filter_id')->nullable();
            $table->string('name', 128);
            $table->string('criteria');
            $table->boolean('is_default')->default(false);
            $table->boolean('is_applied')->default(false);
            $table->timestamps();

            $table->foreign('view_id')->references('id')->on('views')->onDelete('cascade');
            $table->foreign('parent_filter_id')->references('id')->on('filters')->onDelete('cascade');
        });

        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('view_id');
            $table->unsignedBigInteger('parent_group_id')->nullable();
            $table->string('name', 128);
            $table->string('field');
            $table->string('model');
            $table->boolean('is_default')->default(false);
            $table->boolean('is_applied')->default(false);
            $table->timestamps();

            $table->foreign('view_id')->references('id')->on('views')->onDelete('cascade');
            $table->foreign('parent_group_id')->references('id')->on('groups')->onDelete('cascade');
        });

        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('view_id');
            $table->string('name');
            $table->string('criteria');
            $table->boolean('is_applied')->default(false);
            $table->timestamps();

            $table->foreign('view_id')->references('id')->on('views')->onDelete('cascade');
        });

        Schema::create('view_2_view_types', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('view_id');
            $table->unsignedBigInteger('view_type_id');
            $table->timestamps();

            $table->foreign('view_id')->references('id')->on('views')->onDelete('cascade');
            $table->foreign('view_type_id')->references('id')->on('view_types')->onDelete('cascade');
        });*/

        /**
         * 3. Modifications to existing tables
         */
        /*Schema::table('work_jobs', function (Blueprint $table) {
            $table->string('job_number', 128)->after('id')->unique();
            $table->text('status')->nullable();
            $table->date('end_date')->nullable()->change();
        });

        Schema::table('job_tasks', function (Blueprint $table) {
            $table->text('status')->nullable()->after('description');
            $table->date('end_date')->nullable()->change();
        });*/
    }

    public function down(): void
    {
        /**
         * Drop FKs before dropping tables
         */
        /*Schema::table('work_jobs', function (Blueprint $table) {
            $table->dropForeign(['id_vehicule']);
            $table->dropForeign(['id_driver']);
            $table->dropUnique(['job_number']);
            $table->dropColumn(['job_number', 'status']);
        });

        Schema::table('job_tasks', function (Blueprint $table) {
            $table->dropForeign(['id_work_job']);
            $table->dropColumn('status');
        });

        Schema::table('filters', function (Blueprint $table) {
            $table->dropForeign(['view_id']);
            $table->dropForeign(['parent_filter_id']);
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->dropForeign(['view_id']);
            $table->dropForeign(['parent_group_id']);
        });

        Schema::table('favorites', function (Blueprint $table) {
            $table->dropForeign(['view_id']);
        });

        Schema::table('view_2_view_types', function (Blueprint $table) {
            $table->dropForeign(['view_id']);
            $table->dropForeign(['view_type_id']);
        });

        Schema::table('vehicules', function (Blueprint $table) {
            $table->dropForeign(['id_marque_vehicule']);
            $table->dropForeign(['id_type_vehicule']);
        });*/

        /**
         * Drop tables in reverse order of creation
         */
        /*Schema::dropIfExists('view_2_view_types');
        Schema::dropIfExists('favorites');
        Schema::dropIfExists('groups');
        Schema::dropIfExists('filters');
        Schema::dropIfExists('job_tasks');
        Schema::dropIfExists('work_jobs');
        Schema::dropIfExists('vehicules');
        Schema::dropIfExists('view_types');
        Schema::dropIfExists('views');
        Schema::dropIfExists('drivers');
        Schema::dropIfExists('type_vehicules');
        Schema::dropIfExists('marques');*/
    }
};
