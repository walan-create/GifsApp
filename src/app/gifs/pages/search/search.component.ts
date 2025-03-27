import { Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search',
  imports: [ListComponent],
  templateUrl: './search.component.html',
})
export default class SearchComponent {

  gifService = inject( GifService )
  gifs = signal<Gif[]>([]); //Gifs a mostrar

  onSearch( query:string ){
    this.gifService.searchGifs(query).subscribe( resp => {
      this.gifs.set(resp);
    });
  }

 }
