import {MapLocation} from "../../src/app/model/map-location.model";
import {hardCodedLocations} from "../../src/app/data/hard-coded-locations";

export class LocationDataAccess {
  async insert(item: MapLocation): Promise<void> {
    this.data.push(item);
  }

  async delete(mapItem: MapLocation): Promise<void> {
    const itemIndex = this.data.findIndex(item => item.id === mapItem.id);
    if (itemIndex !== -1) {
      this.data = this.data.filter(item => item.id !== mapItem.id);
    }
  }


  async update(mapItem: MapLocation): Promise<void> {
    const itemIndex = this.data.findIndex(item => item.id === mapItem.id);
    if (itemIndex !== -1) {

      this.data[itemIndex] = mapItem;
    }

  }

  async getById(id: number): Promise<MapLocation | undefined> {
    return this.data.find(dataItem => dataItem.id === id);
  }

  async getData(): Promise<MapLocation[]> {
    return this.data;
  }

  data: MapLocation[] = hardCodedLocations;
}
