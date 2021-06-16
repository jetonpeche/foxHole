import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HistoriqueGlobalComponent } from '../historique-global/historique-global.component';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit, AfterViewInit
{
  @ViewChild(HistoriqueGlobalComponent) histoGcomp: HistoriqueGlobalComponent;
  dateJour: Date = new Date;

  titre: string = "Historique du " + this.dateJour.getDate() + "/" + this.dateJour.getMonth() + "/" + this.dateJour.getFullYear();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void
  {
    this.dateJour = new Date();
  }

  ngAfterViewInit(): void
  {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#D9D9D9";
  }

  SupprimerHistoriqueGlobal(): void
  {
    this.histoGcomp.SupprimerHistoriqueGlobal();
  }

  MatTab(event: MatTabChangeEvent): void
  {
    this.titre = event.index == 0 ?
    "Historique du " + this.dateJour.getDate() + "/" + this.dateJour.getMonth() + "/" + this.dateJour.getFullYear() :"Historique global";
  }
}