import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Page, MultipleChoiceQuestion, InputQuestion } from '../components/pageComponents';
import unitRedesignStyles from '../assets/styles/unit-redesign.module.css';

function ProgressBar({pageNumber, pages}) {
    const completionPercentage = (pageNumber / (pages.length - 1)) * 100;

    const progressBarStyle = {
        width: `${completionPercentage}%`
    }

    return (
        <div className={unitRedesignStyles['unit-progress-bar-container']}>
            <div 
                className={unitRedesignStyles['unit-progress-bar']}
                style={progressBarStyle}    
            >
            </div>
        </div>
    )
}

// Page Component

export default function UnitRedesign() {
    const [pageNumber, setPageNumber] = useState(0);
    const [dashboardPageNumber, setDashboardPageNumber] = useState(0);
    const [completedPages, setCompletedPages] = useState([]);

    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);

    const [dashboardStatus, setDashboardStatus] = useState('open');
    const [sidebarStatus, setSidebarStatus] = useState('open');

    const handleAnswerSelection = (pageId, answer) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [pageId]: answer,
        }));
    };

    const handleCorrectAnswerSelection = (pageId, correct) => {
        setCorrectAnswers((prevCorrectAnswers) => ({
            ...prevCorrectAnswers,
            [pageId]: correct
        }));

        if (correct) {
            setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
        }
    }


    const handlePageCompletion = (pageId) => {
        if (!completedPages.includes(pageId)) {
            setCompletedPages([...completedPages, pageId]);
        }
        console.log(completedPages);
    }

    const resetPage = () => {
        setPageNumber(0);
        setCompletedPages([]);
        setSelectedAnswers([]);
        setCorrectAnswers([]);
        setNumberOfCorrectAnswers(0);
    }

    const pages = [
        (
            <Page
                title="Key Points"
                list={
                    [
                        "Introduction to energy bills",
                        "Calculating bills",
                        "Unit rates and standing charges",
                        "Measure of gas and electricity units",
                        "Scenarios",
                        "How is usage calculated",
                        "Estimated meter reads"
                    ]
                }
                pageId={1}
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <Page 
                title="Calculating an energy bill"
                paragraph="Customers may not always understand their bill, so it is our responsibility as experts to explain it to them"
                list={
                    [
                        "Bills reflect P x Q",
                        "P = Price of energy, set by the energy provider",
                        "Q = Quantity of energy used, set by the customer",
                        "VAT for energy is charged at 5%"
                    ]
                }
                img="src\assets\images\Picture1.png"
                pageId={2}
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <Page   
                title="Unit Rate"
                paragraph="The unit rate is the price-per-unit of the gas and electricity you consume in your household. For exmaple, electricity is measured in
                kilowatt hours (kWh), so a unit rate would be the cost per kWh used. Unit rates can vary depending on several reasons : "
                list={
                    [
                        "Your location",
                        "Your preferred payment method",
                        "Your energy tariff"
                    ]
                }
                pageId={3}
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <Page 
                title="Standing Charge"
                paragraph="A is a fixed daily amount that you must pay no matter how much energy you use.
                It even applies to properties that are empty for part of the year, like a holiday home. The charge covers the cost
                of supplying the property with gas and electricity. It can thought of as a line rental for a mobile phone, but with energy instead.
                These costs include : "
                list={
                    [
                        "Using and maintaining the networks, wires and pipes that carry gas and electricity to customers' homes",
                        "Keeping homes connected to the energy network",
                        "Carrying out meter readings",
                        "Payment towards government initiatives that help vulnerable households and reduce CO2 emissions"
                    ]
                }
                pageId={4}
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <MultipleChoiceQuestion
                title="Question 1"
                question="Which of these is a common unit for energy usage?" 
                correctAnswer={"kWh"}
                pageId={5}
                selectedAnswers={selectedAnswers}
                answers={["mWh", "Wh", "kWh", "gWh"]}
                handleAnswerSelection={handleAnswerSelection}
                handleCorrectAnswerSelection={handleCorrectAnswerSelection}
                unitRedesignStyles={unitRedesignStyles}

            />
        ),
        (
            <InputQuestion
                title="Question 2"
                question="Calculate the customer's total cost to the nearest £"
                correctAnswer={"166"}
                selectedAnswers={selectedAnswers}
                scenario={
                    [
                        "A customer has been receiving energy for 91 days",
                        "They have consumed 783kWh of electricty",
                        "The standing charge is 27p/day",
                        "The unit rate for electricity is 18p/kWh",
                        "The 5% VAT tax rate is not included"
                    ]
                } 
                pageId={6}
                img="https://images.unsplash.com/photo-1413882353314-73389f63b6fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                handleAnswerSelection={handleAnswerSelection}
                handleCorrectAnswerSelection={handleCorrectAnswerSelection}
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <Page 
                title="Measure of gas and electricity units"
                paragraph="Electricity and gas meters measure the amount of energy used in homes. Suppliers then bills the customers in kilowatt
                hours for both electricty and gas. To convert gas units into kilowatt hours we follow the formula below : "
                list={
                    [
                        "Units consumed (cubic meters)",
                        "x Volume Conversion Factor (1.0 for cubic meters)",
                        "x Vome Correction (1.02264 to account for temperature and pressure)",
                        "x Calorific Value (39.5 Joules per m³)",
                        "÷ 3600 (3600 seconds in each hour)",
                        "÷ 1000 (Number of Joules in a kilowatt hour)",
                        "= Number of kilowatt hours"
                    ]
                }
                pageId={7}
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <InputQuestion
                title="Question 3"
                question="Calculate the customer's total cost to the nearest £"
                correctAnswer="823"
                selectedAnswers={selectedAnswers}
                scenario={
                    [
                        "A customer has been receiving energy for 1 year",
                        "They have consumed 5000kWh of electricty",
                        "The standing charge is 20p/day",
                        "The unit rate for electricity is 15p/kWh",
                        "All rates include the 5% VAT tax rate"
                    ]
                }
                pageId={8}
                img="https://images.pexels.com/photos/1495580/pexels-photo-1495580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                handleAnswerSelection={handleAnswerSelection}
                handleCorrectAnswerSelection={handleCorrectAnswerSelection}
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <InputQuestion
                title="Question 4"
                question="Calculate the customer's total cost to the nearest £"
                correctAnswer="1584"
                selectedAnswers={selectedAnswers}
                scenario={
                    [
                        "This customer has been receiving energy for 12 months",
                        "They have used 6500kWh of electricity",
                        "The standing charge is 22.1p/day",
                        "The unit rate is 16.8p/kWh",
                        "All rates include the 5% VAT tax rate"
                    ]
                }
                pageId={9}
                img="https://images.pexels.com/photos/1292464/pexels-photo-1292464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                handleAnswerSelection={handleAnswerSelection}
                handleCorrectAnswerSelection={handleCorrectAnswerSelection}
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <InputQuestion 
                title="Question 5"
                question="Calculate the customer's total cost to the nearest £"
                correctAnswer="1273"
                selectedAnswers={selectedAnswers}
                scenario={
                    [
                        "A customer has been receiving energy for 239 days",
                        "They've used a total of 9847kWh in gas",
                        "The standing charge for gas is 19.49p/day",
                        "The unit rate is 2.88p/kWh",
                        "These rates do not include the 5% VAT"
                    ]
                }
                pageId={10}
                img="https://images.pexels.com/photos/218445/pexels-photo-218445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                handleAnswerSelection={handleAnswerSelection}
                handleCorrectAnswerSelection={handleCorrectAnswerSelection}
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <Page 
                title="How electricity usage is calulcated"
                paragraph="Electricity usage is calculated from actual meter readings or estimated meter readings"
                table={
                    {
                        headers: ['Date', 'Meter Readings'],
                        rows: [
                            ['2023-09-01', '1250.4kWh'],
                            ['2023-10-01', '1571.2kWh'],
                            ['2023-11-01', '1698.7kWh'],
                            ['2023-12-01', '2044.3kWh']
                        ]
                    }
                }
                unitRedesignStyles={unitRedesignStyles}
            />         
        ),
        (
            <Page 
                title="How gas usage is calculated"
                paragraph="Gas usage is calculated from either <b>actual</b> meter readings
                or estimated meter readings and requires a conversion from m³ or ft³ into kWh. 
                Here is an example of some readings below : "
                table={
                    {
                        headers: ['Date', 'Meter Readings'],
                        rows: [
                            ['2022-01-01', '5637.4m³'],
                            ['2022-02-01', '5984.6m³'],
                            ['2022-03-01', '6389.1m³']
                        ]
                    }
                }
                unitRedesignStyles={unitRedesignStyles}
            />          
        ),
        (
            <Page 
                title="Estimated Meter Readings"
                paragraph="The estimated meter reading is derived from a customer's Estimated
                Annual Consumption (EAC) and Annual Quantity (AQ). The estimated annual consumption
                is calculated by taking all meter readings that will have been provided by the
                property over a period of a year or more and then the average usage per month is
                calculated using this figure"
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <MultipleChoiceQuestion
                title="Question 6"
                question="Which of these does the acronym EAC stand for?" 
                correctAnswer={"Estimated Annual Consumption"}
                pageId={11}
                selectedAnswers={selectedAnswers}
                answers={["Energy Assessment Certification", "Economic Annual Calculation", "Estimated Annual Consumption", "Expected Annual Consumption"]}
                handleAnswerSelection={handleAnswerSelection}
                handleCorrectAnswerSelection={handleCorrectAnswerSelection}
                unitRedesignStyles={unitRedesignStyles}

            />
        ),
        (
            <InputQuestion 
                title="Question 7"
                question="Calculate the customer's cost for January"
                correctAnswer=""
                selectedAnswers={selectedAnswers}
                table={
                    {
                        headers: ['Date', 'Meter Readings'],
                        rows: [
                            ['2023-01-01', '3568.4kWh'],
                            ['2023-02-01', '3801.2kWh'],
                            ['2023-03-01', '4158.6kWh'],
                            ['2023-04-01', '4390.1kWh']
                        ]
                    }
                }
                pageId={12}
                img="https://images.pexels.com/photos/218445/pexels-photo-218445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                handleAnswerSelection={handleAnswerSelection}
                handleCorrectAnswerSelection={handleCorrectAnswerSelection}
                unitRedesignStyles={unitRedesignStyles}
            />
        ),
        (
            <MultipleChoiceQuestion
                title="Question 8"
                question="What is the annual energy consumption of the average house in the United Kingdom?" 
                correctAnswer={"3100kWh"}
                pageId={13}
                selectedAnswers={selectedAnswers}
                answers={["4000kWh", "2700kWh", "3000kWh", "3100kWh"]}
                handleAnswerSelection={handleAnswerSelection}
                handleCorrectAnswerSelection={handleCorrectAnswerSelection}
                unitRedesignStyles={unitRedesignStyles}

            />
        ),
        (
            <div className={unitRedesignStyles['final-page']}>
                <h1>You've completed this unit! 🎉</h1>
                <h2>You scored {numberOfCorrectAnswers}/8</h2>
                <button><b>Click here to go onto the next unit</b></button>
                <button
                    className={unitRedesignStyles['reset-button']}
                    onClick={resetPage}
                >
                    <b>Try again?</b>
                </button>
            </div>
        )
    ];

    const dashboardPages = [
        (
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rhoncus nibh magna, eu semper erat hendrerit at. Vivamus eget dignissim diam, at suscipit nisl. Praesent egestas ullamcorper lobortis. Praesent eu porttitor mauris, ut semper nulla. Duis vel malesuada augue. Phasellus leo justo, tristique quis massa congue, congue semper nisl. Aenean posuere eros a nulla malesuada, a laoreet leo porta. Integer sed est orci. Morbi aliquam accumsan tempor. Nam facilisis tortor nibh, non ullamcorper leo sollicitudin et. Sed ut cursus velit. Aenean tempor felis tellus, ac porttitor sem molestie vitae. Duis sit amet rhoncus augue, sed condimentum justo. Donec eget venenatis lectus, id maximus nisl. Vivamus rutrum nulla eget ex commodo ullamcorper. Quisque maximus nulla nec neque tincidunt, accumsan sagittis dui ultricies.</p>
        ),
        (
            <textarea name="" id="" cols="150" rows="5"></textarea>
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

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); 
    const [username, setUsername] = useState('');
 
    // Fetch username
    useEffect(() => {
        async function fetchUsername() {
          try {
            const response = await axios.get('/check-username');
            setUsername(response.data.username);
          } catch (error) {
            console.error('Error fetching session status', error);
          }
        }
        fetchUsername();
    });

    // Update the user's logged in status when loading the application
    useEffect(() => {
        async function fetchLoginStatus() {
          try {
            const response = await axios.get('/check-auth');
            setIsLoggedIn(response.data.isLoggedIn)
          } catch (error) {
            console.error('Error fetching session status', error);
          }
        }
        fetchLoginStatus();
    });

    // Update the user's admin status when loading the application
    useEffect(() => {
        async function fetchAdminStatus() {
            try {
                const response = await axios.get('/check-admin');
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                console.error('Error fetching admin status:', error);
            }
        }
        fetchAdminStatus();
    })

        // Logout function
        const logout = async () => {
            try {
                await axios.post('/logout');
                setIsLoggedIn(false);
            } catch(error) {
                console.error('Error during logout:', error);
            }    
        }

    return (
        <div className={unitRedesignStyles['unit-container']}>
            <div className={unitRedesignStyles['unit-header']}>
                <Link to="/dashboard">Dashboard</Link>
                {isAdmin && <Link to="/admin">Admin</Link>}
                <Link to="/login" onClick={logout}>Logout</Link>
                <Link to="#">{username}</Link>
            </div>
            <div className={unitRedesignStyles['unit-main']}>
                <div className={unitRedesignStyles['unit-main-column-1']}>
                    <ProgressBar pageNumber={pageNumber} pages={pages}/>
                    <div className={`${
                        dashboardStatus === 'open'
                        ? unitRedesignStyles['unit-main-page-container']
                        : unitRedesignStyles['unit-main-page-container-full-height'] 
                    }`}>
                        {pages[pageNumber]}
                        {pageNumber > 0 && (
                            <button 
                                className={unitRedesignStyles['unit-main-page-left-button']}
                                onClick={prevPage}    
                            ><i class="fa-solid fa-arrow-left"></i></button>
                        )}
                        {pageNumber < (pages.length - 1) && (
                            <button 
                                className={unitRedesignStyles['unit-main-page-right-button']}
                                onClick={() => {
                                    handlePageCompletion(pageNumber);
                                    nextPage();
                                }}
                            ><i class="fa-solid fa-arrow-right"></i></button>
                        )}
                        {sidebarStatus === "closed" &&(
                            <button
                                className={unitRedesignStyles['expand-sidebar-button']}
                                onClick={() => setSidebarStatus('open')}
                            >
                                <i class="fa-solid fa-angle-left"></i>
                            </button>
                        )}
                        {dashboardStatus === "closed" &&(
                            <button
                                className={unitRedesignStyles['expand-dashboard-button']}
                                onClick={() => setDashboardStatus('open')}
                            >
                                <i class="fa-solid fa-angle-right"></i>
                            </button>
                        )}
                    </div>
                    {dashboardStatus === 'open' && (
                        <div className={unitRedesignStyles['unit-main-column-1-dashboard']}>
                            <div className={unitRedesignStyles['unit-main-column-1-dashboard-header']}>
                                <h3
                                    className={dashboardPageNumber === 0 && unitRedesignStyles['selected']}
                                    onClick={() => setDashboardPageNumber(0)}
                                >
                                    Overview
                                </h3>
                                <h3
                                    className={dashboardPageNumber === 1 && unitRedesignStyles['selected']}
                                    onClick={() => setDashboardPageNumber(1)}
                                >
                                    Notes
                                </h3>
                                <h3
                                    className={dashboardPageNumber === 2 && unitRedesignStyles['selected']}
                                    onClick={() => setDashboardPageNumber(2)}
                                >
                                    Learning Tools
                                </h3>
                                <h3
                                    className={dashboardPageNumber === 3 && unitRedesignStyles['selected']}
                                    onClick={() => setDashboardStatus('closed')}
                                >
                                    Close
                                </h3>
                            </div>
                            <div className={unitRedesignStyles['unit-main-column-1-dashboard-content']}>
                                {dashboardPages[dashboardPageNumber]}
                            </div>
                        </div>
                    )}
                    </div>
                    {sidebarStatus === 'open' && (
                        <div className={unitRedesignStyles['unit-main-column-2']}>
                            <div className={unitRedesignStyles['unit-main-column-2-header']}>
                                <h2>Course Content</h2>
                                <h3 onClick={() => setSidebarStatus('closed')}><i class="fa-solid fa-delete-left"></i></h3>
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
                                <div className={unitRedesignStyles['unit-main-section-selected']}>
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
                                    <h3>Section 6 : Customer Vulnerabilities</h3>
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
                    )}
            </div>
        </div>
    )
}