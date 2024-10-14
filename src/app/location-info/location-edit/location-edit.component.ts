import {ChangeDetectionStrategy, Component, computed, Inject, inject, signal} from '@angular/core';
import {LocationBoxService} from "../location-box.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {IMapItemsDataService, mapDataServiceToken} from "../../data/location-data-service";
import {MapItemType, MapLocation} from "../../model/map-location.model";
import {assert} from "../../lib/assert";
import {TranslateModule} from "@ngx-translate/core";
import {getDisplayAttributesByType} from "../get-display-attributes-by-type";
import {toObservable} from "@angular/core/rxjs-interop";
import {merge, of} from "rxjs";
import {filter, switchMap, tap} from "rxjs/operators";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-location-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    AsyncPipe
  ],
  templateUrl: './location-edit.component.html',
  styleUrl: './location-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationEditComponent {

  formBuilder = inject(FormBuilder);
  mapTypes = Object.values(MapItemType).filter(mapType => typeof mapType === 'number');
  mapTypeSelectTexts = Object.values(MapItemType).filter(mapType => typeof mapType !== 'number');

  form = computed(() => {
    const location = this.service.location();
    if (!location) {
      return null;
    }

    return this.formBuilder.group({
      name: [location.name],
      latitude: [location.latitude],
      longitude: [location.longitude],
      type: [location.type],
      typeSpecificControls: this.formBuilder.group({})
    });
  });

  constructor(protected service: LocationBoxService, @Inject(mapDataServiceToken) private dataService: IMapItemsDataService) {

    const updateFormControlsOnTypeChange$ = toObservable(this.form).pipe(
      filter(form => !!form?.get('type')?.valueChanges),
      switchMap(form => {
        const typeCtrl = form?.get('type');
        assert(typeCtrl, "");
        return merge(of(typeCtrl.value), typeCtrl.valueChanges!)
      }));

    updateFormControlsOnTypeChange$
      .subscribe(form => this.updateDisplayedAttributes())

  }

  save() {
    const location = this.service.location();
    assert(!!location, "location is undefined");

    const formValue = this.form()?.value;

    const mapItem = formValue as MapLocation;
    mapItem.id = location?.id;

    this.updateTypeSpecificAttributes(location)

    this.saveInDataSource(location, formValue);
  }


  private saveInDataSource(location: MapLocation, formValue: unknown) {
    if (location?.id === undefined) {
      this.dataService.insert(location);
    } else {
      this.dataService.update(location);
    }
  }

  private updateTypeSpecificAttributes(location: MapLocation) {

    getDisplayAttributesByType(location.type).forEach((attr: string) => {
      const typeSpecificControls = this.form()?.get('typeSpecificControls') as FormGroup

      location.attributes[attr] = typeSpecificControls.get(attr)?.value;

    })
  }

  private updateDisplayedAttributes() {

    const selectedType = this.form()?.get('type')?.value as any;

    let typeSpecificAttributes = getDisplayAttributesByType(selectedType);
    let location = this.service.location();

    const typeSpecificControls = this.form()?.get('typeSpecificControls') as FormGroup
    this.removeExistingTypeSpecificControls(typeSpecificControls);

    for (const key of typeSpecificAttributes) {
      typeSpecificControls.addControl(key, new FormControl(location?.attributes?.[key]));
    }
  }

  private removeExistingTypeSpecificControls(typeSpecificControls: FormGroup<any>) {
    const controlKeys = Object.keys(typeSpecificControls.controls);

    controlKeys.forEach(key => {
      typeSpecificControls.removeControl(key);
    });
  }

  getTypeSpecificControlNames() {
    const typeSpecificControls = this.form()?.get('typeSpecificControls') as FormGroup
    return Object.keys(typeSpecificControls.controls);
  }
}
