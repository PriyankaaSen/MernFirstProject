import React from 'react'

const Colors = ({ colors,deleteColor }) => {
    return (
        <div>
            {colors.length > 0 && <h5>colors list</h5>}
            {colors.length > 0 && <div className='flex flex-wrap'>
            <div className='row'>
                {colors.map(stylecolor => (
                    
                        <div key={stylecolor.id} className='col col-sm-2 col-md-1 col-lg-1'>
                            
                                <div className="p-2 rounded-circle cursor-pointer" style={{ background: stylecolor.color }} onClick={()=> deleteColor(stylecolor)}></div>
                                {/* <div className="w-[30px] h-[30px] rounded-full cursor-pointer" style={{ background: stylecolor}}></div> */}
                            
                        </div>

                    

                ))}</div>
            </div>}
        </div>
    )
}

export default Colors