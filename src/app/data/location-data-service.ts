import type {MapLocation} from "../map-location.model";
import {InjectionToken} from "@angular/core";

export const LOCATION_DATA_SERVICE = new InjectionToken("mapDataService");

export interface IMapItemsDataService {
  getAll(): Promise<MapLocation[]>;

  getById(id: number): Promise<MapLocation | undefined>;

  insert(value: MapLocation): Promise<MapLocation>;

  update(value: MapLocation): Promise<void>;
}
