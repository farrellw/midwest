const fs = require("fs");

const stateData = JSON.parse(fs.readFileSync("./src/data/us_states.json"));
const states = stateData["features"];
const stateLookup = {
  Maine: 0,
  Michigan: 10,
  Massachusetts: 0,
  Nevada: 5,
  "New Jersey": 0,
  "New York": 0,
  "North Carolina": 5,
  Ohio: 40,
  Pennsylvania: 40,
  "Rhode Island": 0,
  Tennessee: 0,
  Texas: 0,
  Utah: 0,
  Washington: 0,
  Wisconsin: 80,
  "Puerto Rico": 0,
  Maryland: 0,
  Alabama: 0,
  Alaska: 0,
  Arizona: 0,
  Arkansas: 30,
  California: 0,
  Colorado: 50,
  Connecticut: 0,
  Delaware: 0,
  "District of Columbia": 0,
  Florida: 0,
  Georgia: 0,
  Hawaii: 0,
  Idaho: 0,
  Illinois: 80,
  Indiana: 80,
  Iowa: 90,
  Kansas: 50,
  Kentucky: 60,
  Louisiana: 0,
  Minnesota: 70,
  Mississippi: 10,
  Missouri: 50,
  Nebraska: 60,
  "New Hampshire": 0,
  "New Mexico": 0,
  "North Dakota": 20,
  Oklahoma: 40,
  Oregon: 0,
  "South Carolina": 0,
  "South Dakota": 30,
  Vermont: 0,
  Virginia: 10,
  "West Virginia": 15,
  Wyoming: 15,
  Montana: 15,
};
const enrichedStates = states.map((state) => {
  const name = state.properties.NAME;
  state.properties.midwest = stateLookup[name];
  return state;
});

const writeStateData = {
  type: "FeatureCollection",
  features: enrichedStates,
};

fs.writeFileSync("./src/data/results.json", JSON.stringify(writeStateData));
