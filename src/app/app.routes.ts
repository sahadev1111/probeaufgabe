import {Routes} from '@angular/router';
import {LocationViewComponent} from "./location-info/location-view/location-view.component";
import {locationResolver} from "./location-info/location.resolve";
import {LocationEditComponent} from "./location-info/location-edit/location-edit.component";
import {LocationInfoComponent} from "./location-info/location-info.component";

export const routes: Routes = [{
  path: 'locations/:id',
  component: LocationInfoComponent,
  resolve: {
    location: locationResolver
  },
  children: [
    {
      path: '',
      outlet: 'locationbox',
      component: LocationViewComponent,
      resolve: {
        location: locationResolver,
        editMode: () => false
      }
    },
    {
      path: 'edit',
      outlet: 'locationbox',
      component: LocationEditComponent
    }
  ]
}, {
  path: 'test',
  outlet: 'locationbox',
  component: LocationEditComponent,
}];
