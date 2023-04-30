<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\SpatialBuilder;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Business extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    protected $appends = ['logo'];
    protected $fillable = [
        'business_name', 'street_address', 'city', 'country',
        'telephone', 'website', 'description', 'email', 'location'
    ];

    public function getLogoAttribute() {
        return sizeof($this->getMedia('logo')) > 0 ? $this->getMedia('logo')[0]->getFullUrl() : null;
    }

    protected $spatialFields = [
        'location'
    ];

    protected $casts = [
        'location' => Point::class
    ];

    public function newEloquentBuilder($query)
    {
        return new SpatialBuilder($query);
    }


public function registerMediaCollections(): void
{
    $this->addMediaCollection('logos');
}

}
