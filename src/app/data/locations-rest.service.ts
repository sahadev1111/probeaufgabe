import {Injectable} from '@angular/core';
import {IMapItemsDataService} from "./location-data-service";
import {MapLocation} from "../model/map-location.model";
import {hardCodedLocations} from "./hard-coded-locations";

const API_PATH = "api/locations";

@Injectable({
  providedIn: 'root'
})
export class LocationsRestService implements IMapItemsDataService {
  async insert(item: MapLocation): Promise<MapLocation> {
    const result = await fetch(API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return result.json();
  }

  async delete(mapItem: MapLocation): Promise<void> {
    const result = await fetch(`${API_PATH}/${mapItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }


  async update(mapItem: MapLocation): Promise<void> {
    await fetch(`${API_PATH}/${mapItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mapItem),
    });
  }

  async getById(id: number): Promise<MapLocation | undefined> {
    const result = await fetch(`${API_PATH}/$id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return result.json();
  }

  async getAll(): Promise<MapLocation[]> {
    const result = await fetch(`${API_PATH}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return result.json();
  }

  data: MapLocation[] = hardCodedLocations;
}
