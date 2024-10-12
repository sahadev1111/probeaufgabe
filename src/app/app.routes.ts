import {Routes} from '@angular/router';
import {LocationViewComponent} from "./spot-info/location-view/location-view.component";
import {locationResolver} from "./spot-info/location.resolve";
import {LocationEditComponent} from "./spot-info/location-edit/location-edit.component";
import {LocationInfo} from "./spot-info/location-info.component";

export const routes: Routes = [{
  path: 'locations/:id',
  component: LocationInfo,
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
