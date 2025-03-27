import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'list-item',
  imports: [],
  templateUrl: './list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  //recibe como parametro la direccion de la imagen (string) dada por el padre
  imageUrl = input.required<string>();
 }
