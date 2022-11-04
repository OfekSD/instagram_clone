<script lang="ts">
    export let alt: string = '';
    export let link: string = ''

    const preload = async (src) => {
    const resp = await fetch(src);
		const blob = await resp.blob();

		return new Promise(function (resolve) {
			let reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject('Error: ', error);
		});
  };
</script>

{#await preload(link)}
    
{:then base64} 
{console.log(base64)}
<img alt={alt} src={base64}/>
{/await}