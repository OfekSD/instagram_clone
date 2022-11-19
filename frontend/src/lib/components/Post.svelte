<script lang="ts">
  import { jwt, posts } from "$lib/stores";
	import { text } from "svelte/internal";

    export let username: String
    export let description: String
    export let image: String
    export let created_at: string;
    export let is_liked;
    export let like_count: number; 
    export let id: string;
    export let comments:Array<Object>
    $: comments 
    let comment_text = ''
    is_liked = is_liked != null 

    const date = new Date(created_at)
    const formated_date = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`     

    const like = async () => {
      try{

        fetch('/api/rest/like',{
          method:"POST",
          headers:{
            "Content-type": "application/json",
            "Authorization": `Bearer ${$jwt}`
          },
          body:JSON.stringify({'post':id})
        })
      }
      catch (e){
        console.log(e)
      }
      }
    const unlike = () => {
      fetch('/api/rest/like',{
        method:"DELETE",
        headers:{
          "Content-type": "application/json",
          "Authorization": `Bearer ${$jwt}`
        },
        body:JSON.stringify({'post':id})
      })
    }
    const like_handler = async () => {
      if (is_liked) {
        unlike()
      } else {
        like()
      }
      is_liked = !is_liked
    }
    const comment = () => {
    if (!comment_text){
      return
    }
    try{
      console.log(comments)

      fetch('/api/rest/comment',{
        method:"POST",
        headers:{
          "Content-type": "application/json",
          "Authorization": `Bearer ${$jwt}`
        },
        body:JSON.stringify({'post':id,'text':comment_text})
      }).then(
        res => {res.json().then(data => {
          comments = [...comments,data.insert_comments_one]
        })
      })
    }
    catch (e){
      console.log(e)
    }

      comment_text=''
    }
    
    
    </script>
    
    <div class="p-3 my-10 bg-gray-200">
    <div >
      <figure><img src={image} alt="{username}'s post image"/></figure>
      <button class="text-lg mt-1" on:click={like_handler}>{is_liked == true ? '💔' :'❤️'}</button>
      <div class="divider m-0"/>
      <div>
        <p><a href='/user/{username}' class="font-bold text-md text-secondary" >{username}</a> {description}</p>
      </div>
    </div>
    {#each comments as comment }
    <p><a class="font-bold text-md text-secondary" href="/user/{comment.commenter.username}">{comment.commenter.username}</a> {comment.text}</p>
    {/each}
    <p class="text-xs text-primary">uploaded at {formated_date}</p>
    <div class="divider m-1"/>
    <form class="w-1/1"  on:submit|preventDefault={comment}>
    <div class="align-middle flex justify-around w-11/12  relative">
        <input type="text" name="text" bind:value={comment_text} class="bg-inherit border border-solid border-primary w-60">
        <button class="ml-6">POST</button>
      </div>
    </form>
    
  </div>
