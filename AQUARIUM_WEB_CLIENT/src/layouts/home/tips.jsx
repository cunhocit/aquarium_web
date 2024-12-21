/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useGet3Posts } from "../../hooks/usePosts"
import { Link } from "react-router-dom";

export const Tips = ({slideTipsRef}) => {
    const {data, fetchData, isLoading} = useGet3Posts();
    if (isLoading) return <></>

    return (
        <>
            <section className="wrap-tips" ref={slideTipsRef}>
                <div className="tips">
                    <h1>Có thể bạn sẽ cần!</h1>
                    <ul className="tips-ul">
                        {data?.map( (e) => (
                            <li key={e.id}>
                                <div >
                                    <img className="tips-img" src={`http://localhost:8080/api/posts/images/${e.image}`} alt="" />
                                    <div className="tips-text">
                                        <h2>{e.header}</h2>
                                        {/* <p>{e.content}</p> */}
                                    </div>
                                </div>
                                <div className="nextPage_btn">
                                    <Link to={`/post/${e.id}`}> <p> Tìm hiểu <FontAwesomeIcon icon={faArrowRight} /> </p> </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}