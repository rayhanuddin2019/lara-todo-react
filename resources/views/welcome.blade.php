@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Todo') }}</div>

                <div class="card-body">      
                        <p>Welcome, {{ auth()->user()->name }}!</p>
                        <p>Here are your tasks:</p>
                        <div id="todoApp"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
