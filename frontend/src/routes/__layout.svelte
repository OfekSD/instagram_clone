<script>
     import Navbar from "$lib/components/Navbar.svelte";
     import "../app.css";
     import {jwt} from '$lib/stores'
     import { beforeUpdate, onMount } from "svelte";
	import { browser } from "$app/env";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
     const notLoginPages = ['/login','/register']
     beforeUpdate(()=>{
          $jwt = localStorage.getItem('jwt') || ''
          if (!$jwt && !notLoginPages.includes($page.url.pathname)){
               console.log($jwt)
               goto('/login')
          }
          if ($jwt && notLoginPages.includes($page.url.pathname)){
               goto('/')
          }
     })
</script>
     {#if $jwt}
     <header>
          <Navbar/>
     </header>
     {/if}
     <main>
          <div class="flex justify-center ">
               <slot/>
          </div>
     </main>
<style>
     :global(body), :global(main){
          /* @apply bg-slate-300; */
          @apply bg-base-100;
          
     }
</style>