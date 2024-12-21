/* eslint-disable no-unused-vars */
import { faBook, faCaretRight, faHeader, faList, faPaperPlane, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import ReactQuill from "react-quill"
import { useGetPosts } from "../../hooks/usePost"
import { addNewPostAPI, deletePostAPI, updatePostAPI } from "../../app/api/postApi"

export const PostLayout = () => {
    const POST_DEFAULT = { id: '', header: '', image: ''};
    const listRef = useRef(null);
    const [post, setPost] = useState(POST_DEFAULT);
    const [content, setContent] = useState('');
    const [postStore, setPostStore] = useState();
    const [quillKey, setQuillKey] = useState(0); 
    const { posts, fetchData, isLoading} = useGetPosts();
    const [openList, setOpenList] = useState(false);
    const fileInputRef = useRef(null);
    const [URLImage, setURLImage] = useState('');

    const handleClickFileInput = () => {
        fileInputRef.current.click();
    }

    const handleOpenList = () => setOpenList(prev => !prev);

    useEffect(() => {
        setPostStore(posts);
    }, [posts]);

    useEffect(() => {
        if (openList) {
            document.addEventListener("mousedown", handleOpenList);
        }else {
            document.removeEventListener("mousedown", handleOpenList);
        }

        return () => {
            document.removeEventListener("mousedown", handleOpenList);
        };
    }, [openList])

    if (isLoading) return <div>Đang tải</div>

    const handleNewPost = () => {
        setPost(POST_DEFAULT);
        setContent('');
        setQuillKey(prevKey => prevKey + 1);
    }

    const handleClick = (header) => {
        const temp = postStore?.find(p => p.header === header);
        setPost({id: temp.id, header: temp.header, image: temp.image});
        setContent(temp.content);
        setURLImage('')
    }

    const handleAddPost = async () => {
        if (!post.header || !content || !post.image) {
            alert('Vui lòng không để trống nội dung.')
            return;
        }
        await addNewPostAPI({header: post.header, content: content, image: post.image});
        fetchData();
        handleNewPost();
    }

    const handleUploadFile = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
          if (!validTypes.includes(selectedFile.type)) {
              alert('Vui lòng chọn file ảnh (jpg, jpeg, png)');
              return;
          }
          setPost({...post, image: selectedFile});
          setURLImage(URL.createObjectURL(selectedFile));
        }
      }

    const handleUpdatePost = async () => {
        console.log("image: ", post.image);
        console.log("URLImage: ", URLImage);
        
        if (!post.header || !content || !post.image) {
            alert('Vui lòng không để trống nội dung.')
            return;
        }
        await updatePostAPI({id: post.id, header: post.header, content: content, image: post.image, URLImage: URLImage});
        fetchData();
    }

    const handleDeletePost = async () => {
        if (!post.header || !content) {
            alert('Vui lòng không để trống nội dung.')
            return;
        }
        if (window.confirm("Bạn muốn xóa bài viết này?")) {
            await deletePostAPI({id: post.id, header: post.header, content: content});
            handleNewPost();
            fetchData();
        }
    }

    return (
        <>
            <div className="wrap-products">
                <div className="title_box">
                    <FontAwesomeIcon icon={faBook} />
                    <h2 className="products-title">Bài viết</h2>
                </div>

                <div className="wrap-post">
                    <div className="-w-post-left">
                        <h3>
                            <div><FontAwesomeIcon icon={faHeader} />
                            <p>Tiêu đề</p></div>
                            <input type="text" 
                                key={post?.id}
                                value={post?.header}
                                onChange={(e) => setPost({...post, header: e.target.value})}
                            />
                        </h3>
                        
                        <h3>
                            <div><FontAwesomeIcon icon={faPaperPlane} />
                            Nội dung</div>
                        </h3>

                        <div className="-w-post-content">
                            <p>
                                {<img src={ URLImage ? URLImage : `http://localhost:8080/api/posts/images/${post.image}`} />}
                                <input type="file" name="" id="" 
                                    hidden ref={fileInputRef} onChange={handleUploadFile} 
                                />
                                <div className="-upload-file-post" onClick={handleClickFileInput}>
                                    <FontAwesomeIcon icon={faUpload} />
                                    <p>UPLOAD FILE</p>
                                </div>
                            </p>
                            <div>
                                <ReactQuill
                                    key={quillKey}
                                    value={content}
                                    onChange={(value) => setContent(value)}
                                />
                            </div>
                        </div>

                        <div className="-w-post-button">
                            <button onClick={handleNewPost}>+ Làm mới</button>
                            <button onClick={handleAddPost}>Thêm mới</button>
                            <button onClick={handleUpdatePost}>Cập nhật</button>
                            <button onClick={handleDeletePost}>Xóa</button>
                        </div>
                    </div>

                    <div className={`-w-post-right ${openList ? 'open' : ''}`} ref={listRef}>
                        <h3>
                            <div><FontAwesomeIcon icon={faList} /></div>
                            <p>Danh sách</p>
                        </h3>

                        <div className="-w-post-list">
                            {posts.map(p => (
                                <div key={p.header} className="-w-post-sidebar-item" 
                                    onClick={() => handleClick(p.header)}
                                >
                                    <div><FontAwesomeIcon icon={faCaretRight} size="sm" /></div>
                                    <p>{p.header}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="-sidebar-icon" onClick={handleOpenList} style={{right: openList ? '-100%' : '0'}}>
                        <FontAwesomeIcon icon={faList} />
                    </div>
                </div>
            </div>
        </>
    )
}