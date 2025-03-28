import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gif.service';
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'history',
  imports: [ListComponent],
  templateUrl: './history.component.html',
})
export default class HistoryComponent {
  //  inject(ActivatedRoute): Devuelve un Observable la ruta activa
  //  .params: Devuelve los parametros que vuelven por el URL
  //  .subscribe: Ejecuta el bloque de código cuando el Observable emite un valor.
  /*queryEjemplo = inject(ActivatedRoute).params.subscribe((params) => {
    console.log(params['query']); // Tomamos el valor del query pasado por la ruta (history/:query)
  });*/

  gifService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query'] ?? 'No query'))
  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query())
  })
}
