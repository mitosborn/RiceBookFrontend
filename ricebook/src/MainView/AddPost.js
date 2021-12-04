import '../stylesheets/AddPost.css'
import Post from "./Post";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {doAddArticle, url} from "../actions";
function AddPost({user, defaultImg, addPost}) {

    const [showPost, setShowPost] = useState(false);
    const [newPostText, setNewPostText] = useState("");
    const [includeImg, setIncludeImg] = useState(true);
    const [img, setImg] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const createPost = async () => {

        let generatedImageURL;
        if (includeImg) {
            if (img) {
                // upload image: create FormData, add image, post to /img
                const formData = new FormData()

                formData.append('image', img);
                generatedImageURL = await fetch(url('/image'), {
                    method: 'POST',
                    // headers: {'Accept': 'application/json'},
                    credentials: 'include',
                    body: formData
                }).then(res => res.json()).then(res => res['url'])

            } else {
                setShowAlert(true);
                return;
            }
        }
        if (!newPostText) {
            setShowAlert(true);
            return;
        }
        addPost({
            text: newPostText,
            image: includeImg ? generatedImageURL : "",
        });
        setIncludeImg(true);
    }


    return (
        <div>
            <div className="d-flex justify-content-center">
                <Button className="w-100 btn btn-default mb-2" onClick={() => setShowPost(!showPost)}>{showPost ? "Close" : "Add Article"}</Button>
            </div>
            {showAlert && <Alert variant={'warning'} dismissible onClose={() => setShowAlert(false)}>
                Error: Form is not complete
            </Alert>}
            {showPost &&<Form>
                <Row>
                    <Form.Label>Upload an image</Form.Label>
                    <Col md={7}>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Control type="file" name="image" size="sm" onChange={(e) => setImg(e.target.files[0])}/>
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