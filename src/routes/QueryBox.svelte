
<form on:submit|preventDefault={handleSubmit} class="center">   
    <!-- <form method="POST">    -->
    <!-- <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">de</label> -->

    <div id="boxy" class="input-group input-group-divider grid-cols-[auto_1fr_auto] trans" bind:clientWidth={inputWidth}>
        <div class="window-black">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
        </div>

        <textarea on:keydown={(press)=>{if(press.code == 'Enter')
                                        submitButton.click()}} bind:this={input} class="textarea window-black border-b-0" rows="1" bind:value={value} on:input={filterInput} name="query" autocomplete="off" placeholder="Search Bets, Stats..." required/>

        <button bind:this={submitButton} class="variant-skeleton-secondary window-black">Submit</button>
        
    </div>
    <div data-popup="popupAutocomplete" class="max-h-48 sm:max-h-28 rounded-md  ml-4 p-4 overflow-y-auto bg-black border-primary-500 border z-50" tabindex="-1" style="width: {inputWidth-20}px; min-width:0px;">
        <Autocomplete
            bind:input={value}
            options={flavorOptions}
            on:selection={onFlavorSelection}
            regionButton="text-left text-wrap"
            regionList="[&>li]:border-b [&>li]:py-2 [&>li]:border-secondary-500"
            
        />
    </div> 
</form>




<script lang="ts">
	import { Autocomplete, } from "@skeletonlabs/skeleton";
    import { popup,  type AutocompleteOption, type PopupSettings } from "@skeletonlabs/skeleton"
    import { onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    let submitButton:HTMLButtonElement;

    $: inputWidth = 0;
    const spacing = 'pl-3 mx-3 pr-3 py-3' 
    
    let dataValue: number[] = [];

    let popupSettings:PopupSettings = {
        event: 'focus-click',
        target: 'popupAutocomplete',
        placement: 'bottom',
    };

    const flavorOptions: AutocompleteOption<string>[] = [
        { label: 'Joel Embiid ppg graph', value: 'Joel Embiid ppg graph',keywords:'76ers '},
        { label: 'Tyreese Maxey vs joel embiid ppg and assists', value: 'Tyreese Maxey vs joel embiid ppg and assists',keywords:'76ers '},
        { label: 'Lebron james last 20 games', value: 'Lebron james last 20 games'},
        { label: 'Nikola Jokic ppg in games against herb jones', value: 'Nikola Jokic ppg in games against herb jones'},
        { label: 'How does steph perform against the Sixers', value: 'How does steph perform against the Sixers'},
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


    function filterInput(event: Event){
        // const regex = /^[a-zA-Z0-9 ,.]*$/; // Regex to allow only alphanumeric characters
        console.log("FIltering")
        let textArea:HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        value = textArea.value.replace(/[\r\n]|[^a-zA-Z0-9\s]/g, ''); // Remove non-alphanumeric characters        
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
        display: flex;
        justify-content: center;
    }

</style>


