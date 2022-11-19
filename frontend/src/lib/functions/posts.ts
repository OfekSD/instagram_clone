export const getPosts = async (jwt: string) =>{
    const posts = []

    const data = await (await fetch("/api/rest/post",
    {headers:{
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
}})).json()
    await data['posts'].forEach(post => {
        const username: string = post['user']['username']
        
        delete post.user
        posts.push({username,...post})
    });
    return posts


}


export const getUserPosts = async (jwt: string, username: string) =>{
    const posts = []
    

    const data = await (await fetch(`/api/rest/post/${username}`,
    {headers:{
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
}})).json()
    await data['posts'].forEach(post => {
        const username: string = post['user']['username']
        
        delete post.user
        posts.push({username,...post})
    });
    return posts
}