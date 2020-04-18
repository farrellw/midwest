import * as React from "react";
import "./App.scss";
import "ol/ol.css";
import * as OLKit from "@bayer/ol-kit";

import { createUSStatesLayer } from "./utils";

function App() {
  const onMapInit = (map: any) => {
    map.on("click", (event: any) => {
      map.forEachFeatureAtPixel(event.pixel, function (
        feature: any,
        layer: any
      ) {
        const p = feature.getProperties()
        if (p) {
          console.log(p["NAME"]);
          console.log(layer)
        }
      });
    });
    const layer = createUSStatesLayer();
    map.addLayer(layer);
  };
  return <OLKit.Map onMapInit={onMapInit} />;
}

export default App;
