import ShowPrd from "./show_prd";
import { useChangePrdForm } from "../../hooks/useForm";
import AddPrd from "./add_prd";

export default function Products () {
    const {isOpen, handleOpenForm} = useChangePrdForm();

    return (
    <>
        <div className="wrap-products">
            <h2 className="products-title">Sản phẩm</h2>
            
            <ShowPrd isOpen={isOpen} handleOpenAdd={handleOpenForm}/>
            <AddPrd isOpen={isOpen} backPrdForm={handleOpenForm}/>
        </div>
    </>
    )
}