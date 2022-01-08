import React, { useState, useEffect } from 'react'
import BuyService from '../services/BuyService';
import FiltersContainer from './FiltersContainer';
import BuysList from '../components/BuysList';


const ArbiscanContainer = () => {

    const [buys, setBuys] = useState([])

    useEffect(() => {
        BuyService.getBuys()
            .then(buys => setBuys(buys));
    }, []);

    return (
        <>
            <h2>I'm the Arbiscan Container</h2>
            <FiltersContainer></FiltersContainer>
            <BuysList buys={buys}></BuysList>
        </>
    )
}

export default ArbiscanContainer