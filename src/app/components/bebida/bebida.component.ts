import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.component.html',
  styleUrls: ['./bebida.component.scss']
})
export class BebidaComponent implements OnInit {

  public bebidas: any[]= [];  //bebida interface

  constructor(public request: RequestService) { }

  ngOnInit(): void {
    this.request.getCoctel('margarita').subscribe({
      next: data =>{
      console.log(data)
      this.bebidas = data;
    }})
  }

}
