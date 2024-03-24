<script lang="ts">
	import Grid, { GridItem } from 'svelte-grid-extended';
    import PropGraph from '$lib/PropCore/PropGraph.svelte';
    import {type GraphDataComponent} from '../propTypes';

	const items = [
		{ id: '0', x: 0, y: 0, w: 4, h: 3 },

	];

    const prom = new Promise((resolve)=>{
        setTimeout(() => resolve(items),500)
        
    })
    const graphDataArray: GraphDataComponent[] = [
  {
    name:"gr",
    player_name:"",
    keys: ['GAME_DATE', 'points'],
    rows: [
      { GAME_DATE: '2024-03-20', points: 30 },
      { GAME_DATE: '2024-03-21', points: 25 },
      { GAME_DATE: '2024-03-22', points: 28 }
    ]
  },
  {
    name:"gr",
    player_name:"",
    keys: ['GAME_DATE', 'points'],
    rows: [
      { GAME_DATE: '2024-03-19', points: 22 },
      { GAME_DATE: '2024-03-20', points: 33 }
    ]
  },
  {
    name:"gr",
    player_name:"",
    keys: ['GAME_DATE', 'points'],
    rows: [
      { GAME_DATE: '2024-03-18', points: 15 },
      { GAME_DATE: '2024-03-19', points: 18 },
      { GAME_DATE: '2024-03-21', points: 20 }
    ]
  },
  {
    name:"gr",
    player_name:"",
    keys: ['GAME_DATE', 'points'],
    rows: [
      { GAME_DATE: '2024-03-22', points: 27 },
      { GAME_DATE: '2024-03-23', points: 24 }
    ]
  },
  {
    name:"gr",
    player_name:"",
    keys: ['GAME_DATE', 'points'],
    rows: [
      { GAME_DATE: '2024-03-24', points: 26 },
      { GAME_DATE: '2024-03-25', points: 29 },
      { GAME_DATE: '2024-03-26', points: 31 }
    ]
  }
];

</script>

<div class="relative">
    {#each Array(5) as non, i}
    <Grid cols={10} itemSize={{height:40}} class="absolute">
        {#await prom}
            AWAITING
        {:then gridItems} 
            {#each items as item}
                <GridItem x={item.x} y={item.y} w={item.w} h={item.h} class={" bg-black bg-opacity-40 rounded-md border-teal-600 border-2"}>
                    <PropGraph data={graphDataArray[i]}/>
                </GridItem>
            {/each}
            {:catch err}
        {/await}
        
    
    </Grid>
        
    {/each}
</div>




<style>

</style>
