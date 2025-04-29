import { ChangeDetectionStrategy, Component } from '@angular/core';
//Este import es cuando añadimos el environment en tsconfig.json
import { environment } from '@environments/environment';
// import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'side-menu-header',
  imports: [],
  standalone:true,
  templateUrl: './side-menu-header.component.html',
 })
export class SideMenuHeaderComponent {
  envs = environment
 }
