import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepotComponent } from './components/depot/depot.component';
import { FactoryComponent } from './components/factory/factory.component';

const routes: Routes = [
  { path: "", component: FactoryComponent },
  { path: "depot", component: DepotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
