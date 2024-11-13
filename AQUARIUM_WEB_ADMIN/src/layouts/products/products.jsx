import ShowPrd from "./show_prd";
import { useChangePrdForm } from "../../hooks/useForm";
import AddPrd from "./add_prd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes } from "@fortawesome/free-solid-svg-icons";

export default function Products () {
    const {isOpen, handleOpenForm} = useChangePrdForm();

    return (
    <>
        <div className="wrap-products">
            <div className="title_box">
                <FontAwesomeIcon icon={faBoxes} />
                <h2 className="products-title">Sản phẩm</h2>
            </div>
            
            <ShowPrd isOpen={isOpen} handleOpenAdd={handleOpenForm}/>
            <AddPrd isOpen={isOpen} backPrdForm={handleOpenForm}/>
        </div>
    </>
    )
}