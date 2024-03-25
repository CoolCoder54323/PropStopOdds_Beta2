<script lang="ts">
	import { Autocomplete, Step, Stepper, popup, type PopupSettings } from '@skeletonlabs/skeleton';

  import {hide, limitShift} from '@floating-ui/dom';

    let slogan = "Your Basketball Assistant"

	  import { onMount } from 'svelte';

    let imageWidth = 64
    $: inputWidth = 0;
    $: popUp = true;
    let closeButton:HTMLButtonElement;


    export let innerClass = "";

    const popupClick: PopupSettings = {
      event: 'click',
      target: 'learnMore',
      placement: 'bottom',
      closeQuery:'.closePop',



    };

</script>
  

  <div bind:clientWidth={inputWidth} class="flex items-center justify-center">
    <div class="text-center flex flex-col items-center z-10 my-16">
      <div class="flex items-center flex-col sm:flex-row gap-4 mb-8 z-10">
        <h1 class="text-5xl lg:text-6xl">
          <span class="gradient-heading z-10">Prop Stop </span>
          <span class="gradient-heading-r mx-0 px-0 z-10">AI</span>
          <span class="gradient-heading-d mx-0 px-0 z-10" ></span>
        </h1>
      </div>
      <p class="mb-6 text-lg  lg:text-2xl z-10">Your <span class="gradient-p">Smart</span> Basketball Assistant</p>
      <button on:click={ _ => popUp = true} use:popup={popupClick} class="btn variant-ghost-secondary z-10">
        Learn More
      </button>
      <div  data-popup="learnMore" class="min-h-fit -translate-x-4 rounded-md  ml-4 p-4 overflow-y-auto bg-black border-primary-500 border z-50" tabindex="-1" style="right: 36px;width: {inputWidth}px; min-width:0px;">
        
        <Stepper on:complete={ _ => closeButton.click()}>
          <button bind:this={closeButton} class="w-full h-full variant-outline-tertiary closePop hidden" >u shouldnt be reading this!</button>
            <Step>

              <svelte:fragment slot="header">Get Started!</svelte:fragment>
              Prop stop AI is..., 
            </Step>
            <Step>
              <svelte:fragment  slot="header">Tutorial</svelte:fragment>
              To use this tool type in the stats of a player you want to see. You can specify graph or gamelog, 
              optionally you can add conditions such as, against certain team(s) or players,home or away games, and past n games.  
            </Step>
            <Step>
              <svelte:fragment  slot="header">Have fun</svelte:fragment>
              .
            </Step>
            <!-- ... -->
          </Stepper>
        
      </div>      

  
    </div>
    {popUp}
  </div>


<style>

  .btn:hover {
    
    transform: scale(1.1)
  }

  [data-popup] {
	/* Display */
	display: none;
	/* Position */
	position: absolute;
	top: 0;
	
	/* Transitions */
	transition-property: opacity;
	transition-timing-function: cubic-bezier(.4,0,.2,1);
	transition-duration: .15s
}

.gradient-heading {
  @apply bg-clip-text text-transparent box-decoration-clone;
  /* Direction */
  @apply bg-gradient-to-b;
  /* Color Stops */
  @apply from-primary-500 to-primary-800;
}
.gradient-heading-r {
  @apply bg-clip-text text-transparent box-decoration-clone;
  /* Direction */
  @apply bg-gradient-to-b;
  /* Color Stops */
  @apply from-slate-700 to-blue-700;
}



.gradient-p {
  @apply bg-clip-text text-transparent box-decoration-clone;
  /* Direction */
  @apply bg-gradient-to-br;
  /* Color Stops */
  @apply from-secondary-500 to-primary-500;
}
</style>