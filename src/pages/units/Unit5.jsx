import React from 'react';

export default function Unit5(props) {
    return (
        <div className="unit-container">
            <div className="unit-article">
                <h1>Unit 5</h1>
                <p>
                    The Energy Price Gaurantee (EPG) is government initiative that limits the amount that customers can be charged oer unit of electrictiy and/or gas which was made effective in October 2022. This was done to reduce the amount of energy customers can be charged per unit of gas or electricity, to an annual equivalent of around £2,500 for a typical household in Great Britain.
                    Under the EPG the average unit price for dual fuel customers paying by Direct Debit will be limited to 34.0p/kWh for gas, inclusive of VAT, from 1 October 2022. 
                </p>
                <p>
                    For customers paying on receipt of their bill, this will be limited to 36.8kWh for electricity and 11.1p/kWh for gas, include of VAT, from 1 October 2022.
                    The actual unit rate will vary by region, the discount is also applied specifically to the unit rate and does not limit the annual bill value. This means that households that use more energy will receive higher bills. In effect, the Energy Price Gaurantee will replace the October energy price cap of £3,549 that was confirmed by Ofgem
                </p>
            </div>
            <button onClick={props.togglePage}>Button</button>
        </div>
    );
}