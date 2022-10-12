import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quinta-clase-a';

  isflag: boolean = true;

  onOcultar(){
    this.isflag = !this.isflag;
  }

}
