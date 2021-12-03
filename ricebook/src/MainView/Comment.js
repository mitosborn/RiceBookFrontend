import '../stylesheets/Post.css'
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {doUpdatePost} from "../actions";

function Comment({user, body, id, pid}) {
    const [showUpdatePost, setShowUpdatePost] = useState(false);
    const [updatedPostText, setUpdatedPostText] = useState("");
    const [showUpdatedPostAlert, setUpdatedPostAlert] = useState(false);
    const dispatch = useDispatch();
    let currentUser = useSelector((state) => state.currentUser.username)

    const updateComment = () => {
        console.log("Comment updated!");
        if (!updatedPostText) {
            setUpdatedPostAlert(true);
        }
        else {
            dispatch(doUpdatePost(updatedPostText, pid, id));
        }
    }



    return (
        <div>
            <Row>
                <Col className={"postHeader"}>
                    <div className={"postHeaderUser"}>
                        <h6 className={"m-1"}>{user}</h6>
                    </div>
                </Col>
            </Row>
            <Row className={"mb-2"}>
                <Col>
                    {body}
                </Col>
            </Row>
            {currentUser == user && <Row>
                <Col className = {"col-12"}>
                    <div className="d-flex justify-content-center">
                        <Button className="postButton btn btn-default mb-2"onClick={() => {
                            setShowUpdatePost(!showUpdatePost)
                        }}>{showUpdatePost ? "Close" : "Edit Comment"}</Button>
                    </div>
                </Col>
            </Row>}
            <Row>
                {showUpdatePost &&<Form className={"commentUpdateBox"}>
                    {showUpdatedPostAlert && <Alert variant={'warning'} dismissible onClose={() => setUpdatedPostAlert(false)}>
                        Comment is empty
                    </Alert>}
                    <Form.Group className="mb-3 whiteText" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className={"commentUpdateBox"}>Edit Comment</Form.Label>
                        <Form.Control onChange={(e)=> setUpdatedPostText(e.target.value)} as="textarea" rows={1} />
                    </Form.Group>
                    <Row>
                        <Col className = {"col-12"}>
                            <div className="d-flex justify-content-center">
                                <Button type="reset" className="addPostBtn btn btn-default mb-2">Clear</Button>
                                <Button onClick={() => updateComment()} className="addPostBtn btn btn-default mb-2">Save</Button>
                            </div>
                        </Col>
                    </Row>

                </Form>}
            </Row>

        </div>
    )

}

export default Comment;