import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HistoriqueService } from 'src/app/services/historique.service';
import { Historique } from 'src/app/type/historique';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historique-global',
  templateUrl: './historique-global.component.html',
  styleUrls: ['./historique-global.component.css']
})
export class HistoriqueGlobalComponent implements OnInit 
{
  listeHistoriqueGlobal: Historique[] = [];

  constructor(private historiqueService: HistoriqueService, private toastrServ: ToastrService) { }

  ngOnInit(): void 
  {
    this.ListerHistoriqueGlobal();
  }

  SupprimerHistoriqueGlobal(): void
  {
    if(confirm("Confirmation, Suppression de l'historique global"))
    {
      if(confirm("2e confirmation, suppression de l'historique global"))
      {
        this.historiqueService.SupprimerHistoriqueGlobal().subscribe(
          () =>
          {
            this.ListerHistoriqueGlobal();
          },
          () =>
          {
            this.toastrServ.error(environment.msgHttp, "Erreur connexion");
          }
        );
      }
    }
  }

  private ListerHistoriqueGlobal(): void
  {
    this.historiqueService.ListerHistoriqueGlobal().subscribe(
      (_liste: Historique[]) =>
      {
        this.listeHistoriqueGlobal = _liste;
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur connexion");
      }
    );
  }
}