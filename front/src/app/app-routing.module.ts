import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepotComponent } from './components/depot/depot.component';
import { EventComponent } from './components/event/event.component';
import { FactoryComponent } from './components/factory/factory.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { RecetteComponent } from './components/recette/recette.component';

const routes: Routes = [
  { path: "", component: FactoryComponent },
  { path: "depot", component: DepotComponent },
  { path: "event", component: EventComponent },
  { path: "historique", component: HistoriqueComponent },
  { path: "recette", component: RecetteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
