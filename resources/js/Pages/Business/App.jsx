import React, { useEffect, useState, useMemo, useRef } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./styles.css";

const Marker = ({ children }) => children;
const App = () => {
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(10);
    // setup map

    const mapRef = useRef();

    const loadData = () => {
        return [
            {
                X: 2.28883740916826,
                Y: 48.8085360371343,
                osm_id: "way/87388427",
            },
        ];
    };
    const data = useMemo(() => {
        let res = loadData();
        // let res = [];

        res = res.slice(0, 1000).map((elem) => {
            return {
                type: "Feature",
                properties: {
                    cluster: false,
                    category: "wells",
                    wellId: elem.id,
                },
                geometry: {
                    type: "Point",
                    coordinates: [parseFloat(elem.X), parseFloat(elem.Y)],
                },
            };
        });
        return res;
    }, []);

    const { clusters, supercluster } = useSupercluster({
        points: data,
        bounds,
        zoom,
    });

    useEffect(() => {
        console.log(clusters);
        console.log(supercluster);
    }, [clusters, supercluster]);

    //  {/* bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }} */}
    return (
        <div>
            Hello There
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyA9cbq8eh-YNzAGcGOkTG5VphGeOC-J3rc",
                    }}
                    defaultCenter={{ lat: 48.8566, lng: 2.3522 }}
                    defaultZoom={10}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map }) => {
                        mapRef.current = map;
                    }}
                    onChange={(event) => {
                        setZoom(event.zoom);
                        const boundss = [
                            event.bounds.nw.lng,
                            event.bounds.se.lat,
                            event.bounds.se.lng,
                            event.bounds.nw.lat,
                        ];

                        setBounds(boundss);
                    }}
                >
                    {clusters &&
                        clusters.map((cluster) => {
                            const [longitude, latitude] =
                                cluster.geometry.coordinates;
                            const {
                                cluster: isCluster,
                                point_count: pointCount,
                            } = cluster.properties;

                            if (isCluster) {
                                let size = (pointCount * 20) / data.length;

                                return (
                                    <Marker
                                        lat={latitude}
                                        lng={longitude}
                                        key={`cluster-${cluster.id}`}
                                        className="cluster-marker"
                                    >
                                        <div
                                            className="cluster-marker"
                                            style={{
                                                width: size + "px",
                                                height: size + "px",
                                            }}
                                            onClick={() => {
                                                const expansionZoom = Math.min(
                                                    supercluster.getClusterExpansionZoom(
                                                        cluster.id
                                                    ),
                                                    20
                                                );
                                                mapRef.current.setZoom(
                                                    expansionZoom
                                                );
                                                mapRef.current.panTo({
                                                    lat: latitude,
                                                    lng: longitude,
                                                });
                                            }}
                                        >
                                            {pointCount}
                                        </div>
                                    </Marker>
                                );
                            } else {
                                return (
                                    <Marker
                                        key={`cluster-${cluster.properties.wellId}`}
                                        lat={latitude}
                                        lng={longitude}
                                    >
                                        <div className="well-marker">F</div>
                                    </Marker>
                                );
                            }
                        })}
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default App;
