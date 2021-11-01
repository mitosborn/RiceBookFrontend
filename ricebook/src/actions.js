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

export function login(username, password) {
    return {type: LOGIN, username, password}
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

// export function getComments(comments) {
//     return {type: GET_COMMENTS, comments}
// }