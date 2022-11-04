export const getPosts = async (init: RequestInit) =>{
    const posts = []

    const data = await (await fetch("/api/rest/post",init)).json()
    await data['posts'].forEach(post => {
        const username: string = post['user']['username']
        
        delete post.user
        posts.push({username,...post})
    });
    return posts


}