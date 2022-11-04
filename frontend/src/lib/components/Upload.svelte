<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { jwt, posts } from "$lib/stores";
    import { getPosts } from '$lib/functions/posts'

    let image_url = ''
    let description = ''
    let fileInput;
    let base64;
    let closing; 

    const getBase64 = (image) => {
        return new Promise((resolve, reject)=>
        {

            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                base64 = e.target.result;
                resolve(0)
            };
        }
        )
    };


    const uploadImage = async () => {
        if (fileInput.files.length < 1 || !description){
            return
        }
        // resizing image
        const fd = new FormData();
        fd.append('file',fileInput.files[0]);
        
        let res = await fetch('/resize/',{
            method: 'POST',
            body: fd,
        })
        const blob = await res.blob()
        await getBase64(blob)

        let body = JSON.stringify({
                image: base64,
                description})     

        res = await fetch('/api/rest/post',{
            method:"POST",
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${$jwt}`
            },
            body 
            })
        
        base64 = undefined;
        fileInput.value = null
        description = ''
        closing.click()
        $posts = await getPosts({headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${$jwt}`
        }})
        
        
    }
</script>

<label for="upload" class="hidden" bind:this={closing} />

<input type="checkbox" id="upload" class="modal-toggle">
<label for="upload" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
      <div class="">
      <form on:submit|preventDefault={uploadImage}>
          <p class="text-lg text-accent mb-5">Create a new Post!</p>
          <div class="divider divider-primary"></div> 
          <div class="flex flex-col justify-center content-center ">
            <input class="hidden" type="file" accept=".png,.jpg" bind:this={fileInput} >
            <button 
            class="btn btn-primary w-2/1 px-10  m-3" on:click={fileInput.click()}>Select Image
        </button>

              
              <textarea bind:value={description} placeholder="what's on your mind?"
              class="textarea textarea-bordered textarea-secondary w-1/1 "
              />
            </div>
            <div class="flex justify-center">

                    <button 
                    type="submit"
                    class="btn btn-primary w-2/1 px-10  m-3">upload</button>
                </div>
            </form>
        </div>
  </label>
</label>
