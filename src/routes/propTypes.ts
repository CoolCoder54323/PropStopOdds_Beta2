// import { writable } from "svelte/store";


// export let drawState = writable('closed')
// export let page = writable('home')

export interface DataComponent {
    name:string,
    [key: string]: any;
}

export interface LogDataComponent extends DataComponent {
    keys: string[]; 
    rows: Array<{ [key: string]: any }>
  }
export interface GraphDataComponent extends DataComponent {
    keys: string[]; 
    rows: Array<{ [key: string]: any }>
}
// export function calcGridSize(w:number,gridWidth:number,ratio:number){
//     let width = closestNumber(w, gridWidth);
//     let numColumns = (width - gridWidth) / gridWidth;
//     let numRows = numColumns * ratio;
//     return [numColumns,numRows]
// }

// export function calcGridElement(w:number,gridWidth:number,ratio:number) {
//     let width = closestNumber(w, gridWidth);
//     let numColumns = (width - gridWidth) / gridWidth;
//     let numRows = numColumns * ratio;
//     return [numColumns,numRows]
// }

// // export type tableData = 