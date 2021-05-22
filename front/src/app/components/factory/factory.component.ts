import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AjoutListComponent } from 'src/app/modals/ajout-list/ajout-list.component';
import { AjoutObjListComponent } from 'src/app/modals/ajout-obj-list/ajout-obj-list.component';
import { AjoutObjComponent } from 'src/app/modals/ajout-obj/ajout-obj.component';
import { FactionService } from 'src/app/services/faction.service';
import { ItemService } from 'src/app/services/item.service';
import { ListeService } from 'src/app/services/liste.service';
import { Faction } from 'src/app/type/faction';
import { Item } from 'src/app/type/item';
import { TypeItem } from 'src/app/type/typeItem';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})

export class FactoryComponent implements OnInit, AfterViewInit
{
  listeListeNom: any[] = [];
  listeObj: any[] = [];

  private idListeChoisis: string;

  constructor(private toastrServ: ToastrService,
              private factService: FactionService,
              private listeObjService: ListeService, 
              private itemService: ItemService, 
              private listeService: ListeService, 
              private dialog: MatDialog,
              private elementRef: ElementRef) { }

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

  ngAfterViewInit(): void
  {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#D9D9D9";
  }

  ListerObj(_id: string): void
  {
    this.idListeChoisis = _id;

    const INDEX = this.listeListeNom.findIndex(liste => liste.idListFactory == _id);
    this.listeObj = this.listeListeNom[INDEX].listeItem;    
  }

  ReduireQte(_idItem: string, _qte: number): void
  {
    // MAJ qte restante
    const ITEM = this.listeObj.find(item => item.idItem == _idItem);
    const QTE_RESTANTE = ITEM.qte - _qte;

    if(QTE_RESTANTE > 0)
    {
      const DATA = { idListItem: this.idListeChoisis, idItem: _idItem, qte: _qte };

      this.listeService.ReduireQteItem(DATA).subscribe(
        () =>
        {
          if(QTE_RESTANTE == 0)
          {
            const INDEX = this.listeObj.findIndex(item => item.idItem == _idItem);
            this.listeObj.splice(INDEX, 1);
          }
          else
          {
            ITEM.qte = QTE_RESTANTE;
          }
        },
        () =>
        {
          this.toastrServ.error(environment.msgHttp, "erreur réseaux");
        }
      );
    }
    else
    {
      this.toastrServ.warning("La quantité ne peut est négative");
    }    
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

  PopUpAjoutObjListe(): void
  {
    this.dialog.open(AjoutObjListComponent, { data: { liste: this.listeListeNom, listeObj: this.listeObj }});
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
        this.listeListeNom = _liste;
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur réseau");
      }
    );
  }
}
