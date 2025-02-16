import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  standalone:true,
  imports: [FooterComponent,NavBlankComponent,RouterOutlet],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

  constructor(){
    console.log('hello from blank-layout')
  }
}
