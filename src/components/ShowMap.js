import React, { useEffect } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  Layer,
  Source,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [38.7578, 8.9806] },
    },
  ],
};

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 100,
    "circle-color": "#007cbf",
    "circle-opacity": 0.3,
  },
};

const layerTextStyle = {
  id: "singles-count",
  type: "symbol",
  source: "users",
  filter: ["has", "singles_count"],
  layout: {
    "text-field": "XXX",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

const ShowMap = () => {
  const [viewState, setViewState] = React.useState({});
  //     width:"100%",
  //     height:"100%",
  //     longitude: 38.7578,
  //     latitude: 8.9806,
  //     zoom:12
  //   });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewState({
        ...viewState,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 9,
      });
    });
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "90vh" }}>
        <ReactMapGL
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/yaadataa/cl8t7ydlz00fz14qis2769dip"
          mapboxAccessToken="pk.eyJ1IjoieWFhZGF0YWEiLCJhIjoiY2w3cXNoZmZ5MDhrNTNwcGxvaHIwd3N1biJ9.VFHKnK9rnqeXUPEdZpSfiA"
          // children={this.props.children}
        >
          <Marker longitude={38.7578} latitude={8.9806}></Marker>

          {/* <Marker
            longitude={viewState.longitude}
            latitude={viewState.latitude}
          /> */}

          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
            {/* <Layer {...layerTextStyle}/> */}
          </Source>

          <NavigationControl position="top-left" />
        </ReactMapGL>
      </div>
    </>
  );
};

export default ShowMap;
