<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use SocialiteProviders\Manager\SocialiteWasCalled;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //Registering the Microsoft Socialite provider
        Event::listen(function(SocialiteWasCalled $event) {
            /*$event->extendSocialite('microsoft', function($app) {
                $config = $app['config']['services.microsoft'];
                return Socialite::buildProvider(MicrosoftProvider::class, $config);
            });*/            
            $event->extendSocialite('microsoft', \SocialiteProviders\Microsoft\Provider::class);
        });
    }
}
