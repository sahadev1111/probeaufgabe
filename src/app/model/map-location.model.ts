export enum MapItemType {StreetLight, POI, LifeStage}

export type MapLocationAttributes = {
  [key: string]: string;
};

export interface MapLocation {
  id?: number,
  name: string;
  longitude: number;
  latitude: number;
  type: MapItemType;
  attributes?: MapLocationAttributes
}
