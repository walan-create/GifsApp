import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    SideMenuComponent
],
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent { 

 }
