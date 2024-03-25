<script lang="ts">

import Cta from "./CTA.svelte";
import QueryBox from "./QueryBox.svelte";
import  Grid  from './PropGrid.svelte'
import {type DataComponent, graphGlobal} from './propTypes.ts'


let propData:Promise<DataComponent[]> | undefined = undefined

$: {if(propData !== undefined){
	
}
}

type message = {text: string}
function onQuerySubmit(cvent: CustomEvent<message>) {
	const query = cvent.detail.text;
	propData = fetchData(query)
	$graphGlobal = [{
        type:new Set<string>(['GAME_DATE','PTS']),
        max:50
        }]
		
	
}



async function fetchData(query:string,local:boolean=false) {
	// Define the URL of the API you want to fetch data from
	const links = { globalLink:'https://propstop-api-logs.ue.r.appspot.com:443/query/', localLink: 'http://127.0.0.1:5000/query/'}
	const link = links.globalLink

	const apiUrl =`${link}${encodeURIComponent(query)}`;
	const rawData = await fetch(apiUrl)
	const data:{components:Array<DataComponent>} = await rawData.json()
	console.timeEnd('timer1')
	
	if(!data.components){
		throw Error("No compono")
	}
	
	return data.components

}

</script>

<div class="gradient h-full">
	<div class="flex justify-center">
		<Cta innerClass="mb-20 mt-20"/>
	</div>
	<hr class="mx-1"/>
	<div class="pt-5 px-5 bg-transparent">
		<QueryBox on:submit={onQuerySubmit}/>
		<Grid bind:tableDataPromise={propData}/>
	</div>
</div>



<style>
	.gradient {
  /* Define initial gradient background */
  background: radial-gradient(circle, rgb(1, 1, 2) 20%,rgb(8, 15, 24) 60%, rgb(17,24,39) 100%);
  transition: 0.5s ease; /* Smooth transition for the gradient change */

}

	
</style>
