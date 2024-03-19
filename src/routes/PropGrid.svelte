
<style>

  :global(.svlt-grid-shadow) {
  /* Back shadow */
  background: rgb(0, 0, 0);
  }
  :global(.svlt-grid-container) {
    /* Container color */
    background: black;
  }
  :global(.svlt-grid-resizer::after) {
    /* Resizer color */
    border-color: black !important;
  }
</style>

    
    
<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import Grid, { GridItem } from 'svelte-grid-extended';
  import { graphGlobal, type DataComponent, type GraphDataComponent, type LogDataComponent } from './propTypes.ts';
  import PropTable from '$lib/PropCore/PropTable.svelte';
  import PropGraph from '$lib/PropCore/PropGraph.svelte';

  export let tableDataPromise:Promise<Array<DataComponent>> | undefined = undefined

  
  let requestData = {};
  type gridLayout = Array<{ratio:{w:number,h:number},x:number,y:number}>

  const single:gridLayout = [{ratio:{w:40,h:30},x:0,y:0}]
  const splitHorizonat:gridLayout = [{ratio:{w:20,h:30},x:0,y:0},
                                      {ratio:{w:20,h:30},x:20,y:0}]

  let cols = 6

  const gridBase = "bg-black bg-opacity-40 rounded-md"
  let selected = true
  let clientWidth:number;

  $: gridWidth = closestNumber(clientWidth,100) - 200;
  const itemSize = { width: 50, height: 10 };

  function closestNumber(n:number, m:number) {
    let q = Math.round(n / m);
    let lowPos = m * q;
    let highPos = (n * m) > 0 ?
        (m * (q + 1)) : (m * (q - 1));

    //Return Closest    
    if (Math.abs(n - lowPos) < Math.abs(n - highPos))
        return lowPos;

    return highPos;
  }

  function dataToSvelte(dataComponent:DataComponent) {
    switch(dataComponent.name){
      case 'PlayerLog_Component':
        return PropTable;
      case 'Graph_Component':
        const graph = dataComponent as GraphDataComponent
        graph.rows.forEach((value)=>{
          Object.values(value).forEach((val)=>{
            if (Number(val) > $graphGlobal.max){
              graphGlobal.set({max:Number(val) })
            } 
          })
        })
        return PropGraph
    }
  }

</script>

<!-- <div>
  <button on:click={getDummyData}>Click me to reveal</button>
</div> -->
<div bind:clientWidth >
  <!-- {clientWidth} -->
  {#if tableDataPromise}
      {#await tableDataPromise}
      <div class="w-full h-full flex justify-center mt-10">
        <ProgressRadial stroke={40} meter="stroke-primary-500" track="stroke-primary-500/30" strokeLinecap="butt" />

      </div>
      {:then dataComponents}
        <Grid rows={gridWidth/50} cols={gridWidth/50} class="">
          <!-- <GridItem x={0} y={0} w={cols/2} h={rows/2} class={`${selected ? "border-teal-600 border-2" : " border border-black "} ${gridBase} `}> -->
        
          <!-- </GridItem> -->
          <!-- <GridItem x={0} y={rows/2} w={cols/2} h={rows/2}  class="bg-primary-500 item">Hoy</GridItem> -->
          {#each dataComponents as component, i}

            <GridItem x={((gridWidth/50)/dataComponents.length)*i} y={0} w={(gridWidth/50)/dataComponents.length} h={gridWidth/100}  class={`${selected ? "border-teal-600 border-2" : " border border-black "} ${gridBase} `}>
              <!-- <div slot="moveHandle" let:moveStart>
                <div on:pointerdown={moveStart}>MOVE</div>
              </div> -->
              <div>
                  <svelte:component this={dataToSvelte(component)} data={component}/>
              </div>
            </GridItem>
          {/each}

          <!-- {#each single as component}
        
            
            
          {/each} -->
        </Grid>      
      {/await}
  {/if}
</div>
