export default function CountMarker({
    supercluster,
    mapRef,
    pointCount,
    size,
    onClick,
}) {
    return (
        <div
            className="cluster-marker"
            style={{
                width: size + "px",
                height: size + "px",
            }}
            onClick={onClick}
        >
            <div className="count">{pointCount}</div>
        </div>
    );
}
