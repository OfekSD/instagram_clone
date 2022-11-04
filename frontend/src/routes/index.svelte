
<script lang="ts">
	import Posts from "$lib/components/Posts.svelte";
	import { beforeUpdate, onMount } from "svelte";
  import { jwt, posts } from "$lib/stores.js"
	import Upload from "$lib/components/Upload.svelte";
	import Image from "$lib/components/Image.svelte";


onMount(() => {

  if($posts.length<1){
    fetch("/api/rest/post",{
      headers:{Authorization:`Bearer ${$jwt}`}
    }).then( (res) => res.json().then(
    (data) => {
        const res: Array<Object> = data['posts']
        res.forEach((post: {[key: string]: any}) => {

          const username: string = post['user']['username']
          delete post.user
          $posts = [...$posts, {username,...post}]
        })
      })
    )
    
    
  }
})

</script>
<!-- <Image link='https://i.redd.it/h6otulxrv7b11.jpg'/> -->
<Posts posts={$posts} />
<Upload/>