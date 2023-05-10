import {Box, Pagination} from "@mui/material"
import { useEffect } from "react"
import Service from "../../Services"
import {getPaginationData} from "../../Services"

const pageSize = 3;

export default function AddingPagination(){
    useEffect(()=>{
        Service.getPaginationData().then(response => {
            console.log('res',response);
            
        })
    },[])
    return (
        <Box justifyContent={"center"} alignItems="center" display={"flex"}
        sx={{
            margin:"20px 0px"
        }}
        >
        <Pagination 
        count={5}
        />
        </Box>
    )
}