import React from 'react'
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { generatePublicUrl } from '../../urlConfig'
import { Box, Typography, styled, Button, Divider } from '@mui/material';
import Countdown from 'react-countdown';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,

    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Component = styled(Box)`
margin-top:10px;
background:#ffffff;
`
const Deal = styled(Box)`
padding:15px 20px;
display:flex;
`
const Timer = styled(Box)`
display:flex;
margin-Left:10px;
align-items:center;
color:#7f7f7f;
`
const DeatText = styled(Typography)`
font-size:22px;
font-weight:600;
margin-right:25px;
`
const ViewButton = styled(Button)`
margin-left: auto;
background-color: #2874f0;
border-radius: 2px;
font-size: 13px;
font-weight:600;
`
const Image = styled('img')({
    width: 'auto',
    height: 150,
    display: 'none'
})

const Text = styled(Typography)`
font-size:14px;
margin-top: 10px;

`

const Slide = ({ product, title, timer }) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    const renderer = ({ hours, minutes, seconds }) => {
        return <Box variant="span">{hours} : {minutes} : {seconds} Left </Box>
    }

    return (
        <Component>
            <Deal>
                <DeatText>{title}</DeatText>
                {
                    timer &&
                    <Timer>
                        <img src={timerURL} alt="timer" style={{ width: "24px" }} />
                        <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                    </Timer>
                }
                <ViewButton variant="contained" color="primary">View All</ViewButton>
            </Deal>
            <Divider color="grey" />
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                centerMode={true}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
            >
                {product.products.findAllProduct ? product.products.findAllProduct.map((itemProduct) => {
                    return (
                        <div>
                            <Box textAlign="center" style={{ padding: '25px 15px' }}>
                                {
                                    itemProduct.productPictures?.map((pik, index) => (
                                        <Image className={`shop_${index}`} key={index} src={generatePublicUrl(pik.img)} alt="" />
                                    ))
                                }
                                <Text style={{ fontWeight: 600, color: '#212121' }}>{itemProduct.name.substring(0, 30)}</Text>
                            </Box>
                            {/* <h1>{image.Title}</h1> */}
                        </div>
                    );
                }) : <div />}

                {/* {
                    product.products.findAllProduct?.map(itemProduct => (
                        <>
                            <Box textAlign="center" style={{ padding: '25px 15px' }}>
                                {
                                    itemProduct.productPictures?.map((pik, index) => (
                                        <Image className={`shop_${index}`} key={index} src={generatePublicUrl(pik.img)} alt="" />
                                    ))
                                }
                                <Text style={{ fontWeight: 600, color: '#212121' }}>{itemProduct.name.substring(0, 30)}</Text>
                            </Box>
                        </>
                    ))
                } */}
            </Carousel>
        </Component>
    )
}

export default Slide