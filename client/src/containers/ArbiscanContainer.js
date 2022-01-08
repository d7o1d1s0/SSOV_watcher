import React, { useState, useEffect } from 'react'
import BuyService from '../services/BuyService';
import BuysContainer from './BuysContainer';
import FiltersContainer from './FiltersContainer';


const ArbiscanContainer = () => {

    return (
        <>
            <h2>I'm the Arbiscan Container</h2>
            <FiltersContainer></FiltersContainer>
            <BuysContainer></BuysContainer>
            </>
    )
}

export default ArbiscanContainer