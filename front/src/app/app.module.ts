import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular mat
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// components
import { FactoryComponent } from './components/factory/factory.component';
import { DepotComponent } from './components/depot/depot.component';
import { EventComponent } from './components/event/event.component';
import { HistoriqueComponent } from './components/historique/historique.component';

// services
import { FactoryService } from './services/factory.service';
import { ItemService } from './services/item.service';
import { ListeService } from './services/liste.service';
import { FactionService } from './services/faction.service';
import { DepotService } from './services/depot.service';
import { EventService } from './services/event.service';
import { HistoriqueService } from './services/historique.service';

// modals
import { AjoutListComponent } from './modals/ajout-list/ajout-list.component';
import { AjoutObjComponent } from './modals/ajout-obj/ajout-obj.component';
import { AjoutObjListComponent } from './modals/ajout-obj-list/ajout-obj-list.component';
import { AjoutDepotComponent } from './modals/ajout-depot/ajout-depot.component';
import { SuppListeComponent } from './modals/supp-liste/supp-liste.component';
import { AjoutEventComponent } from './modals/ajout-event/ajout-event.component';
import { ListeItemEventComponent } from './modals/liste-item-event/liste-item-event.component';
import { AjoutPseudoComponent } from './modals/ajout-pseudo/ajout-pseudo.component';

// permet de donner la possibilité de refrech la page en mode prod en ajoutant un # sur URL
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HistoriqueJournalierComponent } from './components/historique-journalier/historique-journalier.component';
import { HistoriqueGlobalComponent } from './components/historique-global/historique-global.component';
import { RecetteComponent } from './components/recette/recette.component';

@NgModule({
  declarations: [
    AppComponent,
    FactoryComponent,
    AjoutListComponent,
    AjoutObjComponent,
    AjoutObjListComponent,
    DepotComponent,
    AjoutDepotComponent,
    SuppListeComponent,
    EventComponent,
    AjoutEventComponent,
    ListeItemEventComponent,
    AjoutPseudoComponent,
    HistoriqueComponent,
    HistoriqueJournalierComponent,
    HistoriqueGlobalComponent,
    RecetteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTooltipModule,
    ClipboardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(
      {
        timeOut: 4000,
        progressBar: true,
        progressAnimation: 'increasing'
        //positionClass: 
      }
    )
  ],

  entryComponents: [AjoutListComponent, AjoutObjComponent, AjoutObjListComponent, AjoutDepotComponent, SuppListeComponent, AjoutPseudoComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    FactoryService,
    ItemService,
    ListeService,
    FactionService,
    DepotService,
    EventService,
    HistoriqueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
