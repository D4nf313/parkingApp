import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dashboard',
  imports: [ HeaderComponent,     MatButtonModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
