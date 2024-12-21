/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getAdminAPI, getHeader } from "../app/api/adminApi";


export const useGetAdmin = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        const id = localStorage.getItem('id_admin');
        if (id) {
            await getAdminAPI(id).then(
                data => {
                    if (data.data) {
                        setData(data.data)
                        setIsLoading(false)
                    }
                }
            )
            .catch(err => {
                console.log("Error: ", err);
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return {data, fetchData, isLoading}
}

export const useGetHeader = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        const id = localStorage.getItem('id_admin');
        if (id) {
            await getHeader(id).then(
                response => {
                    if (response.data) {
                        setData(response.data)
                        setIsLoading(false)
                    }
                }
            )
            .catch(err => {
                console.log("Error: ", err);
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return {data, fetchData, isLoading}
}