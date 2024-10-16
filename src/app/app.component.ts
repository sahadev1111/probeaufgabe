import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import 'ol/ol.css';
import {MapService} from "./map.service";
import {IMapItemsDataService, LOCATION_DATA_SERVICE} from "./data/location-data-service";
import {LocationInfoComponent} from "./location-info/location-info.component";
import {MapLocation} from "./map-location.model";
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "./app.service";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationInfoComponent, LocationInfoComponent, RouterLink, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  mapService = inject(MapService);
  mapItems = inject(LOCATION_DATA_SERVICE) as IMapItemsDataService;

  locationInfoVisible = signal(false);
  location = signal<MapLocation | null>(null);

  async ngOnInit() {
    this.mapService.initMap();

    this.reloadMapOnDataChange();

    this.appService.reloadDataCommand.next();
    this.mapService.mouseClickAtLongLat$.pipe(filter(coord => !!coord))
      .subscribe(coords => {
        this.router.navigate(['locations', 'new', {outlets: {locationbox: ['edit']}}], {queryParams: { coords}});
      });
  }

  private reloadMapOnDataChange() {
    this.appService.locations$.subscribe(async () => {

      this.mapService.clearData();

      const data = await this.mapItems.getAll();
      data.forEach(dataItem => this.mapService.addFeature(dataItem.longitude, dataItem.latitude, dataItem,
        (item: MapLocation) => {
          this.location.set(item)

          this.locationInfoVisible.set(true);

          this.router.navigate(['locations', item.id])
        }, `icons/location_type_${dataItem.type}.svg`))
    });
  }

  constructor(private translate: TranslateService, private router: Router, private appService: AppService) {
    this.translate.addLangs(['de']);
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }
}
