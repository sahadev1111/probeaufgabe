import {Component, computed} from '@angular/core';
import {LocationBoxService} from "../location-box.service";
import {TranslateModule} from "@ngx-translate/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

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

  attributes = computed<[string, string][]>(() => Object.entries(this.service.location()?.attributes || []));
}

