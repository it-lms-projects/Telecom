<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Quick Gmao | Acceuil</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/index.jsx'])
</head>
<body>
    <div id="root"></div>
</body>
</html>