export enum MapItemType {StreetLight, POI, LifeStage}

export type MapLocationAttributes = Record<string, string>;


export interface MapLocation {
  [key: string]: unknown ;
  id?: number,
  name: string;
  longitude: number;
  latitude: number;
  type: MapItemType;
  attributes: MapLocationAttributes
}
