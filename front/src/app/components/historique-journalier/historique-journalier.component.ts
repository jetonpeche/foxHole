import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HistoriqueService } from 'src/app/services/historique.service';
import { Historique } from 'src/app/type/historique';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historique-journalier',
  templateUrl: './historique-journalier.component.html',
  styleUrls: ['./historique-journalier.component.css']
})
export class HistoriqueJournalierComponent implements OnInit 
{
  listeHistoriqueJournalier: Historique[] = [];

  constructor(private historiqueService: HistoriqueService, private toastrServ: ToastrService,) { }

  ngOnInit(): void 
  {
    this.historiqueService.ListerHistoriqueJournalier().subscribe(
      (_liste: Historique[]) =>
      {
        this.listeHistoriqueJournalier = _liste;     
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur conexion");
      }
    );
  }

}
