import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertorComponent } from './components/convertor/convertor.component';
import { DetailsViewComponent } from './components/details-view/details-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/convertor',
    pathMatch: 'full',
  },
  {
    path: 'details',
    component: DetailsViewComponent
  },
  {
    path: 'convertor',
    component: ConvertorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
