import {
    ADD_POST,
    FOLLOW_USER, GET_COMMENTS,
    GET_POSTS,
    GET_USERS,
    LOGIN,
    LOGOUT,
    QUERY_POSTS, queryPosts,
    REGISTER_USER,
    UNFOLLOW_USER,
    UPDATE_HEADLINE
} from "./actions";

//There should initially be 10 registered users
const initialState = {
    posts: [],
    allPosts: [],
    currentUser: {"username":"", "name":"", "img":"", "headline":"", id: 1, email:"", address:{street:"", zipcode:-1}},
    newPostID: 101,
    newFollowerID: 11,
    users: [],
    followedUsers: [],
    userLoginInfo: {},
    lastQuery: "",
    customUser: false,
    loggedIn: false,
    error: false,
    comments: {},
    initialFollowMap: {1:[2,3,4], 2:[3,4,5], 3:[4,5,6], 4:[5,6,7],5:[6,7,8],6:[7,8,9],7:[8,9,10],8:[9,10,1],9:[10,1,2],10:[1,2,3]}
};
const defaultUser = {"username":"placeholder", "name":"Brett", "img":"https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg", "headline":"At work", id:1, email:"someemail@email.com", address:{street:"somestreet", zipcode:85641}} // If custom, need to rename Brett to custom user
const pictures = ["https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg", "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","https://images.unsplash.com/photo-1614107696198-e5b2273fd3c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80", "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"]
// const initialFollowMap = {1:[2,3,4], 2:[3,4,5], 3:[4,5,6], 4:[5,6,7],5:[6,7,8],6:[7,8,9],7:[8,9,10],8:[9,10,1],9:[10,1,2],10:[1,2,3]}

// From https://stackoverflow.com/questions/31378526/generate-random-date-between-two-dates-and-times-in-javascript
function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}
export function riceBookReducer(state = initialState, action) {
    switch (action.type) {
        // update state with requested players from the dummy server
        case ADD_POST:
            let newPost = action.post;
            action.post["id"] = state.newPostID;
            action.post["userId"] = state.currentUser["id"]
            console.log(newPost)
            return riceBookReducer({...state, posts: [newPost, ...state.posts], allPosts: [newPost, ...state.allPosts], newPostID: (state.newPostID + 1)}, queryPosts());
            break;
        case GET_POSTS:
            let followed_posts = []
            let all_posts = []
            let picture_index = 0;
            let today = new Date();
            let weekago = new Date(today.getFullYear(),today.getMonth(),today.getDate()-7);
            for (const [key, value] of Object.entries(action.posts)) {
                let {id, title, body, userId} = value;
                let post = {userId, id, title, body, name: state.users[userId-1]["username"], date: randomDate(weekago, today, 0, 24), img: pictures[picture_index]}
                // IF id in current user followed add it
                if([...state.followedUsers.map(user => user.id), state.currentUser["id"]].includes(userId)){
                    if(state.customUser && userId == state.currentUser["id"]){
                        post = {...post, name:state.currentUser["user"], username: state.currentUser["username"]}
                    }
                    followed_posts.push(post)
                    picture_index = (picture_index + 1) % pictures.length;
                }
                all_posts.push(post)

            }
            console.log([...state.initialFollowMap[state.currentUser["id"]], state.currentUser["id"]])
            followed_posts = followed_posts.sort((a,b)=>b.date-a.date)
            all_posts = all_posts.sort((a,b)=>b.date-a.date)

            console.log(followed_posts)
            return {...state, posts: followed_posts, allPosts: all_posts};
        // Case UNFOLLOW_USR: -> Need to create add follower btn (Copy post)
        case GET_USERS:
            console.log(action.users)
            console.log(state.currentUser)
            let allUsers = []
            let userLoginInfo = {}
            let profile_pic = 0;
            // Move this into login + register
            // initialFollowMap[state.currentUser["id"]].forEach(user => {
            //     followedUsers.push({...action.users[user-1], img: pictures[profile_pic], headline:action.users[user-1]["company"]["catchPhrase"]})
            //     profile_pic = (profile_pic + 1) % pictures.length;
            // });
            action.users.forEach(user => {
                allUsers.push({...user, img: pictures[profile_pic], headline:user["company"]["catchPhrase"]})
                profile_pic = (profile_pic + 1) % pictures.length;
            })
            action.users.forEach(user => {
                userLoginInfo[user["username"]] = user['address']['street']
            })

            return {...state, users: allUsers, userLoginInfo: userLoginInfo}
        case FOLLOW_USER:
            let JSONUsers = state.users.filter(user => user.username == action.user.username.trim())
            // Only add users that exist + are not already followed
            if (JSONUsers && !state.followedUsers.includes(JSONUsers[0])) {
                return riceBookReducer({...state, followedUsers:[...state.followedUsers, JSONUsers[0]]}, queryPosts());
            }
            // Followed user doesn't exist; add nothing
            return state;
        case UNFOLLOW_USER:
            console.log(action.unfollowedUser)
            let new_followed = state.followedUsers.filter(user => user.username != action.unfollowedUser)
            return riceBookReducer({...state, followedUsers:new_followed}, queryPosts(state.lastQuery));
        case QUERY_POSTS:
            let queried_posts;
            if(action.query){
                queried_posts = state.allPosts.filter(user =>  [state.currentUser["id"],...state.followedUsers.map(followed => followed.id)].includes(user.userId) && (user.body.includes(action.query) || user.name.includes(action.query)))
            }
            else {
                queried_posts = state.allPosts.filter(user =>  [state.currentUser["id"],...state.followedUsers.map(followed => followed.id)].includes(user.userId))
            }
            return {...state, posts: queried_posts, lastQuery:action.query}
        case LOGIN:
            if(state.userLoginInfo[action.username] && state.userLoginInfo[action.username] == action.password) {
                console.log("Valid user")
                let logged_in;
                let followedUsers = [];
                state.users.forEach(user => {
                    if(user.username == action.username){
                        logged_in = user;
                    }
                })
                state.initialFollowMap[logged_in["id"]].forEach(user => {
                    followedUsers.push(state.users[user-1])
                });
                console.log(logged_in)
                return riceBookReducer({...state, followedUsers: followedUsers, currentUser: logged_in, loggedIn: true, error: false}, queryPosts());
            }
            else {
                console.log("Invalid user")
                return {...state, error: true, loggedIn: false}
            }

        case LOGOUT:
            return {...initialState};
            break;
        case REGISTER_USER:
            console.log(action.userInfo)
            // Set user equal to default user with the custom username inputted
            let newUserFollowedUsers = []
            let newUser = {...defaultUser, user:action.userInfo.accountName, username:action.userInfo.accountName,email:action.userInfo.email, address:{...defaultUser.address, zipcode:action.userInfo.zipcode, street:action.userInfo.password}, phone: action.userInfo.phone, id:11};
            newUserFollowedUsers.push(state.users[0]);
            return {...state, initialFollowMap:{...state.initialFollowMap, 11:[0]}, followedUsers: newUserFollowedUsers, currentUser:newUser, customUser: true, loggedIn: true}
        case UPDATE_HEADLINE:
            console.log("Updated headline");
            return {...state ,currentUser: {...state.currentUser, headline: action.headline}};
        case GET_COMMENTS:
            return state;
        default:
            return state;

    }
    return state;
}

// Make search bar and link pages together.
// Change colors of CSS