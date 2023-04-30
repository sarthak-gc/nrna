<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBusinessRequest;
use App\Services\BusinessService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessController extends Controller
{

    public function index(BusinessService $businessService)
    {
        $businesses = $businessService->all();
        return Inertia::render('Business/ListBusiness', [
            'businesses' => $businesses
        ]);
    }

    public function create()
    {
        return Inertia::render('Business/CreateBusiness');
    }

    public function store(CreateBusinessRequest $request, BusinessService $businessService)
    {
        $request =  $businessService->create($request);
        return to_route('business.create')->with('message', "Business record updated succesfully");
    }

}
