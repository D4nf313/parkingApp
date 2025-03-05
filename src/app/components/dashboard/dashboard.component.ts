import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [ HeaderComponent,     MatButtonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
