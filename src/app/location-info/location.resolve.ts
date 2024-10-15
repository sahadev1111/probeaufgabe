import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {IMapItemsDataService, LOCATION_DATA_SERVICE} from "../data/location-data-service";
import {assert} from "../lib/assert";
import {MapItemType, MapLocation} from "../model/map-location.model";

export const locationResolver: ResolveFn<MapLocation | undefined> = (route) => {
  const idAsString = route.paramMap.get('id');

  let [longStr, latStr] = ["0", "0"];
  if (route.queryParams['coords']) {
    [longStr, latStr] = route.queryParams['coords'];
  }

  if (idAsString === 'new') {
    return Promise.resolve({
      name: '',
      longitude: parseFloat(longStr),
      latitude: parseFloat(latStr),
      type: MapItemType.StreetLight,
      attributes: {brightness: "10"}
    });
  }

  assert(idAsString, "no id parameter given");

  const id = parseInt(idAsString);

  return inject<IMapItemsDataService>(LOCATION_DATA_SERVICE).getById(id)
}
