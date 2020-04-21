import * as React from "react";
import "./App.scss";
import "ol/ol.css";
import * as OLKit from "@bayer/ol-kit";
import Feature from 'ol/feature';
import Map from 'ol/Map';
import { createUSStatesLayer } from "./utils";
import { useHistory } from "react-router-dom";

/*
TODO: Add draw loop over states
TODO: Add results page
TODO: Format Landing Page
*/

function App() {
  let history = useHistory();

  var formData: {
    features: Feature[]
  } = { features: [] };
  const onMapInit = (map: Map) => {
    const layer = createUSStatesLayer();
    map.on("hover", (event: any) => {

      map.forEachFeatureAtPixel(event.pixel, (feature: any) => {
        const p = feature.getProperties();
        if (p) {
          const selected = !p.selected;
          feature.setProperties({ ...p, selected: selected });
        }
        const features = layer.getSource().getFeatures();
        formData.features = features;
      })
    });

    map.on("click", (event: any) => {
      event.preventDefault();
      map.forEachFeatureAtPixel(event.pixel, function (feature: any) {
        const p = feature.getProperties();
        if (p) {
          const selected = !p.selected;
          feature.setProperties({ ...p, selected: selected });
        }
        const features = layer.getSource().getFeatures();
        formData.features = features;
      });
    });
    map.addLayer(layer);
    OLKit.centerAndZoom(map, {
      x: -98.5795,
      y: 39.8283,
      zoom: 4,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    // TODO Submit Form Data Here
    console.log(formData);
  
    e.preventDefault();
    history.push("results");
  };

  return (
    <div className="app-page">
      <section className="header">
        <h3>What states belong to the 'Midwest'?</h3>
        <p>
          Click the appropriate states you think belong in the midwest. If a
          state is in red, that means you think it is part of the "Midwest".
          When you are done, submit your picks at the bottom.
        </p>
      </section>
      <section className="map-container">
        <OLKit.Map onMapInit={onMapInit}>
          <OLKit.Controls />
          <OLKit.Popup />
        </OLKit.Map>
      </section>
      <section className="submission-section">
        <form onSubmit={handleSubmit}>
          <input type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
}

export default App;
