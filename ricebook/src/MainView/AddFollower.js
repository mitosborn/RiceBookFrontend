import '../stylesheets/AddPost.css'
import Post from "./Post";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
function AddFollower({user, defaultImg, followFtn}) {
    const [showPost, setShowPost] = useState(false);
    const [newPostText, setNewPostText] = useState("");
    const followUser = () => {
        followFtn(newPostText);
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <Button className="w-100 btn btn-default mb-2" onClick={() => setShowPost(!showPost)}>{showPost ? "Close" : "Follow Someone"}</Button>
            </div>
            {showPost &&<Form>
                <Form.Group className="mb-3 whiteText" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={(e)=> setNewPostText(e.target.value)} as="textarea" rows={1} />
                </Form.Group>
                <Row>
                    <Col className = {"col-12"}>
                        <div className="d-flex justify-content-center">
                            <Button type="reset" className="addPostBtn btn btn-default mb-2">Clear Text</Button>
                            <Button onClick={() => followUser()}className="addPostBtn btn btn-default mb-2">Follow</Button>
                        </div>
                    </Col>
                </Row>

            </Form>}
        </div>
    )


}

export default AddFollower;