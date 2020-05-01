import * as React from "react";
import "./App.scss";
import "ol/ol.css";
import * as OLKit from "@bayer/ol-kit";
import Map from 'ol/Map';
import { createUSStatesLayer, styleFunction } from "./utils";
import { useHistory } from "react-router-dom";

/*
TODO: Wrap in nginx docker container
TODO: Save results to database.
TODO: Add draw loop over states
TODO: retrieve results from database
TODO: Format Landing Page
*/

function App() {
  let history = useHistory();

  var formData: {
    features: ol.Feature[]
  } = { features: [] };
  const onMapInit = async (map: Map) => {
    const layer = await createUSStatesLayer();
    if (layer != null) {
      map.addLayer(layer);
    } else {
      console.log("Something screwed up loading the layer")
    }


    map.on("click", (evt: any) => {
      evt.preventDefault();
      map.forEachFeatureAtPixel(evt.pixel, (feature: any, layer: any) => {
        const p = feature.getProperties();
        if (p) {
          const selected = !p.selected;
          feature.setProperties({ ...p, selected: selected });
          feature.setStyle(styleFunction)
        }
        const features = layer.getSource().getFeatures();
        formData.features = features;
      });
    });

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
