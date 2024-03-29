
<style>
  :global(.svlt-grid-shadow) {
  background: rgb(0, 0, 0);
  }
  :global(.svlt-grid-container) {
    background: black;
  }
  :global(.svlt-grid-resizer::after) {
    border-color: black !important;
  }
</style>

    
    
<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import Grid, { GridItem } from 'svelte-grid-extended';
  import { graphGlobal, type DataComponent, type GraphDataComponent, type LogDataComponent, findGraphType } from './propTypes.ts';
  import PropTable from '$lib/PropCore/PropTable.svelte';
  import PropGraph from '$lib/PropCore/PropGraph.svelte';

  export let tableDataPromise:Promise<Array<DataComponent>> | undefined = undefined
  let requestData = {};
  $: hideAlert = tableDataPromise == undefined
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
        updateGraphGlobal(dataComponent as GraphDataComponent)
        return PropGraph
    }
  }

  function updateGraphGlobal(graph:GraphDataComponent) {
    let optionIndex = findGraphType(graph.keys,$graphGlobal);
    if(optionIndex == -1){
      optionIndex = $graphGlobal.length
      $graphGlobal.push({type:new Set(graph.keys), max:0})
    }
    graph.rows.forEach((value)=>{
      Object.values(value).forEach((val)=>{
        if (Number(val) > $graphGlobal[optionIndex].max){
          $graphGlobal[optionIndex] = { 
            type:$graphGlobal[optionIndex].type,
              max:Number(val)
          }}})
    })
    console.log($graphGlobal)
  }

</script>

<!-- <div>
  <button on:click={getDummyData}>Click me to reveal</button>
</div> -->
<div bind:clientWidth >
  <!-- {clientWidth} -->
  {#if tableDataPromise !== undefined}
      {#await tableDataPromise}
      <div class="w-full h-full flex justify-center mt-10">
        <ProgressRadial stroke={40} meter="stroke-primary-500" track="stroke-primary-500/30" strokeLinecap="butt" />

      </div>
      {:then dataComponents}
        <Grid cols={gridWidth/50} rows={gridWidth/(50/2)}  itemSize={{height:(gridWidth/100)}}  class="">

          {#each dataComponents as component, i}
            <GridItem x={((gridWidth/50)/dataComponents.length)*i} y={0} w={(gridWidth/50)/dataComponents.length} h={gridWidth/100}  class="{`${selected ? "border-teal-600 border-2" : " border border-black "} ${gridBase} `} overflow-y-auto">
                  <svelte:component this={dataToSvelte(component)} data={component}/>       
            </GridItem>
          {/each}

        </Grid>  
      {:catch err} 
        {#if hideAlert == false}
        <aside class="alert variant-filled-error  mt-2">
            <!-- Icon -->
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24" {...$$props}>
                <path fill="currentColor" d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467zM13 18h-2v-2h2zm-2-4V9h2l.001 5z" />
              </svg>
            </div>
            <!-- Message -->
            <div class="alert-message">
                <h3 class="h3">Error</h3>
                <p>{err}</p>
            </div>
            <!-- Actions -->
            <div class="alert-actions">
              <button class="btn variant-gradient-error-warning" on:click={() => hideAlert = true}>
                X
              </button>
            </div>
        </aside>
        {/if}
          
      {/await}

  {/if}
</div>
