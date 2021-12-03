import '../stylesheets/Post.css'
import {Alert, Button, Col, Form, Image, Row} from "react-bootstrap";
import Comment from "./Comment";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {doUpdatePost} from "../actions";

/*
const comments = [{"name":"Jeff", "body":"This is so cool!"},{"name":"Gordon", "body":"I gotta go here sometime. Where is this?"},{"name":"Rudy", "body":"Interesting!"},{"name":"Anne", "body":"Very pretty photo! I need to visit here."}, {"name":"Bri", "body":"Placeholder commment."}]
*/

function Post({user, date, img, text, comments, pid}) {
    // const defaultImg = "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg";
    const [showAddComment, setShowAddComment] = useState(false);
    const [newCommentText, setNewCommentText] = useState("");
    const [showCommentAlert, setShowCommentAlert] = useState(false);

    const [showUpdatePost, setShowUpdatePost] = useState(false);
    const [updatedPostText, setUpdatedPostText] = useState("");
    const [showUpdatedPostAlert, setUpdatedPostAlert] = useState(false);
    const dispatch = useDispatch();
    let currentUser = useSelector((state) => state.currentUser.username)

    const addComment = () => {
        console.log("Comment posted!")
        if (!newCommentText) {
            setShowCommentAlert(true);
        }

        dispatch(doUpdatePost(newCommentText, pid, -1));


    }

    const updatePost = () => {
        console.log("Post updated!");
        if (!updatedPostText) {
            setUpdatedPostAlert(true);
        }
        else {
            dispatch(doUpdatePost(updatedPostText, pid));
        }
    }



    // if(!date){
    //     date = new Date();
    // }
    return (
        <div className={"postDiv"}>
            <Row>
                <Col className={"col-6 postHeader"}>
                    <div className={"postHeaderUser"}>
                        <h4>{user}</h4>
                    </div>
                </Col>
                <Col className={"col-6 postHeader"}>
                    <div className={"postHeaderDate"}>
                        <h4>{new Date(date).toLocaleString()}</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className={"col-8"}>
                    <Row>
                        <div className={"profilePostImage"}>
                            {img && <Image src={img} fluid/>}
                        </div>
                    </Row>
                    <Row>
                        <div className={"postText"}>
                            <p>{text}</p>
                        </div>
                    </Row>
                {/*Place post text*/}
                </Col>
                <Col className={"col-4"}>
                    <Row className={"mb-4"}>
                            <div className={"commentBox"}>
                                <h4 className={"commentTitle"}>Comments</h4>
                                <div> 
                                    {comments.map(c => <Comment key={c.id} user={c.author} body={c.text} id={c.id} pid={pid}/>)}
                                </div>
                            </div>
                    </Row>
                    {currentUser == user && <Row>
                        <Col className = {"col-12"}>
                            <div className="d-flex justify-content-center">
                                <Button className="postButton btn btn-default mb-2"onClick={() => {
                                    setShowAddComment(false)
                                    setShowUpdatePost(!showUpdatePost)
                                }}>{showUpdatePost ? "Close Edit Post" : "Edit Post"}</Button>
                            </div>
                        </Col>
                    </Row>}
                    <Row>
                        {showUpdatePost &&<Form>
                            {showUpdatedPostAlert && <Alert variant={'warning'} dismissible onClose={() => setUpdatedPostAlert(false)}>
                                Updated post is empty
                            </Alert>}
                            <Form.Group className="mb-3 whiteText" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Post</Form.Label>
                                <Form.Control onChange={(e)=> setUpdatedPostText(e.target.value)} as="textarea" rows={1} />
                            </Form.Group>
                            <Row>
                                <Col className = {"col-12"}>
                                    <div className="d-flex justify-content-center">
                                        <Button type="reset" className="addPostBtn btn btn-default mb-2">Clear</Button>
                                        <Button onClick={() => updatePost()} className="addPostBtn btn btn-default mb-2">Save</Button>
                                    </div>
                                </Col>
                            </Row>

                        </Form>}
                    </Row>
                    <Row>
                        <Col className = {"col-12"}>
                            <div className="d-flex justify-content-center">
                                <Button className="postButton btn btn-default mb-2" onClick={() => {
                                    setShowUpdatePost(false);
                                    setShowAddComment(!showAddComment)
                                }}>{showAddComment ? "Close Comment" : "Comment"}</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {showAddComment &&<Form>
                            {showCommentAlert && <Alert variant={'warning'} dismissible onClose={() => setShowCommentAlert(false)}>
                                Comment is empty
                            </Alert>}
                            <Form.Group className="mb-3 whiteText" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={(e)=> setNewCommentText(e.target.value)} as="textarea" rows={1} />
                            </Form.Group>
                            <Row>
                                <Col className = {"col-12"}>
                                    <div className="d-flex justify-content-center">
                                        <Button type="reset" className="addPostBtn btn btn-default mb-2">Clear</Button>
                                        <Button onClick={() => addComment()} className="addPostBtn btn btn-default mb-2">Post</Button>
                                    </div>
                                </Col>
                            </Row>

                        </Form>}
                    </Row>


                    {/* Create comment box   */}
                {/* Edit post box   */}

                    {/* Comment btns    */}
                </Col>
            </Row>


            {/*<Row>*/}
            {/*    <Col className={"col-7"}>*/}
            {/*        <div className={"postText"}>*/}
            {/*            <p>A really long statement that keeps going ly long statement that keeps going bly long statement that keeps going bly long statement that keeps going bly long statement that keeps going bly long statement that keeps going b beyond the first line. really long statement that keeps goin really long statement that keeps goinreally long statement that keeps goinreally long statement that keeps goinreally long statement that keeps goin really long statement that keeps goin really long statement that keeps goin</p>*/}
            {/*        </div>*/}
            {/*    </Col>*/}
            {/*    <Col className={"col-5"}>*/}
            {/*        <Row>*/}
            {/*            <Col xs={6}>*/}
            {/*                <Button>Comment</Button>*/}
            {/*            </Col>*/}
            {/*            <Col xs={6}>*/}
            {/*                <Button>Edit</Button>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}

            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    )


}

export default Post;