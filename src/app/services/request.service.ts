import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge } from 'rxjs';
import { combineLatestAll, concatMap, map, tap } from 'rxjs/operators';
import { Bebida } from '../libs/entity/bebida.interface';
import Transform from '../libs/helpers/transform.helper';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private toSearch: Observable<any>[]=[];

  constructor(private http: HttpClient) { }


  getCoctel(name: string): Observable<any>{
    return this.http.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name).pipe(
      map((resp: any)  =>{
        return Transform.transformDrink(resp.drinks);
      })
    )
  }

  getPokemon(): Observable <any>{
    return this.http.get("https://pokeapi.co/api/v2/pokemon/pikachu").pipe(
      tap( (resp) =>{
        console.log("Tap1: ", resp)
      }),
      // map( (resp: any) => {   //Filtro
      //   return{
      //     name: resp.name,
      //     species: resp.species,
      //     sprites: resp.sprites,
      //     stats: resp.stats
      //   }
      // }),
      // tap( (resp) =>{
      //   console.log("Filtro: ", resp)
      // }),
      concatMap( (resPokemon: any) => {
        return this.getSpecies(resPokemon.species.url, resPokemon)
      }),
      concatMap( (respSpecies: any) => {
        return this.getVarieties(respSpecies);
      } ),
      tap( (resp) => {
        console.log("Tap2: ", resp)
      })
    )
  }

  getSpecies(url: string, original: any): Observable<any>{
    return this.http.get(url).pipe(
      map( (respSpecies: any) => {
        
        (respSpecies.varieties as any[]).forEach((e1) =>{
          this.toSearch.push(this.http.get(e1.pokemon.url))
        })

        console.log(this.toSearch);

        return {
          ...respSpecies, ...original
        }
      })
    )
  }

  getVarieties(original: any): Observable<any>{
    return merge(this.toSearch).pipe(
      combineLatestAll(), //combineAll:Ejecuta los observables del arreglo, junta las respuestas en un arreglo
      map((resp) =>{
        
        let sprites = resp.map( item => {
          return{
            name: item.name,
            img: item.sprites.front_default
          }
        })
        return{
          ... original,
          sprites: sprites
        }
        console.log('In varieties', resp)
      }),
      map( (resp: any) => {   //Filtro
        
        return{
          name: resp.name,
          stats: resp.stats,
          sprites: resp.sprites,
          species: resp.species
        }
      }),
      
      tap( (resp) =>{
        console.log("Final: ", resp)
      }),
    )
  }

  
}
