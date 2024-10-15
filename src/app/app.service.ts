import {inject, Injectable} from '@angular/core';
import {Subject, switchMap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {IMapItemsDataService, LOCATION_DATA_SERVICE} from "./data/location-data-service";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  reloadDataCommand = new Subject<void>();
  mapItems = inject(LOCATION_DATA_SERVICE) as IMapItemsDataService;

  locations$ = this.reloadDataCommand.pipe(
    switchMap(() => fromPromise(this.mapItems.getAll()))
  );

  locations = toSignal(this.locations$);

  constructor() {
    this.reloadDataCommand.next();
  }

}
