import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import 'ol/ol.css';
import {MapService} from "./map.service";
import {IMapItemsDataService, mapDataServiceToken} from "./data/location-data-service";
import {HardCodedLocationsService} from "./data/hard-coded-locations.service";
import {LocationInfo} from "./location-info/location-info.component";
import {MapLocation} from "./model/map-location.model";
import {TranslateService} from "@ngx-translate/core";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationInfo, LocationInfo, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{
    provide: mapDataServiceToken,
    useValue: new HardCodedLocationsService()
  }]
})
export class AppComponent {

  mapService = inject(MapService);
  mapItems = inject(mapDataServiceToken) as IMapItemsDataService;
  locationInfoVisible = signal(false);
  location = signal<MapLocation | null>(null);
  sidebarCollapsed = signal<boolean>(false);
  locations = toSignal(fromPromise(this.mapItems.getData()));

  async ngOnInit() {
    this.mapService.initMap();
    const data = await this.mapItems.getData();
    data.forEach(dataItem => this.mapService.addFeature(dataItem.longitude, dataItem.latitude, dataItem,
      (item: MapLocation) => {
        this.location.set(item)

        this.locationInfoVisible.set(true);

        this.router.navigate(['locations', item.id])
      }, `icons/location_type_${dataItem.type}.svg`))
  }

  constructor(private translate: TranslateService, private router: Router) {

    this.translate.addLangs(['de']);
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }
}
