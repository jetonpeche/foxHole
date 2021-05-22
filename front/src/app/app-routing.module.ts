import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryComponent } from './components/factory/factory.component';

const routes: Routes = [
  { path: "", component: FactoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
