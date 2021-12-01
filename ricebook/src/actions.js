/*
 * action types
 */
export const GET_POSTS = "REQUEST_PLAYERS";
export const ADD_POST = "ADD_POST";
export const GET_USERS = "GET_USERS";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const QUERY_POSTS = "QUERY_POSTS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER_USER = "REGISTER_USER";
export const UPDATE_HEADLINE = "UPDATE_HEADLINE";
// export const GET_COMMENTS = "GET_COMMENTS"

/*
 * action creator
 */
export function addPost(post) {
    return {type: ADD_POST, post}
}

export function getPosts(posts) {
    return {type: GET_POSTS, posts}
}

export function getUsers(users) {
    return {type: GET_USERS, users}
}

export function followUser(user) {
    return {type: FOLLOW_USER, user}
}

export function unfollowUser(unfollowedUser) {
    return {type: UNFOLLOW_USER, unfollowedUser}
}

export function queryPosts(query) {
    return {type: QUERY_POSTS, query}
}

export function login(username, password, followedUserProfiles, newUser, newUserArticles) {
    return {type: LOGIN, username, password, followedUserProfiles, newUser, newUserArticles}
}

export function logout() {
    return {type: LOGOUT}
}

export function registerUser(userInfo) {
    return {type: REGISTER_USER, userInfo}
}

export function updateHeadline(headline) {
    return {type: UPDATE_HEADLINE, headline}
}


export function url(path) {
    return `http://localhost:3000${path}`
}

// export function getComments(comments) {
//     return {type: GET_COMMENTS, comments}
// }
async function fetchLogin(username, password) {
    let loginUser = {username, password};
    let status, following, articles;
    status = await fetch(url('/login'), {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(loginUser),
        credentials: 'include'
    }).then(res => res.status)
    following = await fetch(url('/profiles/following'), {
                                method: 'GET',
                                headers: {'Content-Type': 'application/json'},
                                credentials: 'include'
                            }).then(res => res.json())
    articles = await fetch(url('/articles'), {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    }).then(res => res.json())
    return {status, following, articles, username, password}
    //     .then(response => {
    //     return {response, username, password}
    // })

    //     .then(response => {
    //     return Promise.all([fetch(url('/following'), {
    //                         method: 'GET',
    //                         headers: {'Content-Type': 'application/json'},
    //                         credentials: 'include'
    //                     }).then(res => res.json()), fetch(url('/articles'), {
    //                         method: 'GET',
    //                         headers: {'Content-Type': 'application/json'},
    //                         credentials: 'include'
    //                     }).then(res => res.json()), response['username'], response['password']])
    // })
    //     .then(res => {
    //     if (res.status != 200) {
    //         status = -1
    //     } else {
    //         return res.json().then(res => {
    //             // Get followers
    //             fetch(url('/following'), {
    //                 method: 'GET',
    //                 headers: {'Content-Type': 'application/json'},
    //                 credentials: 'include'
    //             }).then(res => res.json()).then(res => {
    //                 console.log(res);
    //                 following = res['following']
    //                 ///////
    //                 fetch(url('/articles'), {
    //                     method: 'GET',
    //                     headers: {'Content-Type': 'application/json'},
    //                     credentials: 'include'
    //                 }).then(res => res.json()).then(res => {
    //                     console.log(res);
    //                     articles = res['articles']
    //                 })
    //             })
    //             // Get new articles
    //             // Use set articles query (For now use queryArticles)
    //             return {articles, following, username, password}
    //         })
    //     }
    // }).catch(err => console.log(err))
}



export function doLogin(username, password, redirect) {
    return function (dispatch) {
        console.log("Within doLogin")
        return fetchLogin(username, password).then(res => {
            console.log(res);
            if (res.status == 200){
                dispatch(login(res['username'], res['password'], res['following'], res['username'], res['articles']))
            }
            redirect(res.status) // Redirect on 200, error otherwise
        })
    }
}
// Populate articles
// Followed users
    // Unfollow (DELETE) -> call articles again

// Backend Q's:
// How do I search for an article in GraphQL?
// How do I sort them by date?