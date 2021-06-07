import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AjoutListComponent } from 'src/app/modals/ajout-list/ajout-list.component';
import { AjoutObjListComponent } from 'src/app/modals/ajout-obj-list/ajout-obj-list.component';
import { AjoutObjComponent } from 'src/app/modals/ajout-obj/ajout-obj.component';
import { AjoutPseudoComponent } from 'src/app/modals/ajout-pseudo/ajout-pseudo.component';
import { SuppListeComponent } from 'src/app/modals/supp-liste/supp-liste.component';
import { FactionService } from 'src/app/services/faction.service';
import { ItemService } from 'src/app/services/item.service';
import { ListeService } from 'src/app/services/liste.service';
import { PseudoService } from 'src/app/services/pseudo.service';
import { Faction } from 'src/app/type/faction';
import { Item } from 'src/app/type/item';
import { Pseudo } from 'src/app/type/pseudo';
import { TypeItem } from 'src/app/type/typeItem';
import { environment } from 'src/environments/environment';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})

export class FactoryComponent implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  myControl: FormControl;
  listePseudoFiltre: Observable<Pseudo[]>;

  listeListeNom: any[] = [];

  displayedColumns: string[] = ['nomItem', 'recette', 'qte', 'qteFait'];
  listeObj: MatTableDataSource<any>;

  private listePseudo: Pseudo[] = [];
  private idListeChoisis: string;

  constructor(private toastrServ: ToastrService,
              private factService: FactionService,
              private listeObjService: ListeService, 
              private itemService: ItemService, 
              private listeService: ListeService, 
              private pseudoService: PseudoService,
              private dialog: MatDialog,
              private elementRef: ElementRef) { }

  ngOnInit(): void
  {
    sessionStorage.removeItem("idPseudo");

    this.listeObj = new MatTableDataSource();
    this.myControl = new FormControl();

    this.ListerPseudo();
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
    this.listeObj.paginator = this.paginator;
    this.listeObj.sort = this.sort;

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#D9D9D9";
  }

  applyFilter(event: Event): void 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listeObj.filter = filterValue.trim().toLowerCase();

    if (this.listeObj.paginator) 
    {
      this.listeObj.paginator.firstPage();
    }
  }

  AfficherQteRecette(_index: number , _qte: number): string
  {
    let recette: string = "";

    const LISTE: any[] = this.listeObj.data[_index].recetteUnite;

    for (const ELEMENT of LISTE) 
    {
      recette += +ELEMENT.qteItem * _qte + " " + ELEMENT.nomItem + " ";
    } 

    return recette;
  }

  PseudoChoisi(_pseudo: Pseudo): string
  {
    if(_pseudo && _pseudo.nomPseudo)
    {
      sessionStorage.setItem("idPseudo", _pseudo.idPseudo);

      return _pseudo.nomPseudo;
    }
    else
    {
      return undefined;
    }
  }

  ListerObj(_id: string): void
  {
    this.idListeChoisis = _id;

    const INDEX = this.listeListeNom.findIndex(liste => liste.idListFactory == _id);
    this.listeObj.data = this.listeListeNom[INDEX].listeItem;    
  }

  ReduireQte(_idItem: string, _qte: number, _inputQte): void
  {
    // MAJ qte restante
    const ITEM = this.listeObj.data.find(item => item.idItem == _idItem);
    const QTE_RESTANTE = ITEM.qte - _qte;

    if(QTE_RESTANTE >= 0)
    {
      // pseudo choisi ?
      if (sessionStorage.getItem("idPseudo") != null) 
      {
        const DATA = { idListItem: this.idListeChoisis, idPseudo: sessionStorage.getItem("idPseudo"), idItem: _idItem, qte: _qte };

        this.listeService.ReduireQteItem(DATA).subscribe(
          () =>
          {
            if(QTE_RESTANTE == 0)
            {
              const INDEX = this.listeObj.data.findIndex(item => item.idItem == _idItem);
              this.listeObj.data.splice(INDEX, 1);

              this.listeObj.data = this.listeObj.data;

              this.toastrServ.success("L'item est supprimé de la liste", "MAJ liste");
            }
            else
            {
              this.toastrServ.success("La quantité est mise à jour", "MAJ quantité");           
              ITEM.qte = QTE_RESTANTE;
            }

            // reset input
            _inputQte.value = "";
          },
          () =>
          {
            this.toastrServ.error(environment.msgHttp, "erreur réseaux");
          }
        );
      }
      else
      {
        this.toastrServ.info("Selectionne ton pseudo", "Aucun pseudo");
      }
    }
    else
    {
      this.toastrServ.warning("La quantité ne peut est négative");
    }    
  }

  SupprimerItemListe(_idItem: string, _nomItem: string): void
  {
    if(confirm("Confirmation, suppression de l'item: " + _nomItem))
    {
      const DATA = { idItem: _idItem, idListe: this.idListeChoisis };

      this.listeService.SupprimerItemListe(DATA).subscribe(
        () =>
        {
          const INDEX = this.listeObj.data.findIndex(item => item.idItem == _idItem);
          this.listeObj.data.splice(INDEX, 1);
        }, 
        () =>
        {
          this.toastrServ.error(environment.msgHttp, "erreur réseaux");
        }
      );
    }
  }

  PopUpSupprimerListe(): void
  {
    const DIALOG_REF = this.dialog.open(SuppListeComponent, { disableClose: true, data: { liste: this.listeListeNom }});

    DIALOG_REF.beforeClosed().subscribe(
      () =>
      {
        if(DIALOG_REF.componentInstance.listeSupp == true)
        { 
          this.idListeChoisis = null;       
        }   
      }
    );
  }

  // btn enlevé
  PopUpAjoutObj(): void
  {
    const DIALOG_REF = this.dialog.open(AjoutObjComponent);
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
    const DIALOG_REF = this.dialog.open(AjoutListComponent);
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
    if(this.idListeChoisis != null)
    {
      let liste = this.listeListeNom.find(liste => liste.idListFactory == this.idListeChoisis);

      const DIALOG_REF = this.dialog.open(AjoutObjListComponent, { disableClose: true, data: { liste }});
      DIALOG_REF.afterClosed().subscribe(
        () =>
        {
          this.ListerObj(this.idListeChoisis); 
        }
      );
    }
    else
    {
      this.toastrServ.warning("Aucune liste selectionnée", "Erreur liste");
    }
  }

  PopUpAjoutPseudo(): void
  {
    const DIALOG_REF = this.dialog.open(AjoutPseudoComponent, { data: { listePseudo: this.listePseudo }});
    DIALOG_REF.beforeClosed().subscribe(
      () =>
      {
        if(DIALOG_REF.componentInstance.ajout == true)
          this.ListerPseudo();
      }
    );
  }

  GetIdListeChoisie(): string
  {
    return this.idListeChoisis;
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

  private ListerPseudo(): void
  {
    this.pseudoService.ListerPseudo().subscribe(
      (_liste) =>
      {
        this.listePseudo = _liste;
        this.OnInit();
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur réseau");
      }
    );
  }

  private OnInit(): void
  {
    this.listePseudoFiltre = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.Filtre(value))
      );
  }

  private Filtre(name: string): Pseudo[]
  {
    const filterValue = name.toLowerCase();

    return this.listePseudo.filter(option => option.nomPseudo.toLowerCase().indexOf(filterValue) === 0);
  }
}
