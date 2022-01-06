import { Contract } from 'ethers'
import React from 'react'

const ContractDetails = ({contractOptions, handleContractSelect}) => {


    return (
        <>
            <select defaultValue="" onChange={handleContractSelect}>
            <option value="" selected>Choose a Contract</option>
            {contractOptions}
        </select>
        </>
    )

}

export default ContractDetails;