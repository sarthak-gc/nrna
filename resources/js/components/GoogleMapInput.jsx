import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import AutoComplete from "./AutoComplete";
import Marker from "./Marker";

export default function GoogleMapInput({ onPlaceAdded }) {
    const [map, setMaps] = useState(null);
    const [place, setPlace] = useState(null);

    console.log(place);

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627,
        },
        zoom: 11,
    };
    return (
        <div className="w-full  bg-gray-200 p-2">
            {map && (
                <AutoComplete
                    map={map.map}
                    mapApi={map.mapApi}
                    addPlace={(place) => {
                        setPlace(place);
                        onPlaceAdded(place);
                    }}
                />
            )}
            <div className="h-64">
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyA9cbq8eh-YNzAGcGOkTG5VphGeOC-J3rc",
                        libraries: ["places", "geometry"],
                    }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) =>
                        setMaps({
                            map: map,
                            mapApi: maps,
                        })
                    }
                >
                    {place && (
                        <Marker
                            key={place.id}
                            text={place.name}
                            lat={place.geometry.location.lat()}
                            lng={place.geometry.location.lng()}
                        />
                    )}
                </GoogleMapReact>
            </div>
        </div>
    );
}
