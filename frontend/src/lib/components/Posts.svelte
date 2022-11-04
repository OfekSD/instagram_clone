<script lang="ts">
	import Post from "./Post.svelte";
    export let posts: Array<Object>;
    
</script>
<div class="">

  {#each posts as post}
  <Post {...post}/>  
  {/each }
  
</div>
