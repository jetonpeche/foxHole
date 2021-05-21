import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryComponent } from './components/factory/factory.component';
import { MassFactoryComponent } from './components/mass-factory/mass-factory.component';

const routes: Routes = [
  { path: "", component: FactoryComponent },
  {path: "massFactory", component: MassFactoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
