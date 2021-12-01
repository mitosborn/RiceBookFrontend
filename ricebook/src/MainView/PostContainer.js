import '../stylesheets/PostContainer.css'
import Post from "./Post";
function PostContainer({props}) {
    console.log(props);
    let posts;
    if(props && props.length != 0){
         posts = props.map(({pid, author, date, image, body}) => {
            return <Post key={pid} user={author} date={date} img={image} text={body}/>
        })
    }

    return (
        <div className={"postContainer"}>
            {posts}
        </div>
    )


}

export default PostContainer;