import axios from 'axios';
import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, getUsers, addPost, followUser, unfollowUser, queryPosts, getComments} from "../actions";
import {Col, Container, Row} from "react-bootstrap";
import "../stylesheets/MainView.css";
import FollowedUsersContainer from './FollowedUsersContainer';
import PostContainer from "./PostContainer";
import AddPost from "./AddPost";
import CurrentUser from "./CurrentUser.js"
import AddFollower from "./AddFollower";
import SearchBar from "./SearchBar";
import { useHistory } from 'react-router-dom'
const url = path => `http://localhost:3000${path}`;

function MainView() {
    let posts = useSelector((state) => state.posts)
    let followedUsers = useSelector((state) => state.followedUsers)
    let currentUser = useSelector((state) => state.currentUser);
    let loggedIn = useSelector((state) => state.loggedIn);
    const dispatch = useDispatch();
    const history = useHistory();


    useMemo(() => {
        if(!loggedIn) {
            history.push({"pathname":"/login"})
        }
        else {
            fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(res => {
                dispatch(getUsers(res));
                // fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then(res => {
                //     console.log(res)
                //     dispatch(getPosts(res));
                // }, []);
            }, []);
            // Used for future assignment where comments are not hardcoded
            // fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json()).then(res => {
            //     console.log(res)
            //     dispatch(getComments(res));
            // }, []);
        }






    },[])


// Place 3 col, 6 col, 3 col arrangement
// 6 col has container that takes list of post components

    const createPost = (post) => {
        dispatch(addPost(post));
    }

    const followFtn = (user) => {
        dispatch(followUser(user))
        // dispatch(queryPosts(lastQuery));
    }

    const unfollowFtn = (user) => {
        dispatch(unfollowUser(user))
        // dispatch(queryPosts(lastQuery));
    }

    const searchFtn = (query) => {
        dispatch(queryPosts(query))

    }

    return (
        <div id="main-div">
            <Container fluid id={"main-container"}>
                <Row className={"header"}>
                    <Col className={"col-3"}></Col>
                    <Col className={"col-6"}>
                        <div className={"mainTitle"}>
                            <h1 className={"mainTitle"}>RiceBook</h1>
                        </div>
                    </Col>
                    <Col className={"col-3"}></Col>
                </Row>
                <Row  className={"content-row"}>
                    <Col className={"col-3"} style={{backgroundColor:"black"}}>
                        <div className={"topPadding"}>
                            <AddFollower user={currentUser.user} followFtn={followFtn} defaultImg={currentUser.img}/>
                        </div>
                        <div>
                            <FollowedUsersContainer props={followedUsers} unfollowFtn={unfollowFtn}/>
                        </div>
                    </Col>
                    <Col className={"col-6"} style={{backgroundColor:"white"}}>
                        <div className={"topPadding"}>
                            <SearchBar searchFtn={searchFtn}/>
                        </div>
                        <div>
                            <AddPost user={currentUser.username} addPost={createPost} defaultImg={currentUser.img}/>
                        </div>
                        <div>
                            <PostContainer props={posts}/>
                        </div>
                    </Col>
                    <Col className={"col-3"} style={{backgroundColor:"black"}}>
                        <div className={"topPadding"}>
                            <CurrentUser/>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}

export default MainView;