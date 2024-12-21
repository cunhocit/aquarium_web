/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { addNewComment } from "../../app/api/comment";

export const Comment = ({data2, id}) => {
    const [comments, setComments] = useState();
    const [customers, setCustomers] = useState();
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const sort_ = data2?.comments?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setComments(sort_);
        setCustomers(data2?.customers);
    }, [data2]);

    const handleComment = async () => {
        if (!newComment) {
            alert("Bạn chưa đánh giá!")
            return;
        }
        await addNewComment(newComment, id);
        window.location.reload();
    }

    return (
        <>
            <div className="wrap-comment">
                <div className="-title-comment">
                    <FontAwesomeIcon icon={faComment} />
                    <p>Đánh giá sản phẩm</p>
                </div>
                <hr />
                <div className="-w-your-comment">
                    <div>
                        <textarea type="text" 
                            value={newComment}
                            onChange={ e => setNewComment(e.target.value) }
                        />
                        <button onClick={handleComment}>Gửi</button>
                    </div>
                </div>
                {comments?.length > 0 ? (
                    <div className="-around-comment">
                        {comments?.map( c => (
                            <div className="-wrap-object-comment" key={c.id}>
                                <img src={`http://localhost:8080/api/customers/images/${customers?.find(p => p.id === c.cus_id)?.image ? customers?.find(p => p.id === c.cus_id)?.image : 'image.png'}`} alt="" />
                                <div>
                                    <h3>{customers?.find(p => p.id === c.cus_id).name}</h3>
                                    <p className="-time-comment">{new Date(c.created_at).toLocaleDateString()}</p>
                                    <p className="-comment-content">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : 'Không có bình luận nào'}
            </div>
        </>
    )
}