import {Inject, Injectable} from '@angular/core';
import {MapLocation} from "../../model/map-location.model";
import {FormGroup} from "@angular/forms";
import {getDisplayAttributesByType} from "../get-display-attributes-by-type";
import {LocationBoxService} from "../location-box.service";
import {IMapItemsDataService, LOCATION_DATA_SERVICE} from "../../data/location-data-service";

@Injectable()
export class LocationEditSaveService {

  constructor(protected service: LocationBoxService,
              @Inject(LOCATION_DATA_SERVICE) private dataService: IMapItemsDataService) {
  }


  async save(form: FormGroup) {
    const formValue = form?.value;

    const location = formValue as MapLocation;
    location.id = this.service.location()?.id;

    this.updateTypeSpecificAttributes(location, form);

    return await this.saveInDataSource(location);
  }

  private updateTypeSpecificAttributes(location: MapLocation, form: FormGroup) {
    location.attributes = {};

    getDisplayAttributesByType(location.type).forEach((attr: string) => {
      const typeSpecificControls = form?.get('typeSpecificControls') as FormGroup

      location.attributes[attr] = typeSpecificControls.get(attr)?.value;
    })
  }

  private async saveInDataSource(location: MapLocation) {
    if (location?.id === undefined) {
      return await this.dataService.insert(location);
    } else {
      await this.dataService.update(location);
      return location
    }
  }
}
