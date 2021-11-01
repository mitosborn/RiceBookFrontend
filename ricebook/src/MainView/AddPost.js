import '../stylesheets/AddPost.css'
import Post from "./Post";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
function AddPost({user, defaultImg, addPost}) {
    console.log(defaultImg);
    const [showPost, setShowPost] = useState(false);
    const [newPostText, setNewPostText] = useState("");
    const [includeImg, setIncludeImg] = useState(true);
    const createPost = () => {
        console.log(includeImg);
        addPost({name:user,img:includeImg ? defaultImg: "",title:"untitled",date:new Date(),body:newPostText,headline:"Busy right now"});
        setIncludeImg(true);
    }


    return (
        <div>
            <div className="d-flex justify-content-center">
                <Button className="w-100 btn btn-default mb-2" onClick={() => setShowPost(!showPost)}>{showPost ? "Close" : "Add Article"}</Button>
            </div>
            {showPost &&<Form>
                <Row>
                    <Form.Label>Upload an image</Form.Label>
                    <Col md={7}>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Control type="file" size="sm" />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Check type="checkbox" size="sm" label="No image" onClick={() => setIncludeImg(includeImg => !includeImg)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Post Text</Form.Label>
                        <Form.Control onChange={(e)=> setNewPostText(e.target.value)} as="textarea" rows={3} />
                    </Form.Group>
                </Row>

                <Row>
                    <Col className = {"col-12"}>
                        <div className="d-flex justify-content-center">
                            <Button type="reset" className="addPostBtn btn btn-default mb-2">Clear Text</Button>
                            <Button type="reset" onClick={() => createPost()}className="addPostBtn btn btn-default mb-2">Post</Button>
                        </div>
                    </Col>
                </Row>

            </Form>}
        </div>
    )


}

export default AddPost;