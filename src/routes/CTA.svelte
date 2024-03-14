<script lang="ts">

    let slogan = "Your Basketball Assistant"

	  import { onMount } from 'svelte';


    let canvas:HTMLCanvasElement;
    let imageWidth = 64
    $: imageHeight = Math.round(imageWidth *  1.15625)

    export let innerClass = "";

  

</script>
  

  <div class="flex items-center justify-center">
    <div class="text-center flex flex-col items-center z-10 my-16">
      <div class="flex items-center flex-col sm:flex-row gap-4 mb-8 z-10">
        <h1 class="text-5xl lg:text-6xl">
          <span class="gradient-heading z-10">Prop Stop </span>
          <span class="gradient-heading-r mx-0 px-0 z-10">AI</span>
          <span class="gradient-heading-d mx-0 px-0 z-10" ></span>
        </h1>
      </div>
      <p class="mb-6 text-lg  lg:text-2xl z-10">Your <span class="gradient-p">Smart</span> Basketball Assistant</p>
      <button on:click={()=>{
        location.href = '/about';
      }} class="btn variant-ghost-secondary z-10">
        Learn More
      </button>
  
    </div>
    
  </div>


<style>

  .btn:hover {
    
    transform: scale(1.1)
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