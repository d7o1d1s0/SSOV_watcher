import React, { useState, useEffect } from 'react'

const BuysDetails = ({buy}) => {

    return (
        <>
            <h2>I'm the Buys Details</h2>
            <div className="buy-info">
                <h3>{buy.hash}</h3>
            </div>
            </>
    )
}

export default BuysDetails