import {MapLocation, MapItemType} from "../model/map-location.model";

export const hardCodedLocations: MapLocation[] = [
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
  },
  {
    id: 4,
    name: 'Bäckerei Knöpfel',
    type: MapItemType.POI,
    longitude: 9.278666,
    latitude: 47.385920,
    attributes: {
      category: "Bäckerei",
      description: "good bread"
    }
  },
  {
    id: 5,
    name: 'Strassenlaterne',
    type: MapItemType.StreetLight,
    longitude: 9.279266,
    latitude: 47.385449,
    attributes: {
      category: "parking",
      description: "expensive, avoid"
    }
  },
  {
    id: 6,
    name: 'Strassenlaterne',
    type: MapItemType.StreetLight,
    longitude: 9.279214,
    latitude:47.385517,
    attributes: {
      category: "parking",
      description: "expensive, avoid"
    }
  },
  {
    id: 7,
    name: 'Strassenlaterne',
    type: MapItemType.StreetLight,
    longitude: 9.279167,
    latitude:47.385590,
    attributes: {
      category: "parking",
      description: "expensive, avoid"
    }
  },
  {
    id: 8,
    name: 'Strassenlaterne',
    type: MapItemType.StreetLight,
    longitude: 9.385712,
    latitude:47.278945,
    attributes: {
      category: "parking",
      description: "expensive, avoid"
    }
  },
  {
    id: 9,
    name: 'Geburtsort',
    type: MapItemType.LifeStage,
    longitude: 9.283373,
    latitude:47.387932,
    attributes: {
      description: "Here I was born"
    }
  }
];
