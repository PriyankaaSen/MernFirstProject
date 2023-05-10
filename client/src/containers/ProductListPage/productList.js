import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug, getAllProducts } from "../../actions/product.action";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import imgmbl from "../../images/samsung-galaxy-a50-sm-a505f-ds-2.jpg";
// import "./style1.css";
import { generatePublicUrl } from '../../urlConfig'


const ProductListPage = (props) => {
    const product = useSelector((state) => state.product);
    const location = useLocation();
    console.log("eee", product);
    // const navigate = useNavigate();
    // const match = useMatch();
    const { products } = useParams();
    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000
    });
    // console.log('ddd', products);

    const dispatch = useDispatch();

    useEffect(() => {
        // const {match} = props;

        dispatch(getProductsBySlug(location.pathname));
        dispatch(getAllProducts(location.pathname))
        console.log('jjj', product);
    }, []);


    return ( <
        Layout > {
            Object.keys(product.productsByPrice).map((key, index) => {
                return ( <
                    div className = "card" >
                    <
                    div className = "cardHeader" >
                    <
                    div > { props.match.params.slug }
                    Samsung mbl under { priceRange[key] } < /div> <
                    button type = "button" > view all < /button> <
                    /div> <
                    div style = {
                        { display: 'flex' } } > {
                        product.productsByPrice[key].map(product =>
                            <
                            div className = "productContainer" >
                            <
                            div className = "productImgContainer" >
                            <
                            img src = { generatePublicUrl(product.productPictures[0].img) }
                            alt = "" / >
                            <
                            /div> <
                            div className = "productInfo" >
                            <
                            div > { product.name } < /div> <
                            div >
                            <
                            span > 4.3 < /span> <
                            span > 33.33 < /span> <
                            /div> <
                            div className = "productPrice" > { product.price } < /div> <
                            /div> <
                            /div>
                        )
                    } <
                    /div> <
                    /div>
                );
            })
        } <
        /Layout>
    );
};

export default ProductListPage;