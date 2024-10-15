import {Component, computed} from '@angular/core';
import {LocationBoxService} from "../location-box.service";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {getDisplayAttributesByType} from "../get-display-attributes-by-type";
import {assert} from "../../lib/assert";


@Component({
  selector: 'app-location-view',
  standalone: true,
  imports: [
    TranslateModule, ReactiveFormsModule
  ],
  templateUrl: './location-view.component.html',
  styleUrl: './location-view.component.scss'
})
export class LocationViewComponent {

  constructor(protected service: LocationBoxService, protected router: Router) {
  }

  attributes = computed<string[]>(() => {
    const location = this.service.location();
    assert(location, "expected location to be defined");

    return getDisplayAttributesByType(location.type)
  });
}

