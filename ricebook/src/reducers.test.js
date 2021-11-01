import {riceBookReducer} from './reducers';
import {followUser, getPosts, getUsers, login, logout, queryPosts, unfollowUser} from "./actions";
import * as post_data from './TestData/posts.json';
import * as user_data from './TestData/users.json';

const {Posts} = post_data;
const {Users} = user_data;


test('should log in a previously registered user (not new users, login state should be set)', () => {
    let previousState = riceBookReducer(undefined, getUsers(Users));
    previousState = riceBookReducer(previousState, getPosts(Posts));
    let newState = riceBookReducer(previousState, login('Bret','Kulas Light'));
   expect(newState.currentUser).toEqual({
       "id": 1,
       "name": "Leanne Graham",
       "username": "Bret",
       "email": "Sincere@april.biz",
       "address": {
           "street": "Kulas Light",
           "suite": "Apt. 556",
           "city": "Gwenborough",
           "zipcode": "92998-3874",
           "geo": {
               "lat": "-37.3159",
               "lng": "81.1496"
           }
       },
       "phone": "1-770-736-8031 x56442",
       "website": "hildegard.org",
       "company": {
           "name": "Romaguera-Crona",
           "catchPhrase": "Multi-layered client-server neural-net",
           "bs": "harness real-time e-markets"
       },
       "img": "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg",
       "headline": "Multi-layered client-server neural-net"
   });
   expect(newState.loggedIn).toEqual(true);
})


test('should not log in an invalid user (error state should be set)', () => {
    let previousState = riceBookReducer(undefined, getUsers(Users));
    previousState = riceBookReducer(previousState, getPosts(Posts));
    let newState = riceBookReducer(previousState, login('Unauthorizeduser','Baduser'));
    expect(newState.error).toEqual(true);
    expect(newState.currentUser).toEqual({"username":"", "name":"", "img":"", "headline":"", id:1, email:"", address:{street:"", zipcode:-1}});
    expect(newState.loggedIn).toEqual(false);
})


test('should log out a user (login state should be cleared)', () => {
    let previousState = riceBookReducer(undefined, getUsers(Users));
    previousState = riceBookReducer(previousState, getPosts(Posts));
    previousState = riceBookReducer(undefined, login('Bret','Kulas Light'));
    let newState = riceBookReducer(previousState, logout());
    expect(newState.currentUser).toEqual({"username":"", "name":"", "img":"", "headline":"", id:1, email:"", address:{street:"", zipcode:-1}});
    expect(newState.loggedIn).toEqual(false);
})


test('should fetch all articles for current logged in user (posts state is set)', () => {
    let state = riceBookReducer(undefined, getUsers(Users));
    state = riceBookReducer(state, getPosts(Posts));
    state = riceBookReducer(state, login('Bret','Kulas Light'));
    // User 1 should have posts from users 1, 2, 3, 4 (40 posts)
    expect(40).toEqual(state.posts.length);
})


test('should fetch subset of articles for current logged in user given search keyword (posts state is filtered)', () => {
    let oldState = riceBookReducer(undefined, getUsers(Users));
    oldState = riceBookReducer(oldState, getPosts(Posts));
    oldState = riceBookReducer(oldState, login('Bret','Kulas Light'));
    let oldStateLength = oldState.posts.length;
    let newState = riceBookReducer(oldState, queryPosts('rerum tempore'));
    // Check expected contents of post + fewer posts
    expect(newState.posts.map(post => {
        post["date"] = "";
        return post;
    })).toEqual([
        {
            "userId": 1,
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
            "name": "Bret",
            "date": "",
            "img": "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
    ]);
    expect(newState.posts.length < oldStateLength);
    // Search by Author; Should be ten posts
    newState = riceBookReducer(oldState, queryPosts('Antonette'));
    expect(10).toEqual(newState.posts.length);
})


test('should add articles when adding a follower (posts state is larger )', () => {
    let oldState = riceBookReducer(undefined, getUsers(Users));
    oldState = riceBookReducer(oldState, getPosts(Posts));
    oldState = riceBookReducer(oldState, login('Bret','Kulas Light'));
    let oldStateNum = oldState.posts.length;
    let newState = riceBookReducer(oldState, followUser('Moriah.Stanton'));
    expect(newState.posts.length > oldStateNum);
})

test('should remove articles when removing a follower (posts state is smaller)', () => {
    let oldState = riceBookReducer(undefined, getUsers(Users));
    oldState = riceBookReducer(oldState, getPosts(Posts));
    oldState = riceBookReducer(oldState, login('Bret','Kulas Light'));
    let oldStateNum = oldState.posts.length;
    let newState = riceBookReducer(oldState, unfollowUser("Antonette"));
    expect(oldStateNum > newState.posts.length);
})

test('should fetch the logged in user\'s profile username', () => {
    let oldState = riceBookReducer(undefined, getUsers(Users));
    oldState = riceBookReducer(oldState, getPosts(Posts));
    let newState = riceBookReducer(oldState, login('Bret','Kulas Light'));
    expect(newState.currentUser.username).toEqual('Bret');
})
