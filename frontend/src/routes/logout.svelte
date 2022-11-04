<script lang='ts'>
    import { jwt } from "$lib/stores"
	import { goto } from "$app/navigation";
    localStorage.removeItem('jwt')
    $jwt = "";
    goto('/')
</script>