import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-liste-item-event',
  templateUrl: './liste-item-event.component.html',
  styleUrls: ['./liste-item-event.component.css']
})
export class ListeItemEventComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void 
  {
    
  }

}
