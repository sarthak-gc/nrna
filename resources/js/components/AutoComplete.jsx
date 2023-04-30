import React, { Component, useEffect, useRef, useState } from "react";

function AutoComplete({ map, mapApi, addPlace }) {
    const searchInput = useRef();
    const autoComplete = useRef();

    useEffect(() => {
        const options = {
            // restrict your search to a specific type of result
            // types: ['geocode', 'address', 'establishment', '(regions)', '(cities)'],
            // restrict your search to a specific country, or an array of countries
            // componentRestrictions: { country: ['gb', 'us'] },
        };
        autoComplete.current = new mapApi.places.Autocomplete(
            searchInput.current,
            options
        );
        autoComplete.current.addListener("place_changed", onPlaceChanged);
        autoComplete.current.bindTo("bounds", map);

        return () => {
            mapApi.event.clearInstanceListeners(searchInput);
        };
    }, []);

    const onPlaceChanged = () => {
        const place = autoComplete.current.getPlace();

        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        addPlace(place);
        searchInput.blur();
    };

    function clearSearchBox() {
        searchInput.value = "";
    }

    return (
        <div className="mb-2">
            <input
                ref={searchInput}
                type="text"
                className="px-4 w-full py-2"
                onFocus={clearSearchBox}
                placeholder="Enter a location"
            />
        </div>
    );
}
export default AutoComplete;
