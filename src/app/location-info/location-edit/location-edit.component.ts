import {Component, computed, Inject, inject} from '@angular/core';
import {LocationBoxService} from "../location-box.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {IMapItemsDataService, mapDataServiceToken} from "../../data/location-data-service";
import {MapLocation} from "../../model/map-location.model";
import {assert} from "../../lib/assert";

@Component({
  selector: 'app-location-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './location-edit.component.html',
  styleUrl: './location-edit.component.scss'
})
export class LocationEditComponent {

  formBuilder = inject(FormBuilder);

  form = computed(() => {
    const location = this.service.location();
    if (!location) {
      return null;
    }

    const controls = this.initControls(location);

    if (!location.attributes) {
      return this.formBuilder.group(controls);
    }

    return this.createControlsForLocationAttributes(location, controls);
  })

  formControlNames = computed(() => Object.keys(this.form()?.controls || []));

  constructor(protected service: LocationBoxService, @Inject(mapDataServiceToken) private dataService: IMapItemsDataService) {

  }

  save() {
    const location = this.service.location();
    assert(!!location, "location is undefined");

    const formValue: unknown = this.form()?.value;
    const mapItem = formValue as MapLocation;

    mapItem.id = location?.id;
    mapItem.type = location?.type;

    if (location?.id === undefined) {
      this.dataService.insert(formValue as MapLocation);
    } else {
      this.dataService.update(formValue as MapLocation);
    }
  }


  private initControls(location: MapLocation) {
    const controls: Record<string, (string | number)[]> = {
      name: [location.name],
      latitude: [location.latitude],
      longitude: [location.longitude],
    };
    return controls;
  }

  private createControlsForLocationAttributes(location: MapLocation, controls: Record<string, (string | number)[]>) {
    if(!location.attributes) {
      return;
    }

    for (const [key, value] of Object.entries(location.attributes)) {
      controls[key] = [value];
    }

    return this.formBuilder.group(controls)
  }
}
