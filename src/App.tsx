import * as React from "react";
import "./App.scss";
import "ol/ol.css";
import * as OLKit from "@bayer/ol-kit";

import { createUSStatesLayer } from "./utils";

function App() {
  const onMapInit = (map: any) => {
    map.on("click", (event: any) => {
      map.forEachFeatureAtPixel(event.pixel, function (
        feature: any
      ) {
        const p = feature.getProperties()
        if (p) {
          const selected = !p.selected;
          feature.setProperties({ ...p, selected: selected });
        }
      });
    });
    const layer = createUSStatesLayer();
    map.addLayer(layer);  
    OLKit.centerAndZoom(map, {
      x: -98.5795,
      y: 39.8283,
      zoom: 4
    })
  };

  return (
    <section className="map-container">
      <OLKit.Map onMapInit={onMapInit}>
        <OLKit.Controls />
        <OLKit.Popup />
      </OLKit.Map>
    </section>
  );
}

export default App;
