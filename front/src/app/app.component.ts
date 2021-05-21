import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AjoutObjComponent } from 'src/app/modals/ajout-obj/ajout-obj.component';
import { ItemService } from './services/item.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Item } from './type/item';
import { TypeItem } from './type/typeItem';
import { FactionService } from './services/faction.service';
import { Faction } from './type/faction';
import { AjoutListComponent } from './modals/ajout-list/ajout-list.component';
import { ListeObj } from './type/listeObj';
import { ListeService } from './services/liste.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private dialog: MatDialog, 
    private toastrServ: ToastrService, 
    private itemService: ItemService,
    private factService: FactionService,
    private listeObjService: ListeService
    ) { }

  ngOnInit(): void
  {
    this.ListerFaction();
    this.ListerItem();
    this.ListerListeObj();

    this.itemService.ListerType().subscribe(
      (_liste: TypeItem[]) =>
      {
        sessionStorage.setItem("listeType", JSON.stringify(_liste));
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur réseau");
      }
    );
  }

  PopUpAjoutObj(): void
  {
    const DIALOG_REF = this.dialog.open(AjoutObjComponent, { disableClose: true });
    DIALOG_REF.afterClosed().subscribe(
      () =>
      {
        if(DIALOG_REF.componentInstance.ajout == true)
          this.ListerItem();
      }
    );
  }

  PopUpAjoutListe(): void
  {
    const DIALOG_REF = this.dialog.open(AjoutListComponent, { disableClose: true });
    DIALOG_REF.afterClosed().subscribe(
      () =>
      {
        if(DIALOG_REF.componentInstance.ajout == true)
          this.ListerListeObj();
      }
    );
  }

  private ListerItem(): void
  {
    this.itemService.ListerItem().subscribe(
      (_liste: Item[]) =>
      { 
        sessionStorage.setItem("listeItem", JSON.stringify(_liste));
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur réseau");
      }
    );
  }

  private ListerFaction(): void
  {
    this.factService.ListerFaction().subscribe(
      (_liste: Faction[]) =>
      {
        sessionStorage.setItem("listeFaction", JSON.stringify(_liste));
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur réseau");
      }
    );
  }

  private ListerListeObj(): void
  {
    this.listeObjService.ListerListe().subscribe(
      (_liste) =>
      {       
        sessionStorage.setItem("listeListeObj", JSON.stringify(_liste));
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur réseau");
      }
    );
  }
}
