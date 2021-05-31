import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AjoutDepotComponent } from 'src/app/modals/ajout-depot/ajout-depot.component';
import { DepotService } from 'src/app/services/depot.service';
import { Depot } from 'src/app/type/depot';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nomDepot', 'codeDepot', 'copie', 'supp'];

  listeDepot: MatTableDataSource<Depot>;

  constructor(private dialog: MatDialog, private elementRef: ElementRef, private toastrServ: ToastrService, private depotService: DepotService) { }

  ngOnInit(): void 
  {
    this.listeDepot = new MatTableDataSource();
    this.ListerDepot();
  }

  ngAfterViewInit(): void
  {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#D9D9D9";

    this.listeDepot.paginator = this.paginator;
    this.listeDepot.sort = this.sort;
  }

  PopUpAjoutDepot(): void
  {
    const DIALOG_REF = this.dialog.open(AjoutDepotComponent);
    DIALOG_REF.beforeClosed().subscribe(
      () =>
      {
        if(DIALOG_REF.componentInstance.ajout == true)
        {
          this.ListerDepot();
        }
      }
    );
  }

  SupprimerDepot(_id: string, _nom: string): void
  {
    if(confirm("Confirmation, supprimer le depot: " + _nom + " ?"))
    {
      const DATA = { id: _id };
      this.depotService.SupprimerDepot(DATA).subscribe(
        () =>
        {
          const INDEX = this.listeDepot.data.findIndex(depot => depot.idDepot == _id);
          this.listeDepot.data.splice(INDEX, 1);

          this.listeDepot.data = this.listeDepot.data;

          this.toastrServ.success("Le depot: " + _nom + " est supprimé", "Depot supprimé");
        },
        () =>
        {
          this.toastrServ.error(environment.msgHttp, "Erreur connexion");
        }
      );
    }
  }

  SuppAllDepot(): void
  {
    if(confirm("Confirmation, etes vous sur de vouloir supprimer TOUT les dépots ?"))
    {
      this.depotService.SupprimerAllDepot().subscribe(
        () =>
        {
          this.listeDepot.data.length = 0;
          this.listeDepot.data = this.listeDepot.data;
          this.toastrServ.success("Tout les depots sont supprimés", "Depots supprimés");
        },
        () =>
        {
          this.toastrServ.error(environment.msgHttp, "Erreur connexion");
        }
      );
    }
  }

  ConfirmCopierCode():void
  {
    this.toastrServ.success("Le code est copié", "Code copié");
  }

  applyFilter(event: Event): void
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listeDepot.filter = filterValue.trim().toLowerCase();

    if (this.listeDepot.paginator) 
    {
      this.listeDepot.paginator.firstPage();
    }
  }

  private ListerDepot(): void
  {
    this.depotService.ListerDepot().subscribe(
      (_liste: Depot[]) =>
      {
        this.listeDepot.data = _liste;
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur connexion");
      }
    );
  }

}
