import type {MapLocation} from "../model/map-location.model";
import {InjectionToken} from "@angular/core";

export const mapDataServiceToken = new InjectionToken("mapDataService");

export interface IMapItemsDataService {
  getAll(): Promise<MapLocation[]>;

  getById(id: number): Promise<MapLocation | undefined>;

  insert(value: MapLocation): Promise<MapLocation>;

  update(value: MapLocation): Promise<void>;
}
