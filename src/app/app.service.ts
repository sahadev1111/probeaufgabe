import {inject, Injectable} from '@angular/core';
import {Subject, switchMap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {IMapItemsDataService, mapDataServiceToken} from "./data/location-data-service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  reloadDataCommand = new Subject<void>();
  mapItems = inject(mapDataServiceToken) as IMapItemsDataService;
  locations$ = this.reloadDataCommand.pipe(
    switchMap(() => fromPromise(this.mapItems.getData()))
    );
  locations = toSignal(this.locations$);

  l = toSignal(this.locations$)

  constructor() {
    this.reloadDataCommand.next();
  }

}
