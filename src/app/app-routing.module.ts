import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertorComponent } from './components/convertor/convertor.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent 
  },
  { 
    path: '**', 
    redirectTo: 'not-found' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
