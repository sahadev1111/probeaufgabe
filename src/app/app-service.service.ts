import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  showLocationInfo = signal(false);

  constructor() { }
}
