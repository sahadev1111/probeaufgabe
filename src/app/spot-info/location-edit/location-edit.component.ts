import {Component, computed, Inject, inject, OnInit, signal} from '@angular/core';
import {Router} from "@angular/router";
import {LocationBoxService} from "../location-box.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IMapItemsDataService, mapDataServiceToken} from "../../dataService/location-data-service";
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
export class LocationEditComponent implements OnInit {
  fb = inject(FormBuilder);
  form = computed(() => {
    const location = this.service.location();
    if (!location) {
      return null;
    }

    let controls: { [key: string]: (string | number)[] } = {
      name: [location.name],
      latitude: [location.latitude],
      longitude: [location.longitude],
    };

    const form = this.fb.group(controls)

    if (!location.attributes) {
      return form;
    }

    for (const [key, value] of Object.entries(location.attributes)) {
      controls[key] = [value];
    }

    return form;
  })

  controlNames = computed(() => Object.keys(this.form()?.controls || []));

  constructor(protected service: LocationBoxService, @Inject(mapDataServiceToken) private dataService: IMapItemsDataService) {

  }

  ngOnInit(): void {

    this.service.isEditMode.set(false)
  }

  save() {
    const formValue: unknown = this.form()?.value;
    const mapItem = formValue as MapLocation;
    mapItem.id = this.service.location()?.id;

    if (this.service.location()?.id === undefined) {
      this.dataService.insert(formValue as MapLocation);
    } else {
      this.dataService.update(formValue as MapLocation);
    }
  }
}
