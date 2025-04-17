import { useEffect, useState } from 'react';
import axios from "axios";
import Loading from "./Loading";

const FetchingData = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/posts/');
                setPosts(response.data);
            } catch (error) {
                console.log('An error occured:', error);
            }
        }

        getData();

    }, [])

    return (
        <>
            {
                posts.length > 0 ? (
                    posts.map((post) => {
                        return (
                            <div key={post.id}>
                                <p>Id: {post.id}</p>
                                <p>Title: {post.title}</p>
                                <p>{post.body}</p>
                            </div>
                        );
                    })
                ) : (<Loading />)
            }
        </>   
    );
  };
  
  export default FetchingData;