<script lang="ts">
	import { page } from "$app/stores";
	import Posts from "$lib/components/Posts.svelte";
	import { getUserPosts } from "$lib/functions/posts";
    import { jwt } from "$lib/stores";

    const username = $page.params['username']
    let posts;
    posts = getUserPosts($jwt,username)
    console.log(posts)
</script>
{#await posts}
    
{:then posts} 
<Posts posts={posts}/>
    
{/await}