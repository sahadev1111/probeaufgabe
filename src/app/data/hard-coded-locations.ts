import {MapLocation, MapItemType} from "../model/map-location.model";

export const hardCodedLocations = [
  // new POI(9.27, 47.385971, 'Kebabhaus')
  {
    id: 1,
    name: 'Kebabhaus Herisau',
    longitude: 9.281659,
    latitude: 47.385993,
    type: MapItemType.POI,
    attributes: {
      category: "kebab",
      description: "Gute bedienung"
    }
  },
  {
    id: 2,
    name: 'Parkplatz',
    type: MapItemType.POI,
    longitude: 9.279760,
    latitude: 47.385486,
    attributes: {
      category: "parking",
      description: "expensive, avoid"
    }
  },
  {
    id: 3,
    name: 'Strassenlaterne',
    type: MapItemType.StreetLight,
    longitude: 9.278666,
    latitude: 47.385920,
    attributes: {
      category: "parking",
      description: "expensive, avoid"
    }
  }
];
