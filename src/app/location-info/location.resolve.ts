import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {IMapItemsDataService, mapDataServiceToken} from "../data/location-data-service";
import {assert} from "../lib/assert";
import {MapLocation} from "../model/map-location.model";

export const locationResolver: ResolveFn<MapLocation | undefined> = (route, state) => {
  const idAsString = route.paramMap.get('id');

  assert(idAsString, "no id parameter given");

  const id = parseInt(idAsString);

  return inject<IMapItemsDataService>(mapDataServiceToken).getById(id)
}
