import React from 'react'
import Footer from '../../components/Footer/Footer'
import BuyerHeader from './BuyerHeader'

function BuyerFormLayout({children}) {
    return (
        <>
            <BuyerHeader />
                {children}
            <Footer />
        </>
    )
}

export default BuyerFormLayout
