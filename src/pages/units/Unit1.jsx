import React, {useState, useEffect} from 'react';

const pages = [
    (
        <>
            <h1>Unit 1</h1>
            <p>
                The Energy Price Gaurantee (EPG) is government initiative that limits the amount that customers can be charged oer unit of electrictiy and/or gas which was made effective in October 2022. This was done to reduce the amount of energy customers can be charged per unit of gas or electricity, to an annual equivalent of around £2,500 for a typical household in Great Britain.
                Under the EPG the average unit price for dual fuel customers paying by Direct Debit will be limited to 34.0p/kWh for gas, inclusive of VAT, from 1 October 2022. 
            </p>
            <p>
                For customers paying on receipt of their bill, this will be limited to 36.8kWh for electricity and 11.1p/kWh for gas, include of VAT, from 1 October 2022.
                The actual unit rate will vary by region, the discount is also applied specifically to the unit rate and does not limit the annual bill value. This means that households that use more energy will receive higher bills. In effect, the Energy Price Gaurantee will replace the October energy price cap of £3,549 that was confirmed by Ofgem
            </p>
        </>
    ),
    (
        <>
            <h1>Page 2</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </p>
            <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gAnBZFPFXkc" frameborder="0" allowfullscreen></iframe>
        </>
    ),
    (
        <>
            <h1>Page 3</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </p>
            <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gAnBZFPFXkc" frameborder="0" allowfullscreen></iframe>
        </>
    )
]

export default function Unit1(props) {
    const [pageIndex, setPageIndex] = useState(0);

    const previousPage = () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    }

    const nextPage = () => {
        if (pageIndex < pages.length) {
            setPageIndex(pageIndex + 1);
        }
    }

    return (
        <div className="article-container">
            <div className="unit-article">
                {pages[pageIndex]}
            </div>
            <div className="unit-nav-button-container">
                <div className="nav-button" onClick={previousPage}>&#8656;</div>
                <div className="nav-button" onClick={nextPage}>&#8658;</div>
            </div>
        </div>
    );
}