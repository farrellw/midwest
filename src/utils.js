import olFeature from "ol/feature";
import olVectorLayer from "ol/layer/vector";
import olVectorSource from "ol/source/vector";
import GeoJSON from "ol/format/geojson"
import olPolygon from "ol/geom/polygon";
import olMultiPolygon from "ol/geom/multipolygon";
import olStyle from "ol/style/style";
import olFill from "ol/style/fill";
import olStroke from "ol/style/stroke";
import olText from "ol/style/text";
import proj from "ol/proj";
// import { loadDataLayer } from "@bayer/ol-kit";
// import US_STATES from "./data/us_states.json";
import US_STATES_RESULTS from "./data/results.json";

export const styleFunction = (feature, resolution) => {
  const color = feature.getProperties().selected ? "#FF6347" : "#7FDBFF33";
  const name = feature.getProperties().name;
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

const colors = {
  lightSalmon: "#FFA07A",
  lightCoral: "#F08080",
  crimson: "#DC143C",
  maroon: "#800000",
};

const colorByMidwestVal = (midwestVal) => {
  if (midwestVal > 80) {
    return colors.maroon;
  } else if (midwestVal > 60) {
    return colors.crimson;
  } else if (midwestVal > 40) {
    return colors.lightCoral;
  } else if (midwestVal > 20) {
    return colors.lightSalmon;
  } else {
    return "#7FDBFF33";
  }
};

const styleResultsFunction = (feature, resolution) => {
  const name = feature.getProperties().NAME;
  const midwest = feature.getProperties().midwest;
  const color = colorByMidwestVal(midwest);

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

export const createResultsLayer = () => {
  const layer = new olVectorLayer({ source: new olVectorSource() });
  const source = layer.getSource();

  US_STATES_RESULTS.features.forEach((state) => {
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

    feature.setStyle(styleResultsFunction);
    feature.setProperties({
      ...properties,
      title: properties.NAME,
      selected: false,
    });
    source.addFeature(feature);
  });

  return layer;
};

export const createUSStatesLayer = async () => {
  const url = "geoserver/f/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=f%3Astates&maxFeatures=50&outputFormat=application%2Fjson"
  try {
    const res = await fetch(url)
    const json = await res.json();

    //  If the above loaded, then we did something correct
    const layer = new olVectorLayer({
      source: new olVectorSource(
        {
          format: new GeoJSON(),
          url: url
        }),
      style: styleFunction
    });
    return layer;
  } catch (er) {
    console.log(er)
    return null
  }
};
