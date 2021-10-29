import '../stylesheets/PostContainer.css'
import Post from "./Post";
function PostContainer({props}) {
    console.log(props);
    let posts;
    if(props && props.length != 0){
         posts = props.map(({id, name, date, img, body}) => {
            return <Post key={id} user={name} date={date} img={img} text={body}/>
        })
    }

    return (
        <div className={"postContainer"}>
            {posts}
        </div>
    )


}

export default PostContainer;