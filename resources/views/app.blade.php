<!DOCTYPE html>
<html class="h-full bg-gray-200">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

	<link rel="shortcut icon" href="{{asset('assets/images/logos/favicon.ico')}}" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />

    <link rel="stylesheet" type="text/css" href="{{asset('assets/plugins/global/plugins.bundle.css')}}"/>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/style.bundle.css')}}"/>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/custom-style.css')}}"/>
    <script src="{{ mix('js/manifest.js') }}" defer></script>
    <script src="{{ mix('js/vendor.js') }}" defer></script>
    <script src="{{ mix('js/app.js') }}" defer></script>

    @routes
</head>

<body id="kt_body" class="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed aside-enabled aside-fixed" style="--kt-toolbar-height:55px;--kt-toolbar-height-tablet-and-mobile:55px">
    @inertia
</body>
</html>
