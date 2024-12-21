/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { getPostAPI } from "../app/api/postApi";

export const useGetPosts = () => {
    const [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = () => {
        getPostAPI().then(
            response => {
                if (response.data) {
                    setIsLoading(false);
                    setPosts(response.data)
                }
            }
        )
        .catch(err => {
            console.log("Error: ", err);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return {posts, isLoading, fetchData}
}