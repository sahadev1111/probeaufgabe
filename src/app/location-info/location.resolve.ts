import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {IMapItemsDataService, mapDataServiceToken} from "../data/location-data-service";
import {assert} from "../lib/assert";
import {MapItemType, MapLocation} from "../model/map-location.model";

export const locationResolver: ResolveFn<MapLocation | undefined> = (route) => {
  const idAsString = route.paramMap.get('id');

  if (idAsString === 'new') {
    return Promise.resolve({name: '', longitude: 0, latitude: 0, type: MapItemType.StreetLight, attributes: {brightness: "10"}});
  }

  assert(idAsString, "no id parameter given");

  const id = parseInt(idAsString);

  return inject<IMapItemsDataService>(mapDataServiceToken).getById(id)
}
