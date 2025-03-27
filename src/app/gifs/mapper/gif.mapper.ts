//la idea de este mapper es que recibamos el objeto que
//viene de la API de Giphy y regresemos un objeto basado en nuestra interfaz

import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy.interfaces';

export class GifMapper {
  static mapGiphyItemToGif(giphyItem: GiphyItem): Gif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.original.url,
    };
  }

  static mapGiphyItemsToGifArray(giphyArray: GiphyItem[]): Gif[] {
    // el .map actua sobre cada elemento pasado en un array y lo convierte dependiendo del mapper que se le indique
    // después devuelve un array con todos los elementos convertidos
    return giphyArray.map(this.mapGiphyItemToGif);
  }

}
