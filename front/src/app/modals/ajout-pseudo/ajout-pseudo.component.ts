import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PseudoService } from 'src/app/services/pseudo.service';
import { Pseudo } from 'src/app/type/pseudo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ajout-pseudo',
  templateUrl: './ajout-pseudo.component.html',
  styleUrls: ['./ajout-pseudo.component.css']
})
export class AjoutPseudoComponent implements OnInit {

  listePseudo: Pseudo[] = [];
  ajout: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AjoutPseudoComponent>, private pseudoService: PseudoService, private toastrServ: ToastrService) { }

  ngOnInit(): void 
  {
    this.listePseudo = this.data.listePseudo;
  }

  AjouterPseudo(_form: NgForm): void
  {
    const PSEUDO = this.listePseudo.find(pseudo => pseudo.nomPseudo == _form.value["pseudo"]);

    if(PSEUDO == null)
    {
      this.pseudoService.AjouterPseudo(_form.value).subscribe(
        () =>
        {
          this.ajout = true;
          this.toastrServ.success("Ton pseudo est ajouté", "Pseudo ajouté");
          this.dialogRef.close();
        },
        () =>
        {
          this.toastrServ.error(environment.msgHttp, "Erreur connexion");
        }
      );
    }
    else
    {
      this.toastrServ.warning("Ton pseudo existe déjà", "Pseudo existant");
    }
  }
}
