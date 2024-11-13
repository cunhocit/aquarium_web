import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowCutomers from "./show_custm";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Custumers () {
    return (
    <>
        <div className="wrap-customers">
            <div className="title_box">
                <FontAwesomeIcon icon={faUser} />
                <h2 className="products-title">Khách hàng</h2>
            </div>

            <ShowCutomers/>
        </div>
    </>
    )
}