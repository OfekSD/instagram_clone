<script lang="ts">
import { jwt } from "$lib/stores";
import { goto } from "$app/navigation";
const logout = () =>{
    localStorage.removeItem('jwt')
    $jwt = "";
    goto('/')
}


</script>
<div class="navbar px-10 bg-accent">    
    <div class="navbar-start">
        <div class="flex-none flex-1">
                <a href='/' class="text-xl font-bold font-sans">Lola</a>
        </div>
    </div>
    <div class="navbar-end">
        <label for="upload" ><img class="btn btn-ghost w-14 p-2" alt="image of camera" src="https://th.bing.com/th/id/R.8bfdd0a034c65ab1f9dbec63d907c010?rik=Oqp2LrBNLJp8Yg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_135987.png&ehk=pqoaNPn3JI2ZNKZTTZbgHk24TZLz7QraFQWQyYh5lZ0%3d&risl=&pid=ImgRaw&r=0"/></label>
        <a on:click={logout} class="mx-2 btn btn-ghost text-lg font-bold font-sans hover:text-violet-700">Logout</a>
        
    </div>

</div>