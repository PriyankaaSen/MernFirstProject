import { getProducts } from "../actions/product.action";
import { useSelector} from "react-redux";


const Page = () => {
    const product = useSelector((state) => state.product);
    console.log('ppp',product);

}
const Service = {
    getPaginationData: () => {
        return new Promise((resolve, reject) => {
            resolve({
                count:getProducts.length,
                data:getProducts
            })
            
        })
    }
    
}

export default Service