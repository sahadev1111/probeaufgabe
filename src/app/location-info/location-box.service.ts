import {Injectable, signal} from '@angular/core';
import {MapLocation} from "../map-location.model";

@Injectable({
  providedIn: 'root'
})
export class LocationBoxService {
  location = signal<MapLocation | null>( null);
}
