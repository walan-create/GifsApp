import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideMenuHeaderComponent } from "./side-menu-header/side-menu-header.component";
import { SideMenuOptionsComponent } from "./side-menu-options/side-menu-options.component";

@Component({
  selector: 'side-menu',
  imports: [SideMenuHeaderComponent, SideMenuOptionsComponent],
  standalone: true,
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent { }
