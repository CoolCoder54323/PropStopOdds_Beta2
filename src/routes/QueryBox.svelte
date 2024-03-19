
<form on:submit|preventDefault={handleSubmit}>   
    <!-- <form method="POST">    -->
    <!-- <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">de</label> -->

    <div id="boxy" class="input-group input-group-divider grid-cols-[auto_1fr_auto] trans" bind:clientWidth={inputWidth}>
        <div class="window-black">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
        </div>

        <textarea bind:this={input} class="textarea window-black" rows="1" bind:value={value} on:input={filterInput(resize1)} name="query" autocomplete="off" placeholder="Search Bets, Stats..." required/>

        <button class="variant-skeleton-secondary window-black">Submit</button>
        
    </div>
    <div data-popup="popupAutocomplete" class="max-h-48 p-4 overflow-y-auto bg-black border-teal-600 border-2 z-50" tabindex="-1" style="width: {inputWidth}px; min-width:0px;">
        <Autocomplete
            bind:input={value}
            options={flavorOptions}
            on:selection={onFlavorSelection}
            
        />
    </div> 
</form>




<script lang="ts">
	import { Autocomplete, } from "@skeletonlabs/skeleton";
    import { popup,  type AutocompleteOption, type PopupSettings } from "@skeletonlabs/skeleton"
    import { onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	function sayHello() {

	}

    $: inputWidth = 0;
    const spacing = 'pl-3 mx-3 pr-3 py-3' 
    
    let dataValue: number[] = [];

    let popupSettings:PopupSettings = {
        event: 'focus-click',
        target: 'popupAutocomplete',
        placement: 'bottom',
    };

    const flavorOptions: AutocompleteOption<string>[] = [
        { label: 'Joel Embiid ppg graph', value: 'Joel Embiid ppg graph'},
        { label: 'Tyreese Maxey vs joel embiid ppg and assists', value: 'Tyreese Maxey vs joel embiid ppg and assists'},
        { label: 'Lebron james last 20 games', value: 'Lebron james last 20 games'},
        { label: 'Nikola Jokic ppg in games against herb jones', value: 'Nikola Jokic ppg in games against herb jones'},
        { label: 'How does steph perform against the Sixers', value: 'How does steph perform against the Sixers'},
        { label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
    ];

    







    function onFlavorSelection(event: CustomEvent<AutocompleteOption<string>>): void {
	    value = event.detail.label;
    }
				

    async function handleSubmit(event:Event) {
        let queryValue = value
        console.log("sumbitting " + queryValue)
        dispatch('submit', {
			text: queryValue
		});
    }
    let update;
    let input:HTMLTextAreaElement;
    let baseHeight = 0;
    onMount(()=>{
        update = popup(input,popupSettings)
        baseHeight = input.scrollHeight
    }) 


    let value = ''
    let longForm = false;


    function filterInput(resize: (event: Event) => void){

        
        return (event: Event)=> {
        // const regex = /^[a-zA-Z0-9 ,.]*$/; // Regex to allow only alphanumeric characters
        let textArea:HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        textArea.value.replace(/[^a-zA-Z0-9 ,]/g, ''); // Remove non-alphanumeric characters
        resize(event)
        
    }

    }
    function resize1(event:Event){
        let textArea:HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        if(textArea.scrollHeight > baseHeight){
            longForm = true
        }
        console.log(textArea.scrollHeight)

    }
    function resize2(event:Event){
        let textArea:HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        textArea.style.height = ""
        textArea.style.height= textArea.scrollHeight + "px"
    }

</script>

<style>
    .trans {
        background-color: rgba(0, 0, 0, 0);
    }
    .window-black {
        background-color: rgba(0, 0, 0, 0.2);
    }
    #boxy {
        border-radius: 0.75rem;
    }
    div textarea.textarea {
        border-radius: 0rem;
        border-top: 0px;
    }
    .flat {
        margin: 0px;
        padding: 0px;
        border-radius: 0px;   
    }
    .center {
        justify-content: center;
    }

</style>


