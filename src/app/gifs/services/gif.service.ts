import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';

//Creamos LocalStorage para devolver datos en el navegador
const loadGifsFromLocalStorage = (): Record<string, Gif[]> => {
  const gifs = localStorage.getItem(GIF_KEY) ?? '{}'; //Estamos guardando un Record<string, Gif[]>
  return gifs ? JSON.parse(gifs) : {};
}

@Injectable({providedIn: 'root'})
export class GifService {

  //Injyectamos objeto HttpClient (recomendado)
  private http = inject(HttpClient); //Contiene peticiones para CRUD

  //Espacio para almacenar nuestros Gifs personalizados (asignamos solo los valores que necesitamos)
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true); //Marcamos la carga de datos cómo activa

  searchHistory = signal<Record<string, Gif[]>>(loadGifsFromLocalStorage()) //Se inicializa con la info de LocalStorage
  //Cada vez que esta señal cambie automaticamente se va a volver a computar el searchHistoryKeys
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  saveGifsToLocalStorage = effect(() => {
    console.log(`Guardando en localSt ${this.searchHistory()}`);
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));//JSON.stringify serializa a string
  });

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
      this.trendingGifsLoading.set(false); //Marcamos la carga de datos como terminada
    })
  }
  //-----------------------------------------------------------------------------------

  //Metodo que busca Gifs en base a una palabra
  //Devuelve observable, no hace ninguna petición
  searchGifs(query: string):Observable<Gif[]>  {
    return this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,//Pasamos la query como parametro para la busqueda (se encarga el back)
      },
    })
    .pipe(
      map(({ data }) => data), // Extrae la propiedad "data" del objeto
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

      // Historial
      tap( items => {
        this.searchHistory.update((history) => ({
          ... history,
          [query.toLowerCase()]: items,
        }));
      })
    );//Map es cómo stream, se pueden concatenar metodos
      //regresa una transformacion en cuanto a la respuesta del pipe
  }
  //-----------------------------------------------------------------------------------

  getHistoryGifs(query: string): Gif[]{
    return this.searchHistory()[query] ?? []
  }
  //-----------------------------------------------------------------------------------

  deleteGifsFromLocalStorage() {
    localStorage.removeItem(GIF_KEY); // Borra solo la clave 'gifs' del localStorage
    this.searchHistory.set({}); // Limpia también la señal `searchHistory`
    console.log('Se han borrado los GIFs del localStorage');
  }
}
