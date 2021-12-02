import '../stylesheets/PostContainer.css'
import Post from "./Post";
function PostContainer({props}) {
    console.log(props);
    let posts;
    if(props && props.length != 0){
         posts = props.map(({_id, pid, author, date, image, text}) => {
            return <Post key={_id} user={author} date={date} img={image} text={text}/>
        })
    }

    return (
        <div className={"postContainer"}>
            {posts}
        </div>
    )


}

export default PostContainer;