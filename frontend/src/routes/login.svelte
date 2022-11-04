<script lang="ts">
	import { goto } from "$app/navigation";
	import { jwt } from "$lib/stores";
	import { onMount } from "svelte";

    let username = ''
    let password = ''
    

    const login = async () => { 
        if (!username || !password){
            return
        }
        fetch('/auth/login',{
            method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username:username,
                password:password})
            })
            .then(async res=>{
                if(res.ok){
                    const data = await res.json();
                    $jwt=data.token;
                    localStorage.setItem('jwt',$jwt)
                    goto('/')

                } else {
                    username=''
                    password=''
                   throw('login err')
                }
            }).catch(e => console.log(e))
    
        
    }
</script>

<div class="flex flex-col    justify-center ">

    <div class="border border-secondary border-2  py-14 mt-14 w-full" >
        <div class="text-center">
            <a href='/' class=" text-4xl font-bold font-sans text-accent ">Lola</a>
        </div>
        <div class="align-middle flex justify-center flex-col px-12 pt-12 m-1">
            <input type="text" placeholder="username" bind:value={username}
            class="input input-bordered input-secondary w-full max-w-xs  m-1 py-6" />
            <input type="password" placeholder="password" 
            bind:value={password}
            class="input input-bordered input-secondary w-full m-1 py-6" />
        </div>
        <div class="justify-center  flex py-3">
        <button 
        on:click={login}
        class="btn btn-primary w-2/1 px-10 ">Login</button>
    </div>
</div>

    <div class="border border-secondary border-2 text-center my-7 py-6 w-full" >
        <p>Don't have an account? <a href='/register'class="text-accent">Register</a></p>
    </div>
</div>