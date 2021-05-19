import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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

// components
import { FactoryComponent } from './components/factory/factory.component';

// services
import { FactoryService } from './services/factory.service';
import { ItemService } from './services/item.service';

// modals
import { AjoutListComponent } from './modals/ajout-list/ajout-list.component';
import { AjoutObjComponent } from './modals/ajout-obj/ajout-obj.component';
import { AjoutObjListComponent } from './modals/ajout-obj-list/ajout-obj-list.component';

// permet de donner la possibilité de refrech la page en mode prod en ajoutant un # sur URL
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FactoryComponent,
    AjoutListComponent,
    AjoutObjComponent,
    AjoutObjListComponent
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
    ToastrModule.forRoot(
      {
        timeOut: 4000,
        progressBar: true,
        progressAnimation: 'increasing'
        //positionClass: 
      }
    )
  ],

  entryComponents: [AjoutListComponent, AjoutObjComponent, AjoutObjListComponent],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, FactoryService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
