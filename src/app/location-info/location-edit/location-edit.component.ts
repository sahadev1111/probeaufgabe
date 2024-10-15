import {ChangeDetectionStrategy, Component, computed, Inject, inject, OnDestroy, signal} from '@angular/core';
import {LocationBoxService} from "../location-box.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {IMapItemsDataService, LOCATION_DATA_SERVICE} from "../../data/location-data-service";
import {MapItemType, MapLocation} from "../../model/map-location.model";
import {assert} from "../../lib/assert";
import {TranslateModule} from "@ngx-translate/core";
import {getDisplayAttributesByType} from "../get-display-attributes-by-type";
import {toObservable} from "@angular/core/rxjs-interop";
import {merge, of, Subject, takeUntil} from "rxjs";
import {filter, switchMap} from "rxjs/operators";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";
import {AppService} from "../../app.service";

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
export class LocationEditComponent implements OnDestroy {

  formBuilder = inject(FormBuilder);
  mapTypes = Object.values(MapItemType).filter(mapType => typeof mapType === 'number');
  mapTypeSelectTexts = Object.values(MapItemType).filter(mapType => typeof mapType !== 'number');
  destroySubject = new Subject<void>();
  typeSpecificControlNames = signal<string[]>([]);

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

  constructor(protected service: LocationBoxService,
              private appService: AppService,
              @Inject(LOCATION_DATA_SERVICE) private dataService: IMapItemsDataService,
              private router: Router) {

    const onTypeChange$ = toObservable(this.form).pipe(
      filter(form => !!form?.get('type')?.valueChanges),
      switchMap(form => {
        const typeCtrl = form?.get('type');
        assert(typeCtrl, "expected type control to exist");
        return merge(of(typeCtrl.value), typeCtrl.valueChanges!) // we know valueChanges is not null because of filter above
      }));

    onTypeChange$
      .pipe(takeUntil(this.destroySubject))
      .subscribe(() => this.updateDisplayedAttributes());
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  async save() {
    const formValue = this.form()?.value;

    const mapItem = formValue as MapLocation;
    mapItem.id = this.service.location()?.id;

    this.updateTypeSpecificAttributes(mapItem);

    await this.saveInDataSource(mapItem);
  }


  private async saveInDataSource(location: MapLocation) {
    if (location?.id === undefined) {
      const savedLocation = await this.dataService.insert(location);
      this.router.navigate(['locations', savedLocation.id])
    } else {
      await this.dataService.update(location);
    }

    this.appService.reloadDataCommand.next();
  }

  private updateTypeSpecificAttributes(location: MapLocation) {
    location.attributes = {};

    getDisplayAttributesByType(location.type).forEach((attr: string) => {
      const typeSpecificControls = this.form()?.get('typeSpecificControls') as FormGroup

      location.attributes[attr] = typeSpecificControls.get(attr)?.value;
    })
  }

  private updateDisplayedAttributes() {

    const selectedType = this.form()?.get('type')?.value as MapItemType;

    const typeSpecificAttributes = getDisplayAttributesByType(selectedType);
    const location = this.service.location();

    const typeSpecificControls = this.form()?.get('typeSpecificControls') as FormGroup
    this.removeExistingTypeSpecificControls(typeSpecificControls);

    for (const key of typeSpecificAttributes) {
      typeSpecificControls.addControl(key, new FormControl(location?.attributes?.[key]));
    }

    this.updateTypeSpecificControlNames();
  }

  private removeExistingTypeSpecificControls(typeSpecificControls: FormGroup) {
    const controlKeys = Object.keys(typeSpecificControls.controls);

    controlKeys.forEach(key => {
      typeSpecificControls.removeControl(key);
    });
  }


  updateTypeSpecificControlNames() {
    const typeSpecificControls = this.form()?.get('typeSpecificControls') as FormGroup

    this.typeSpecificControlNames.set(Object.keys(typeSpecificControls.controls));
  }
}
