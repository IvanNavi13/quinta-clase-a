import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { UserData } from '../../libs/entity/user-data.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.component.html',
  styleUrls: ['./dos.component.scss']
})
export class DosComponent implements OnInit {

  public name: string = '';
  public password: string = '';
  public detector$?: Observable<any>;

  constructor(public infoService: InfoService) { }

  ngOnInit(): void {

    // this.infoService.data$.subscribe({next: (resp:UserData) })

  }

}
