/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getRandom_10_Product } from "../app/api/product_api";
import { get3Posts, getPosts } from "../app/api/pots_api";

export const useGet3Posts = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await get3Posts().then(
            response => {
                if (response) {
                    setData(response.posts);
                    setIsLoading(false);
                }
            }
        )
    }

    useEffect(() => {
        fetchData();
    }, [])

    return {data, isLoading, fetchData}
}

export const useGetPosts = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await getPosts().then(
            response => {
                if (response) {
                    setData(response.posts);
                    setIsLoading(false);
                }
            }
        )
    }

    useEffect(() => {
        fetchData();
    }, [])

    return {data, isLoading, fetchData}
}
