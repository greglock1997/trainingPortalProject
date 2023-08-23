import React, {useState, useEffect} from 'react';
import unit7Styles from '../../assets/styles/units/unit7.module.css';

const pages = [
    (
        <>
            <h1>Page 1</h1>
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

export default function Unit7(props) {
    const [pageIndex, setPageIndex] = useState(0);

    const previousPage = async () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    }

    const nextPage = async () => {
        if (pageIndex < (pages.length - 1)) {
            setPageIndex(pageIndex + 1);
        }
    }

    return (
        <div className={unit7Styles['article-container']}>
            <div className={unit7Styles['page-container']}>
                {pages[pageIndex]}
            </div>
            <div className={unit7Styles['page-nav-container']}>
                <div className={`${pageIndex > 0 ? unit7Styles['page-nav-button'] : unit7Styles['hidden']}`} onClick={previousPage}><i class="fa-solid fa-circle-left"></i></div>
                {pageIndex === (pages.length - 1) && <button className={unit7Styles['page-quiz-button']} onClick={props.togglePage}>Ready?</button>}
                <div className={`${pageIndex < (pages.length - 1) ? unit7Styles['page-nav-button'] : unit7Styles['hidden']}`} onClick={nextPage}><i class="fa-solid fa-circle-right"></i></div>
            </div>
        </div>
    );
}