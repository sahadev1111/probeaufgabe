import {MapItemType} from "../map-location.model";

export function getDisplayAttributesByType(location: MapItemType) {
  switch (location) {
    case MapItemType.POI:
      return ['category', 'description'];
    case MapItemType.LifeStage:
      return ['stage'];
    case MapItemType.StreetLight:
      return ['brightness'];
  }
  return [];
}
