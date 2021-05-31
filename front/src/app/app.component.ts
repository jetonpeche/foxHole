import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HistoriqueService } from './services/historique.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{

  constructor(private historiqueService: HistoriqueService, private toastrServ: ToastrService) { }

  ngOnInit(): void
  {
    this.historiqueService.SupprimerHistoriqueJournalier().subscribe(
      () =>
      {

      },
      () =>
      {
        this.toastrServ.error("Impossible de supprimer l'historique journalier", "Erreur connexion");
      }
    );
  }
}
