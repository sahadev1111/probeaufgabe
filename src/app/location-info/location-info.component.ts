import {Component, model, OnChanges, SimpleChanges} from '@angular/core';
import {MapLocation} from "../model/map-location.model";
import {LocationBoxService} from "./location-box.service";
import {LocationViewComponent} from "./location-view/location-view.component";
import {LocationEditComponent} from "./location-edit/location-edit.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'location-info',
  standalone: true,
  imports: [
    LocationViewComponent,
    LocationEditComponent,
    RouterOutlet
  ],
  templateUrl: './location-info.component.html',
  styleUrl: './location-info.component.scss',
  providers: [LocationBoxService]
})
export class LocationInfo implements OnChanges {
  visible = model(false);
  location = model<MapLocation | null>(null);

  constructor(protected service: LocationBoxService,
              protected router: Router,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.data.subscribe((data) => {
      service.location.set(data["location"]);
    })
  }

  ngOnChanges(): void {
    this.service.location = this.location;
  }
}
