import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import "mapbox-gl/dist/mapbox-gl.css";

function Map({ searchResults }: { searchResults: Array<any> }) {
  const [selectedLocation, setSelectedLocation] = useState<null | {
    long: number;
    lat: number;
    title: string;
  }>(null);

  const coords = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));

  const center = getCenter(coords);

  const [viewport, setViewport] = useState({
    latitude: center ? center.latitude : 0,
    longitude: center ? center.longitude : 0,
    zoom: 8,
  });

  useEffect(() => {
    if (selectedLocation) console.log(selectedLocation);
  }, [selectedLocation]);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/levanter/cld8rfy27001w01oc8m0sl8pk"
      mapboxAccessToken={process.env.mapbox_key}
      style={{
        width: "100%",
        height: "100%",
      }}
      initialViewState={{ ...viewport }}
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {searchResults.map((result) => {
        return (
          <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offset={[-20, -10]}
            >
              <p
                className="cursor-pointer text-2xl animate-bounce"
                onClick={() => setSelectedLocation(result)}
              >
                📌
              </p>
            </Marker>
            {/** The popup the should show if we click a marker - something doesn't work in the conditioning. Without it shows, but then it shows for every pin */}
            {selectedLocation && selectedLocation.long === result.long ? (
              <Popup
                longitude={result.long}
                latitude={result.lat}
                onClose={() => setSelectedLocation(null)}
                closeOnClick={true}
              >
                {result.title}
              </Popup>
            ) : (
              false
            )}
          </div>
        );
      })}
    </ReactMapGL>
  );
}

export default Map;
