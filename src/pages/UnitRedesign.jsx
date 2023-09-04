import React, { useState, useEffect } from 'react';
import unitRedesignStyles from '../assets/styles/unit-redesign.module.css';

export default function UnitRedesign() {
    const [pageNumber, setPageNumber] = useState(0);
    const [dashboardPageNumber, setDashboardPageNumber] = useState(1);

    const pages = [
        (
            <div className={unitRedesignStyles['page-1']}>
                <h1>Focus Points</h1>
                <ul>
                    <li>Introduction to energy bills</li>
                    <li>Calculate my bill</li>
                    <li>Unit rate and standing charge </li>
                    <li>Measure of gas and electricity units</li>
                    <li>Scenarios</li>
                    <li>How is usage calculated</li>
                    <li>Estimated meter reads</li>
                </ul>
            </div>
        ),
        (
            <video controls>
                <source src="../../src/assets/videos/video1.mp4" type="video/mp4"/>
            </video>
        ),
        (   
            <div className={unitRedesignStyles['page-3']}>
                <div>
                    <h1>Calculating an energy bill</h1>
                    <p>Customers may not always understand their bill, remember that as experts it is our responsibility to explain it to them.</p>
                    <ul>
                        <li>Bills reflect P x Q</li>
                        <li>P = Price of energy, set by the energy provider</li>
                        <li>Q = Quantity of energy used, set by the customer</li>
                        <li>VAT for energy is charged at 5%, not 20%</li>
                    </ul>
                    <b><h3>Let's explore this customer's bill...</h3></b>
                </div>
                <img src="src\assets\images\Picture1.png" alt="" />
            </div>
        ),
        (
            <h1>Page 4</h1>
        )
    ];

    const dashboardPages = [
        (
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rhoncus nibh magna, eu semper erat hendrerit at. Vivamus eget dignissim diam, at suscipit nisl. Praesent egestas ullamcorper lobortis. Praesent eu porttitor mauris, ut semper nulla. Duis vel malesuada augue. Phasellus leo justo, tristique quis massa congue, congue semper nisl. Aenean posuere eros a nulla malesuada, a laoreet leo porta. Integer sed est orci. Morbi aliquam accumsan tempor. Nam facilisis tortor nibh, non ullamcorper leo sollicitudin et. Sed ut cursus velit. Aenean tempor felis tellus, ac porttitor sem molestie vitae. Duis sit amet rhoncus augue, sed condimentum justo. Donec eget venenatis lectus, id maximus nisl. Vivamus rutrum nulla eget ex commodo ullamcorper. Quisque maximus nulla nec neque tincidunt, accumsan sagittis dui ultricies.</p>
        ),
        (
            <textarea name="" id="" cols="150" rows="10"></textarea>
        )
    ]

    const prevPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    };

    const nextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    return (
        <div className={unitRedesignStyles['unit-container']}>
            <div className={unitRedesignStyles['unit-header']}>Outfox The Market Training Portal</div>
            <div className={unitRedesignStyles['unit-main']}>
                <div className={unitRedesignStyles['unit-main-column-1']}>
                    <div className={unitRedesignStyles['unit-main-page-container']}>
                        {pages[pageNumber]}
                        {pageNumber > 0 && (
                            <button 
                                className={unitRedesignStyles['unit-main-page-left-button']}
                                onClick={prevPage}    
                            >&#60;</button>
                        )}
                        {pageNumber < (pages.length - 1) && (
                            <button 
                                className={unitRedesignStyles['unit-main-page-right-button']}
                                onClick={nextPage}
                            >&#62;</button>
                        )}
                    </div>
                    <div className={unitRedesignStyles['unit-main-column-1-dashboard']}>
                        <div className={unitRedesignStyles['unit-main-column-1-dashboard-header']}>
                            <h3>Overview</h3>
                            <h3>Notes</h3>
                            <h3>Learning Tools</h3>
                        </div>
                        <div className={unitRedesignStyles['unit-main-column-1-dashboard-content']}>
                            {dashboardPages[dashboardPageNumber]}
                        </div>
                    </div>
                </div>
                <div className={unitRedesignStyles['unit-main-column-2']}>
                    <div className={unitRedesignStyles['unit-main-column-2-header']}>
                        <h2>Course Content</h2>
                        <h3>&#215;</h3>
                    </div>
                    <div className={unitRedesignStyles['unit-main-column-2-content']}>
                        <div className={unitRedesignStyles['unit-main-section']}>
                            <h3>Section 1 : Intro</h3>
                            <h5>21 min</h5>
                        </div>
                        <div className={unitRedesignStyles['unit-main-section']}>
                            <h3>Section 2 : The Energy Industry</h3>
                            <h5>24 min</h5>
                        </div>
                        <div className={unitRedesignStyles['unit-main-section']}>
                            <h3>Section 3 : Energy Bills</h3>
                            <h5>17 min</h5>
                        </div>
                        <div className={unitRedesignStyles['unit-main-section']}>
                            <h3>Section 4 : Energy Price Gaurantee</h3>
                            <h5>11 min</h5>
                        </div>
                        <div className={unitRedesignStyles['unit-main-section']}>
                            <h3>Section 5 : Metering</h3>
                            <h5>38 min</h5>
                        </div>
                        <div className={unitRedesignStyles['unit-main-section']}>
                            <h3>Section 6 : Energy Bills</h3>
                            <h5>15 min</h5>
                        </div>
                        <div className={unitRedesignStyles['unit-main-section']}>
                            <h3>Section 7 : Debt And Payment Plans</h3>
                            <h5>11 min</h5>
                        </div>
                        <div className={unitRedesignStyles['unit-main-section']}>
                            <h3>Section 8 : Fuel Direct</h3>
                            <h5>27 min</h5>
                        </div>
                        <div className={unitRedesignStyles['unit-main-section']}>
                            <h3>Section 9 : Complaints</h3>
                            <h5>25 min</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}