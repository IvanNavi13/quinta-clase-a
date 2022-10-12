import { Bebida } from "../entity/bebida.interface";

export default class Transform{

    public static transformDrink(drinks: any[]): Bebida[]{
        let bebidas = drinks.map(drink => {
          let ingredients: string[] = [];
          
          Object.keys(drink).forEach( key => {
            if(key.includes("strIngredient") && drink[key] ){
              ingredients.push(drink[key])
            }
          })
    
          return {
            name: drink.strDrink,
            img: drink.strDrinkThumb,
            ingredients: ingredients
          };
        })
        // console.log(bebidas)
        return bebidas;
      }
     


}