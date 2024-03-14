<script lang="ts">

import Cta from "./CTA.svelte";
import QueryBox from "./QueryBox.svelte";
import  Grid  from './PropGrid.svelte'
import {type DataComponent} from './propTypes.ts'


let propData:Promise<any> | undefined = undefined

type message = {text: string}
function onQuerySubmit(cvent: CustomEvent<message>) {
	const query = cvent.detail;
	propData = fetchData(query.text,true)
        
}

async function fetchData(query:string,local:boolean=false) {
	// Define the URL of the API you want to fetch data from
	const globalLink = 'https://propstop-api-logs.ue.r.appspot.com/'
	const localLink = 'http://127.0.0.1:5000/query/' 
	console.time('timer1');
	console.log("fetching " + `${localLink}${encodeURIComponent(query)}`)
	const apiUrl = local ? `${localLink}${encodeURIComponent(query)}` : `${globalLink}${encodeURIComponent(query)}`;
	const rawData = await fetch(apiUrl)
	const data:{components:Array<DataComponent>} = await rawData.json()
	console.timeEnd('timer1')
	console.log("DATA compotnntes")
	console.log(data.components)
	if(!data.components){
		throw Error("No compono")
	}
	
	return data.components

}

</script>

<div class="gradient h-full">
	<div class="h">
		<div class="flex justify-center">
		<Cta innerClass="mb-20 mt-20"/>
	</div>
	<hr class="mx-1"/>
	<div class="pt-5 px-5 bg-transparent">
		<QueryBox on:submit={onQuerySubmit}/>
		<Grid bind:tableDataPromise={propData}/>
	</div>
	</div>

</div>



<style>
	.gradient {
  /* Define initial gradient background */
  background: radial-gradient(circle, rgb(1, 1, 2) 20%,rgb(8, 15, 24) 60%, rgb(17,24,39) 100%);
  transition: 0.5s ease; /* Smooth transition for the gradient change */

}
	
</style>
