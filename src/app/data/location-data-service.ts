import type {MapLocation} from "../model/map-location.model";
import {InjectionToken} from "@angular/core";

export const mapDataServiceToken = new InjectionToken("mapDataService");

export interface IMapItemsDataService {
  getData(): Promise<MapLocation[]>;

  getById(id: number): Promise<MapLocation | undefined>;

  insert(value: MapLocation): Promise<void>;

  update(value: MapLocation): Promise<void>;
}
