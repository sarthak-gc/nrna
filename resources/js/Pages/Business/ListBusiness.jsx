import React, { useEffect, useMemo, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";

import { Breadcrumb, Col, Input, Row } from "antd";
import ListMarker from "../../components/ListMarker";
import useSupercluster from "use-supercluster";
import CountMarker from "../../components/CountMarker";
import { Link } from "@inertiajs/react";

const Marker = ({ children }) => children;

export default function ListBusiness({ businesses }) {
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [searchText, setSearchText] = useState("");

    const mapRef = useRef();

    const filteredBusiness = businesses.filter((elem) =>
        elem.business_name.match(new RegExp(searchText, "i"))
    );

    const data = useMemo(() => {
        let res = businesses.map((elem) => {
            return {
                type: "Feature",
                properties: {
                    cluster: false,
                    category: "wells",
                    wellId: elem.id,
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        parseFloat(elem.location.coordinates[0]),
                        parseFloat(elem.location.coordinates[1]),
                    ],
                },
                ...elem,
            };
        });
        return res;
    }, [searchText]);
    console.log({ data });
    const { clusters, supercluster } = useSupercluster({
        points: data,
        bounds,
        zoom,
        options: {
            // radius: 75,
            // maxZoom: 20,
            // map: (item) => ({ c: 1 }),
            // reduce: (acc, cur) => {
            //     acc.c += a;
            // },
        },
    });

    useEffect(() => {
        console.log({ clusters });
        console.log(supercluster);
    }, [clusters, supercluster]);

    const [selectedBusiness, setSelectedBusiness] = useState();

    return (
        <>
            <Row>
                <Col span={24} md={16}>
                    <div className="w-full h-half-screen md:h-screen">
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: "AIzaSyA9cbq8eh-YNzAGcGOkTG5VphGeOC-J3rc",
                            }}
                            defaultCenter={{ lat: 48.8566, lng: 2.3522 }}
                            defaultZoom={1}
                            onGoogleApiLoaded={({ map }) => {
                                mapRef.current = map;
                            }}
                            onChange={({ zoom, bounds }) => {
                                setZoom(zoom);
                                const boundss = [
                                    bounds.nw.lng,
                                    bounds.se.lat,
                                    bounds.se.lng,
                                    bounds.nw.lat,
                                ];

                                setBounds(boundss);
                            }}
                            yesIWantToUseGoogleMapApiInternals
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
                                        let size =
                                            (pointCount * 20) / data.length;

                                        return (
                                            <Marker
                                                lat={latitude}
                                                lng={longitude}
                                                key={`cluster-${cluster.id}`}
                                            >
                                                <CountMarker
                                                    supercluster={supercluster}
                                                    mapRef={mapRef}
                                                    pointCount={pointCount}
                                                    size={size}
                                                    onClick={() => {
                                                        const expansionZoom =
                                                            Math.min(
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
                                                />
                                            </Marker>
                                        );
                                    } else {
                                        return (
                                            <Marker
                                                key={`cluster-${cluster.properties.wellId}`}
                                                lat={latitude}
                                                lng={longitude}
                                            >
                                                <ListMarker
                                                    business={cluster}
                                                />
                                            </Marker>
                                        );
                                    }
                                })}
                        </GoogleMapReact>
                    </div>
                </Col>
                <Col span={24} md={8} className="">
                    <div className="p-4 bg-white overflow-y-scroll h-half-screen md:h-screen">
                        <Breadcrumb
                            items={[
                                {
                                    title: <Link href="/">Home</Link>,
                                },
                                {
                                    title: "List all Business",
                                },
                            ]}
                        />
                        <h2 className="text-2xl font-bold font-primary text-gray-800">
                            Listed Business ({businesses.length})
                        </h2>
                        <div className="search my-2">
                            <Input
                                placeholder="Search"
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                }}
                            />
                        </div>
                        {filteredBusiness.map((business) => (
                            <div
                                className="business-card flex mt-2 p-4 rounded-md cursor-pointer hover:bg-purple-50"
                                onClick={() => {
                                    mapRef.current.panTo({
                                        lat: business.location.coordinates[1],
                                        lng: business.location.coordinates[0],
                                    });
                                    mapRef.current.setZoom(15);
                                }}
                            >
                                <div className="w-1/3 h-32 bg-gray-200 rounded-lg overflow-hidden">
                                    <img
                                        src={business.logo}
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                </div>
                                <div className="w-2/3 ml-4">
                                    <h5 className="text-sm font-semibold">
                                        {business.business_name}
                                    </h5>
                                    <p className=" flex items-center text-xs">
                                        <div className="icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4  mr-1 text-purple-800"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                                />
                                            </svg>
                                        </div>

                                        {business.street_address}
                                    </p>

                                    <p className="flex items-center text-xs">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 mr-1 text-purple-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            />
                                        </svg>

                                        {business.email}
                                    </p>
                                        {business.telephone && (
                                            <p className="flex items-center text-xs">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-4 h-4 mr-1 text-purple-500"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                                    />
                                                </svg>

                                                {business.telephone}
                                            </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </>
    );
}
