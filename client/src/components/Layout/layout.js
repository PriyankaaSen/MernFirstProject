import React from 'react'
import Header from '../../components/Header/header'
import MenuHeader from '../../components/MenuHeader/menuheader'

const Layout = (props) => {
    return (
        <>
            <Header />
            <MenuHeader />
            {props.children}
        </>
    )
}

export default Layout
