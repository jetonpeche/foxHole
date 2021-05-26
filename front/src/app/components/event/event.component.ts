import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AjoutEventComponent } from 'src/app/modals/ajout-event/ajout-event.component';
import { ListeItemEventComponent } from 'src/app/modals/liste-item-event/liste-item-event.component';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit
{
  listeEvent: any[] = [];

  constructor(private dialog: MatDialog, private eventService: EventService, private toastrServ: ToastrService, private elementRef: ElementRef) { }

  ngOnInit(): void 
  {
    this.ListerEvent();
  }

  ngAfterViewInit(): void
  {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#D9D9D9";
  }

  SuppEvent(_id: string, _nom: string): void
  {
    if(confirm("Confirmation, supprission de l'event: " + _nom + " ?"))
    {
      const DATA = { idEvent: _id };
      this.eventService.SupprimerEvent(DATA).subscribe(
        () =>
        {
          const INDEX = this.listeEvent.findIndex(liste => liste.idEvent == _id);
          this.listeEvent.splice(INDEX, 1);

          this.toastrServ.success("L'event: " + _nom + " est supprimé", "event supprimé");
        },
        () =>
        {
          this.toastrServ.error(environment.msgHttp, "erreur réseaux");
        }
      );
    }
  }

  PopUpCreerEvent(): void
  {
    const DIALOG_REF = this.dialog.open(AjoutEventComponent);
    DIALOG_REF.beforeClosed().subscribe(
      () =>
      {
        if(DIALOG_REF.componentInstance.ajout == true)
          this.ListerEvent();
      }
    );
  }

  PopUpListeItemEvent(_listeItem: any[]): void
  {
    this.dialog.open(ListeItemEventComponent, { data: { _listeItem }});
  }

  private ListerEvent(): void
  {
    this.eventService.ListerEvent().subscribe(
      (_liste) =>
      {
        this.listeEvent = _liste;
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "erreur réseaux");
      }
    );
  }

}
