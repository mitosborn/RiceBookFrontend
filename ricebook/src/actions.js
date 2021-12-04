/*
 * action types
 */
export const GET_POSTS = "REQUEST_PLAYERS";
export const SET_POSTS = "SET_POSTS";
export const GET_USERS = "GET_USERS";
export const FOLLOW_UPDATE = "FOLLOW_UPDATE";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const QUERY_POSTS = "QUERY_POSTS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER_USER = "REGISTER_USER";
export const UPDATE_HEADLINE = "UPDATE_HEADLINE";
export const UPDATE_AVATAR = "UPDATE_AVATAR";
export const UPDATE_ZIPCODE = "UPDATE_ZIPCODE";
export const UPDATE_EMAIL = "UPDATE_EMAIL";


// export const GET_COMMENTS = "GET_COMMENTS"

/*
 * action creator
 */
export function setPosts(posts) {
    return {type: SET_POSTS, posts}
}

export function getPosts(posts) {
    return {type: GET_POSTS, posts}
}

export function getUsers(users) {
    return {type: GET_USERS, users}
}

export function followUpdate(newArticles, newFollowers, error) {
    return {type: FOLLOW_UPDATE, newArticles, newFollowers, error}
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

export function updateAvatar(avatar) {
    return {type: UPDATE_AVATAR, avatar}
}

export function updateZipcode(zipcode) {
    return {type: UPDATE_ZIPCODE, zipcode}
}

export function updateEmail(email) {
    return {type: UPDATE_EMAIL, email}
}

export function url(path) {
    // return `http://localhost:3000${path}`
    return `https://finalbackend-mbo2.herokuapp.com${path}`
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
        return fetchLogin(username, password).then(res => {
            if (res.status == 200){
                dispatch(login(res['username'], res['password'], res['following'], res['username'], res['articles'], res['loggedInProfile']))
            }
            redirect(res.status) // Redirect on 200, error otherwise
        }).catch(() => redirect(-1))
    }
}

export function doHeadlineUpdate(newHeadline) {
    return function (dispatch) {
        return fetch(url('/headline'), {
                method: 'PUT',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({"headline":newHeadline}),
                credentials: 'include'
            }).then(res => res.status)
        .then(status => {
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


export function doFollowUpdate(follower, followUser) {
    let method = followUser ? 'PUT' : 'DELETE';
    return function (dispatch) {
        console.log("Within doLogout")
        return (async () => {
            let status = await fetch(url('/following/' + follower), {
                method: method,
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
            dispatch(followUpdate(res['newArticles'], res['newFollowers'], false))
        }).catch(err => dispatch(followUpdate([], [], true)))
    }
}

export function doAddArticle(article) {
    return function (dispatch, getState) {
        console.log("Within doLogout")
        return fetch(url('/article'), {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(article)
        }).then(res => res.json()).then(res => {
            console.log(res);
            dispatch(setPosts(res['articles']));
        })
    }
}

export function doUpdatePost(updatedPostText, pid, commentId = "") {
    return function (dispatch) {
        console.log("Within doUpdatePost");
        console.log(pid, commentId);
        return fetch(url('/articles/'+ pid), {
            method: 'PUT',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(commentId ? {"text": updatedPostText, commentId}: {"text": updatedPostText})
        }).then(res => res.json()).then(res => {
            console.log(res);
            dispatch(setPosts(res['articles']));
        })
    }
}


export function doUpdateAvatar(img) {
    return function (dispatch) {
        console.log("Within doUpdateAvatar");
        const formData = new FormData()
        console.log(formData);
        formData.append('image', img);
        return fetch(url('/avatar'), {
            method: 'PUT',
            credentials: 'include',
            body: formData
        }).then(res => res.json()).then(res => {
            console.log(res);
            dispatch(updateAvatar(res['avatar']));
        })
    }
}



export function doUpdateZipcode(zipcode) {
    return function (dispatch) {
        console.log("Within doUpdateZipcode");
        return fetch(url('/zipcode'), {
            method: 'PUT',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({"zipcode": zipcode})
        }).then(res => res.json()).then(res => {
            console.log(res);
            dispatch(updateZipcode(res['zipcode']));
        })
    }
}

export function doUpdateEmail(email) {
    return function (dispatch) {
        console.log("Within doUpdateEmail");
        return fetch(url('/email'), {
            method: 'PUT',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({"email": email})
        }).then(res => res.json()).then(res => {
            console.log(res);
            dispatch(updateEmail(res['email']));
        })
    }
}


export function doUpdatePassword(password) {
    console.log("Within doUpdatePassword");
    fetch(url('/password'), {
        method: 'PUT',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({"password": password})
    }).then(res => res.json()).then(res => {
        console.log(res);
    })
}


export function doRegister(username, email, zipcode, password, dob) {
    console.log("Within doRegister");
    let request = {username, email, zipcode, password, dob}
    console.log(request)
    return fetch(url('/register'), {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(request)
    })

}
// Populate articles
// Followed users
    // Unfollow (DELETE) -> call articles again

// Backend Q's:
// How do I search for an article in GraphQL?
// How do I sort them by date?