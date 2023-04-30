<?php

namespace App\Services;
use App\Http\Requests\CreateBusinessRequest;
use App\Models\Business;
use MatanYadaev\EloquentSpatial\Objects\Point;

class BusinessService {

    public function all()
    {
        return Business::all();
    }
    public function create(CreateBusinessRequest $request)
    {
        $business = Business::create(array_merge($request->all(), [
            'location' => new Point($request->latitude, $request->longitude)
         ]));
        $business->addMedia($request->logo['file'])->toMediaCollection('logo');
        return $business;
    }
}