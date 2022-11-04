<script lang="ts">
    export let username: String
    export let description: String
    export let image: String
    export let created_at: string;
    const date = new Date(created_at)
    const formated_date = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`     
</script>

<div class="p-3 my-10 bg-gray-200">
    <div >
      <figure><img src={image} alt="{username}'s post image"/></figure>
      <div class="divider"/>
      <div>
        <p><a href='/users/{username}' class="font-bold text-lg text-secondary" >{username}</a> {description}</p>
      </div>
    </div>
      <p class="text-xs text-primary">uploaded at {formated_date}</p>
  </div>