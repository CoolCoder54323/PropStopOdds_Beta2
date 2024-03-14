    
<script lang="ts">

import { onMount } from 'svelte';
import { scale, slide } from 'svelte/transition';
import { page } from '$app/stores';

$: buttonClass = 'btn btn-md transition-transform active:scale-50 w-full' + classesActive 
let buttonBase = "variant-ghost-primary"

$: classesActive = (href: string) => (href === $page.url.pathname ? buttonBase : '');
let onClick = (event:MouseEvent)=>{
                    let target = event.target as HTMLAnchorElement;
                    target.click();
                }
export let navClass = '';

</script>

<nav class={`list-nav transition-transform p-4 w-[200px] ${navClass}`} >

        <!-- <ul>
            <li> -->
                <span class="badge variant-ghost-surface w-full">

                <a href="/" class={buttonClass} on:mousedown={onClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32" {...$$props}>
                            <path fill="currentColor" d="M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.004 2.004 0 0 0 2 2h20a2.004 2.004 0 0 0 2-2V13.63L29.757 15L31 13.428ZM18 26h-4v-8h4Zm2 0v-8a2.002 2.002 0 0 0-2-2h-4a2.002 2.002 0 0 0-2 2v8H6V12.062l10-7.79l10 7.8V26Z" />
                        </svg>
                    <!-- <span class="flex-auto">Home</span> -->
                </a>
            </span>

                <a href="/about" class={buttonClass} on:mousedown={onClick}>
                    <span class="badge bg-primary-500 w-full h-8">
                        <span class="w-full">about</span>
                    </span>
                </a>
                <a href="/blog" class={buttonClass} on:mousedown={onClick}>
                    <span class="badge bg-primary-500 w-full h-8">
                        <span class="flex-auto">blog</span>
                    </span>
                </a>
                <a href="/contact" class={buttonClass} on:mousedown={onClick}>
                    <span class="badge bg-primary-500 w-full h-8">
                        <span class="flex-auto">contact</span>
                    </span>
                </a>
            <!-- </li> -->
            <!-- ... -->

    
</nav>

<style>
    /* Hover */
</style>
