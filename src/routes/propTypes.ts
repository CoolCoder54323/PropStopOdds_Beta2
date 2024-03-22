import { type Writable, writable } from "svelte/store";

export type GraphGlobal = 
    {
        type:Set<string>
        max:number
    }[]


export let graphGlobal:Writable<GraphGlobal> = writable([{
        type:new Set<string>(['GAME_DATE','PTS']),
        max:50
        }])

export function findGraphType(keys:string[],types:any[]){
    outer: for (let index = 0; index < types.length; index++) {
        const keySet = types[index].type;
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j];
          if(!keySet.has(key)){
            continue outer
          }
        }
        return index
      }
      return -1
}

export interface DataComponent {
    player_name:string,
    name:string,
}

export interface LogDataComponent extends DataComponent {
    keys: string[]; 
    rows: Array<{ [key: string]: any }>
  }
export interface GraphDataComponent extends DataComponent {
    keys: string[]; 
    rows: Array<{ [key: string]: any }>
}