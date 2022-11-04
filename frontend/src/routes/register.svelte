<script lang="ts">
	import { goto } from "$app/navigation";
	import { jwt } from "$lib/stores";
	import { onMount } from "svelte";

    let username = ''
    let password = ''
    let email    = ''

    onMount(async ()=>{
        const token = localStorage.getItem('jwt')
        if (token) {
            goto('/') 
        }
    }
    )

    const register = async () => {
        if(!username || !password || !email){
            username=''
            password=''
            email=''
            return
        }

        fetch('/auth/register',{
             method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                username,
                password})
            }).then(async res => {
                if (!res.ok){
                    throw(res.statusText)
                }
                const { token } = await res.json()
                $jwt= token;
                localStorage.setItem('jwt',$jwt)
                goto('/')
            }).catch(e => {console.log(e)})

    }
</script>


<div class="flex flex-col    justify-center ">
    <form on:submit|preventDefault={register}>

        <div class="border border-secondary border-2  py-14 mt-14 w-full" >
            <div class="text-center">
            <a href='/' class=" text-4xl font-bold font-sans text-accent ">Lola</a>
        </div>
        <div class="align-middle flex justify-center flex-col px-12 pt-12 m-1">
            <input type="text" placeholder="email" 
            bind:value={email}
            class="input input-bordered input-secondary w-full m-1 py-6" />
            <input type="text" placeholder="username" bind:value={username}
            class="input input-bordered input-secondary w-full max-w-xs  m-1 py-6" />
            <input type="password" placeholder="password" 
            bind:value={password}
            class="input input-bordered input-secondary w-full m-1 py-6" />
        </div>
            <div class="justify-center  flex py-3">
                <button 
                type="submit"
                class="btn btn-primary w-2/1 px-10 ">Login</button>
            </div>
        </div>
    </form>

    <div class="border border-secondary border-2 text-center my-7 py-6 w-full" >
        <p>already have am account? <a href='/login'class="text-accent">login</a></p>
    </div>
</div>