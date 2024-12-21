/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ShowPrd from "./show_prd";
import AddPrd from "./add_prd_layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../hooks/useProducts";

export default function ProductsLayout () {
    return (
    <>
        <div className="wrap-products">
            <div className="title_box">
                <FontAwesomeIcon icon={faBoxes} />
                <h2 className="products-title">Sản phẩm</h2>
            </div>
            
            <ShowPrd /> 
        </div>
    </>
    )
}