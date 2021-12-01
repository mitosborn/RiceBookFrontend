import '../stylesheets/CurrentUser.css'
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import logo from "../img/logo192.png";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {doHeadlineUpdate, doLogout, logout, updateHeadline} from "../actions";

function CurrentUser() {
    const [showPost, setShowPost] = useState(false);
    const name = useSelector((state)=> state.currentUser.username);
    const img = useSelector((state)=> state.currentUser.picture);
    const currentHeadline = useSelector((state)=> state.currentUser.status);
    const [newHeadline, setNewHeadline] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();


    const logoutApp = () => {
        dispatch(doLogout(() => history.push(
            {pathname:"/login"}
        )))
    }

    return (
        <div>
            <Row>
                <Col className={"col-5"}>
                    <div className="profileImage">
                        <Image src={img} fluid/>
                    </div>
                </Col>
                <Col className={"col-7"}>
                    <div className={"userTextContainer"}>
                        <h3 className={"userText"}>{name}</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className={"col-12"}>
                    <div className={"headlineTextContainer"}>
                        <h6 className={"userText"}>{currentHeadline ? currentHeadline: "No headline at the moment."}</h6>
                    </div>
                </Col>
            </Row>
            <Row>
                <div className="d-flex justify-content-center">
                    <Button className="updateHeadlineBtn btn btn-default mb-2" onClick={() => setShowPost(!showPost)}>{showPost ? "Close" : "Update Headline"}</Button>
                </div>
                {showPost &&<Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className={"userText"}>Headline Text</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e)=>setNewHeadline(e.target.value)} />
                    </Form.Group>
                    <Row>
                        <Col className = {"col-12"}>
                            <div className="d-flex justify-content-center">
                                <Button type="reset" className="currentUserBtn btn btn-default mb-2">Clear</Button>
                                <Button onClick={()=>dispatch(doHeadlineUpdate(newHeadline))} className="currentUserBtn btn btn-default mb-2">Post</Button>
                            </div>
                        </Col>
                    </Row>

                </Form>}
            </Row>
            <Row>
                <Col className = {"col-12"}>
                    <div className="d-flex justify-content-center">
                        <Button className="regBtn btn btn-default" onClick={()=> logoutApp()}>Logout</Button>
                        <Button className="regBtn btn btn-default" onClick={()=>{history.push({pathname:"/profile"})}}>Profile</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CurrentUser;