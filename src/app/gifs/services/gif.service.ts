import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, tap } from 'rxjs';



@Injectable({providedIn: 'root'})
export class GifService {

  //Injyectamos objeto HttpClient (recomendado)
  private http = inject(HttpClient); //Contiene peticiones para CRUD

  //Espacio para almacenar nuestros Gifs personalizados (asignamos solo los valores que necesitamos)
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true); //Marcamos la carga de datos cómo activa


  constructor() {
    this.loadTrendingGifs();
  }

  //Metodo que hace una petición HTTP ALL de los Gifs y los asigna a trendingGifs
  loadTrendingGifs() {
                                    //Especificamos ruta a hacer la petición
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
      params: { //Para hacer la petición la APY nos pide una key o token
        api_key: environment.giphyApiKey, //Se la pasamos como parametro
        limit: 20 //Podemos pasar otros parametros a la petición
      },
    }).subscribe((respuesta) => {//Nos suscribimos para que la petición se dispare
      const gifs = GifMapper.mapGiphyItemsToGifArray(respuesta.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false); //Marcamos la cargade datos como terminada
    })
  }
  //-----------------------------------------------------------------------------------

  //Metodo que busca Gifs en base a una palabra
  //Devuelve observable, no hace ninguna petición
  searchGifs(query: string){
    return this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,//Pasamos la query como parametro para la busqueda (se encarga el back)
      },
    }).pipe(
      map(({data}) => data), // Extrae la propiedad "data" del objeto
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

    );//Map es cómo stream, se pueden concatenar metodos
      //regresa una transformacion en cuanto a la respuesta del pipe

  }
}
