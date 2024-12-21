/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { faCaretRight, faClose, faLeaf, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { useGetPosts } from "../../hooks/usePosts";

export const PostLayout = () => {
    const {id} = useParams();
    const {data, fetchData, isLoading} = useGetPosts();
    const [selectPost, setSelectPost] = useState();

    const [openSideBar, setOpenSideBar] = useState(false);
    const filterRef = useRef(null);

    const handleOpenSidebar = () => setOpenSideBar(prev => !prev);
    
    const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            handleOpenSidebar(); 
        }
    };

    useEffect(() => {
        if (openSideBar) {
            document.addEventListener("mousedown", handleClickOutside);
        }else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSideBar]);

    useEffect(() => {
        if (data != undefined) {
            setSelectPost(data[0]);
        }
    }, [data])

    useEffect(() => {
        if (id !== 'abc') {
            const selectedPost = data?.find(e => parseInt(e.id) === parseInt(id));
            if (selectedPost) {
                setSelectPost(selectedPost);
            }
        }
    }, [id, data]);
    

    if (isLoading) return <></>

    const handleSelectPost = (e) => {
        setSelectPost(e);
    }
        
    return (
        <>
            <div className="wrap-bg-post-layout" ref={filterRef}>
                <div className="wrap-post-layout" ref={filterRef}>
                    <div className={`wrap-post-sidebar ${openSideBar ? 'open' : ''}`} ref={filterRef}>
                        <h3>
                            Danh sách bài viết
                            <FontAwesomeIcon icon={faClose} onClick={handleOpenSidebar} />
                        </h3>
                        <hr />
                        <ul>
                            {data?.map(e => (
                                <li key={e.id} onClick={() => handleSelectPost(e)}>
                                    <div><FontAwesomeIcon icon={faLeaf} /></div>
                                    <p>{e.header}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="wrap-post-content">
                        <div className="-post-header">
                            <FontAwesomeIcon icon={faList} onClick={handleOpenSidebar}/>
                            <FontAwesomeIcon icon={faCaretRight} />
                            <h3>{selectPost?.header}</h3>
                        </div>
                        <hr />
                        <div className="-post-content" dangerouslySetInnerHTML={{ __html: selectPost?.content }} />
                    </div>
                </div>
            </div>
        </>
    )
}