import React, { useState, useEffect } from 'react'
import BuysDetails from '../components/BuysDetails'

const BuysList = ({buys}) => {

    const nodes = buys.map(buy => {
        return <BuysDetails
        key={buy._id}
        buy={buy}
        />
    })

    return (
        <>
            <h2>I'm the Buys List</h2>
            <section id="buys">
                {nodes}
            </section>
            </>
    )
}

export default BuysList