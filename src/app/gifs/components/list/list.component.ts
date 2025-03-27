import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core'; // Corregido: Input en mayúsculas
import { ListItemComponent } from "./list-item/list-item.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'list',
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {

  //Recibe como parametro la lista dada por el padre
  gifs = input.required<Gif[]>();

}
