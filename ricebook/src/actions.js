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

export function followUser(newArticles, newFollowers, error) {
    return {type: FOLLOW_USER, newArticles, newFollowers, error}
}

export function unfollowUser(unfollowedUser) {
    return {type: UNFOLLOW_USER, unfollowedUser}
}

export function queryPosts(query) {
    return {type: QUERY_POSTS, query}
}

export function login(username, password, followedUserProfiles, newUser, newUserArticles, loggedInProfile) {
    return {type: LOGIN, username, password, followedUserProfiles, newUser, newUserArticles, loggedInProfile}
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
    let status, following, articles, loggedInProfile;
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
                            }).then(res => res.json()).then(res => res['profiles'])
    articles = await fetch(url('/articles'), {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    }).then(res => res.json()).then(res => res['articles'])

    loggedInProfile = await fetch(url('/profile'), {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    }).then(res => res.json()).then(res => res['profile'])
    return {status, following, articles, username, password, loggedInProfile}
}



export function doLogin(username, password, redirect) {
    return function (dispatch) {
        console.log("Within doLogin")
        return fetchLogin(username, password).then(res => {
            console.log(res);
            if (res.status == 200){
                dispatch(login(res['username'], res['password'], res['following'], res['username'], res['articles'], res['loggedInProfile']))
            }
            redirect(res.status) // Redirect on 200, error otherwise
        })
    }
}

export function doHeadlineUpdate(newHeadline) {
    return function (dispatch) {
        console.log("Within doHeadlineUpdate")
        return fetch(url('/headline'), {
                method: 'PUT',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({"headline":newHeadline}),
                credentials: 'include'
            }).then(res => res.status)
        .then(status => {
            console.log(status);
            if (status == 200){
                dispatch(updateHeadline(newHeadline))
            }
            //TODO: Raise error on response
        })
    }
}

export function doLogout(redirect) {
    return function (dispatch) {
        console.log("Within doLogout")
        return fetch(url('/logout'), {
            method: 'PUT',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(res => {
            console.log(res);
            if (res.status == 200){
                dispatch(logout())
                redirect() // Redirect on 200, error otherwise
            }
        })
    }
}


export function doFollowUser(newFollowName) {
    return function (dispatch) {
        console.log("Within doLogout")
        return (async () => {
            let status = await fetch(url('/following/' + newFollowName), {
                method: 'PUT',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                credentials: 'include'
            }).then(res => res.status)
            console.log("FollowStatus" + status);
            if(status != 200){
                return Promise.reject("User doesn't exist")
            }
            else {
                let newFollowers = await fetch(url('/profiles/following'), {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                }).then(res => res.json()).then(res => res['profiles'])

                let newArticles = await fetch(url('/articles'), {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                }).then(res => res.json()).then(res => res['articles'])

                return {newFollowers, newArticles}
            }
        })()
    .then(res => {
            console.log(res);
            dispatch(followUser(res['newArticles'], res['newFollowers'], false))
        }).catch(err => dispatch(followUser([], [], true)))
    }
}


// Populate articles
// Followed users
    // Unfollow (DELETE) -> call articles again

// Backend Q's:
// How do I search for an article in GraphQL?
// How do I sort them by date?