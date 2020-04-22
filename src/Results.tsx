import * as React from "react";
import "ol/ol.css";
import * as OLKit from "@bayer/ol-kit";
import Map from 'ol/Map';
import { createResultsLayer } from "./utils";

function Results() {
  const onMapInit = (map: Map) => {
    const layer = createResultsLayer();
    map.addLayer(layer);
    OLKit.centerAndZoom(map, {
      x: -98.5795,
      y: 39.8283,
      zoom: 4,
    });
  };

  return (
    <div className="app-page">
      <section className="header">
        <h3>What states belong to the 'Midwest'?</h3>
        <p>
          Results from other people's surveys.
        </p>
      </section>
      <section className="map-container">
        <OLKit.Map onMapInit={onMapInit}>
          <OLKit.Controls />
          <OLKit.Popup />
        </OLKit.Map>
      </section>
    </div>
  );
  }


  export default Results;