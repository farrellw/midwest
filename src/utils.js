import olFeature from "ol/feature";
import olVectorLayer from "ol/layer/vector";
import olVectorSource from "ol/source/vector";
import olPolygon from "ol/geom/polygon";
import olMultiPolygon from "ol/geom/multipolygon";
import olStyle from "ol/style/style";
import olFill from "ol/style/fill";
import olStroke from "ol/style/stroke";
import olText from "ol/style/text";
import proj from "ol/proj";

import US_STATES from "./data/us_states.json";

const styleFunction = (feature, resolution) => {
  const color = feature.getProperties().selected ? "#FF6347" : "#7FDBFF33";
  const name = feature.getProperties().NAME;
  return [
    new olStyle({
      fill: new olFill({ color: color }),
      stroke: new olStroke({
        color: "#0074D9",
        width: 2,
      }),
      text: new olText({ text: name }),
    }),
  ];
};

export const createUSStatesLayer = () => {
  const layer = new olVectorLayer({ source: new olVectorSource() });
  const source = layer.getSource();

  US_STATES.features.forEach((state) => {
    const { geometry, properties } = state;
    const coords =
      geometry.type === "MultiPolygon"
        ? geometry.coordinates.map((c) =>
            c.map((c) => c.map((c) => proj.fromLonLat(c)))
          )
        : geometry.coordinates.map((c) => c.map((c) => proj.fromLonLat(c)));
    const olGeom =
      geometry.type === "MultiPolygon"
        ? new olMultiPolygon(coords)
        : new olPolygon(coords);
    const feature = new olFeature({ geometry: olGeom });

    feature.setStyle(styleFunction);
    feature.setProperties({
      ...properties,
      title: properties.NAME,
      selected: false,
    });
    source.addFeature(feature);
  });

  return layer;
};
