<script lang="ts">
import { inject } from '@vercel/analytics'
import '../app.postcss';

import {
    AppShell,
    AppBar,
    storeHighlightJs,
	initializeStores, 
	Drawer, 
	getDrawerStore,
	AppRail,
	AppRailAnchor
} from '@skeletonlabs/skeleton';
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
import Navigation from '$lib/Navigation/Navigation.svelte';
import Burger from '$lib/Navigation/Burger.svelte'
import { page } from '$app/stores';
import { scale } from 'svelte/transition';
import { onMount, type SvelteComponent } from 'svelte';

import { storePopup } from '@skeletonlabs/skeleton';

storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
			

initializeStores();

$: drawState = 'closed'
// let outerHeight = 1000


// onMount(()=>{

// })

function drawerOpen(): void {
	if(drawState == 'open'){
		drawState = 'closed';
	}
	else{
		drawState = 'open';
	}

	console.log(drawState)
}

</script>
<!-- <svelte:window bind:outerWidth/> -->

<!-- <div >
	<Burger on:click={drawerOpen} sclass='p-4'/>
	<Navigation/>
</div> -->
<AppShell class="transition-transform " slotSidebarLeft=""  background="">

    <AppBar slot="header" shadow="shadow-sm">
		<svelte:fragment slot="lead">
			<Burger on:click={drawerOpen}/>
		</svelte:fragment>
        <svelte:fragment slot="trail">
            <a
				class=""
				href="https://www.tiktok.com/@prop.stop"
				target="_blank"
				rel="noreferrer"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
					<path fill="currentColor" d="M11 2v6.414a6.85 6.85 0 1 0 5.6 6.736v-3.736a8.603 8.603 0 0 0 3.4.686h1V6.5h-1c-1.903 0-3.4-1.537-3.4-3.5V2zm2 2h1.688c.394 2.22 2.08 3.996 4.312 4.41v1.618c-1.038-.152-1.975-.542-2.843-1.123L14.6 7.863v7.287a4.85 4.85 0 1 1-4.6-4.844v1.604a3.25 3.25 0 1 0 3 3.24zM8.5 15.15a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0" />
				</svg>
						</a>
			<a
				class=""
				href="https://twitter.com/propstop_/"
				target="_blank"
				rel="noreferrer"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
					<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 4.01c-1 .49-1.98.689-3 .99c-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4c0 0-4.182 7.433 4 11c-1.872 1.247-3.739 2.088-6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c0-.249 1.51-2.772 1.818-4.013z" />
				</svg>
			</a>
			<a
				class=""
				href="https://www.instagram.com/propstop_/"
				target="_blank"
				rel="noreferrer"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
					<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
						<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
						<path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01" />
					</g>
				</svg>			</a>
			</svelte:fragment>
	</AppBar>

	<AppRail slot="sidebarLeft" width="w-0 sm:w-20" background="bg-gray-900" active="bg-slate-800" border="border-r border-surface-500">


		<AppRailAnchor href="/" selected={$page.url.pathname === '/'} >
			<svelte:fragment slot="lead">
				<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32" {...$$props}>
					<path fill="currentColor" d="M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.004 2.004 0 0 0 2 2h20a2.004 2.004 0 0 0 2-2V13.63L29.757 15L31 13.428ZM18 26h-4v-8h4Zm2 0v-8a2.002 2.002 0 0 0-2-2h-4a2.002 2.002 0 0 0-2 2v8H6V12.062l10-7.79l10 7.8V26Z" />
				</svg>
			</svelte:fragment>
		</AppRailAnchor>
		<AppRailAnchor href="/settings" selected={$page.url.pathname === '/settings'} >
			<svelte:fragment slot="lead">
				<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" {...$$props}>
					<g fill="none">
						<circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2" />
						<path fill="currentColor" d="m5.399 5.88l.5-.867a1 1 0 0 0-1.234.186zM3.4 9.344l-.956-.295a1 1 0 0 0 .456 1.16zm-.002 5.311l-.5-.866a1 1 0 0 0-.455 1.162zm2 3.464l-.734.68a1 1 0 0 0 1.234.186zm4.6 2.655H9a1 1 0 0 0 .778.975zm4.001.002l.223.975a1 1 0 0 0 .777-.975zM18.6 18.12l-.5.866a1 1 0 0 0 1.233-.186zm1.998-3.466l.956.295a1 1 0 0 0-.456-1.16zm.002-5.311l.5.866a1 1 0 0 0 .455-1.162zm-2-3.465l.734-.679a1 1 0 0 0-1.234-.187zM14 3.225h1a1 1 0 0 0-.777-.975zm-4-.002l-.223-.975A1 1 0 0 0 9 3.223zm4 1.849h-1zm5 8.66l-.5.866zm-2 3.464l-.5.866zM5 13.732l.5.866zm2-6.928l-.5.866zM4.356 9.639a7.99 7.99 0 0 1 1.776-3.08L4.665 5.2a9.99 9.99 0 0 0-2.22 3.85zM5.072 16a8.03 8.03 0 0 1-.718-1.64l-1.91.592c.217.701.515 1.388.896 2.048zm1.06 1.441A8.029 8.029 0 0 1 5.073 16L3.34 17c.38.66.827 1.261 1.325 1.8zm7.646 2.361a7.99 7.99 0 0 1-3.556-.002l-.445 1.95a9.99 9.99 0 0 0 4.446.002zm5.866-5.441a7.99 7.99 0 0 1-1.776 3.08l1.467 1.36a9.99 9.99 0 0 0 2.22-3.85zM18.928 8c.306.53.545 1.08.718 1.64l1.91-.592A9.97 9.97 0 0 0 20.66 7zm-1.06-1.441c.397.43.754.91 1.06 1.441l1.732-1a10.028 10.028 0 0 0-1.325-1.8zm-7.646-2.361a7.99 7.99 0 0 1 3.556.002l.444-1.95a9.99 9.99 0 0 0-4.445-.002zm.778.874v-1.85H9v1.85zm-3.5.866l-1.601-.925l-1 1.732l1.6.925zm-3 6.928l-1.601.924l1 1.732l1.6-.924zm1-3.464l-1.6-.923l-1 1.732l1.6.923zM11 20.775v-1.847H9v1.847zM6.5 16.33l-1.601.925l1 1.732l1.6-.925zm12.601.925L17.5 16.33l-1 1.732l1.601.925zM15 20.777v-1.849h-2v1.85zm5.101-12.3l-1.601.925l1 1.732l1.601-.925zm.998 5.312l-1.599-.923l-1 1.732l1.6.923zM15 5.072V3.225h-2v1.847zm3.101-.059l-1.601.925l1 1.732l1.601-.925zM13 5.072c0 2.31 2.5 3.753 4.5 2.598l-1-1.732a1 1 0 0 1-1.5-.866zm5.5 4.33c-2 1.155-2 4.041 0 5.196l1-1.732a1 1 0 0 1 0-1.732zm-1 6.928c-2-1.154-4.5.289-4.5 2.598h2a1 1 0 0 1 1.5-.866zM11 18.928c0-2.31-2.5-3.753-4.5-2.598l1 1.732a1 1 0 0 1 1.5.866zm-5.5-4.33c2-1.155 2-4.041 0-5.196l-1 1.732a1 1 0 0 1 0 1.732zM9 5.072a1 1 0 0 1-1.5.866l-1 1.732c2 1.154 4.5-.289 4.5-2.598z" />
					</g>
				</svg>
			</svelte:fragment>
		</AppRailAnchor>
		<AppRailAnchor href="/" selected={false} >
			<svelte:fragment slot="lead">

			</svelte:fragment>
		</AppRailAnchor>
	</AppRail>

	<slot/>

</AppShell>


