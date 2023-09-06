import React, { useState, useEffect } from 'react';
import unitRedesignStyles from '../assets/styles/unit-redesign.module.css';

function Question1() {
    const [answerInput, setAnswerInput] = useState('');
    const [answerCorrect, setAnswerCorrect] = useState('');

    const handleInputChange = (event) => {
        setAnswerInput(event.target.value);
    };

    const checkAnswer = () => {
        if (answerInput === '165.51') {
            setAnswerCorrect(true);
        } else if (answerInput === '') {
            setAnswerCorrect('');
        } else {
            setAnswerCorrect(false);
        };
    };

    return (
        <div className={unitRedesignStyles['page-6']}>
            <h1>Question 1</h1>
            <p>
                Imagine a customer has been with us for 91 days and our current standing charge is
                27p/day. The customer has also used 783kwH of energy during this time, our unit rate
                is 18p/kWh. Calculate the customer's total cost (in £) during this time and enter it into the
                box below.
            </p>
            <input 
                type="text" 
                placeholder='Answer'
                value={answerInput}
                onChange={handleInputChange}
            />
            {answerCorrect === true ? (
                <button className={unitRedesignStyles['button-correct']}>Correct!</button>
            ) : answerCorrect === false ? (
                <button className={unitRedesignStyles['button-incorrect']} onClick={checkAnswer}>Incorrect, try again</button>
            ) : (
                <button className={unitRedesignStyles['button-neutral']} onClick={checkAnswer}>
                    Check Answer
                </button>
            )}
        </div>
    )
}

function Question2() {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const correctAnswer = 'kWh';

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    }

    return (
        <div className={unitRedesignStyles['page-7']}>
            <h1>Question 2</h1>
            <p>Which of these is a common unit for energy usage?</p>
            <button
                className={`${
                    selectedAnswer === 'mWh'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('mWh')}
            >
                mWh
            </button>
            <button
                className={`${
                    selectedAnswer === 'kWh'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('kWh')}
            >
                kWh
            </button>
            <button
                className={`${
                    selectedAnswer === 'gWh'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('gWh')}
            >
                gWh
            </button>
            <button
                className={`${
                    selectedAnswer === 'Wh'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('Wh')}
            >
                Wh
            </button>
        </div>
    )
}

function Question3() {
    const [answerInput, setAnswerInput] = useState('');
    const [answerCorrect, setAnswerCorrect] = useState('');

    const handleInputChange = (event) => {
        setAnswerInput(event.target.value);
    };

    const checkAnswer = () => {
        if (answerInput === '823') {
            setAnswerCorrect(true);
        } else if (answerInput === '') {
            setAnswerCorrect('');
        } else {
            setAnswerCorrect(false);
        };
    };

    return (
        <div className={unitRedesignStyles['page-9']}>
            <h1>Question 3</h1>
            <p>
                In this scenario the customer has been receiving their energy from this supplier
                for one year. The customer has consumed 5000kWh of electricity during this time.
                The standing charge of the supplier is 20p/day and the unit rate is 15p/kWh. The 5%
                VAT rate is already included in these rates. Calulate the customer's total cost for
                the year in £ and enter it into the box below.
            </p>
            <input 
                type="text" 
                placeholder='Answer'
                value={answerInput}
                onChange={handleInputChange}
            />
            {answerCorrect === true ? (
                <button className={unitRedesignStyles['button-correct']}>Correct!</button>
            ) : answerCorrect === false ? (
                <button className={unitRedesignStyles['button-incorrect']} onClick={checkAnswer}>Incorrect, try again</button>
            ) : (
                <button className={unitRedesignStyles['button-neutral']} onClick={checkAnswer}>
                    Check Answer
                </button>
            )}
        </div>
    )    
}

function Question4() {
    const [answerInput, setAnswerInput] = useState('');
    const [answerCorrect, setAnswerCorrect] = useState('');

    const handleInputChange = (event) => {
        setAnswerInput(event.target.value);
    };

    const checkAnswer = () => {
        if (answerInput === '1584.33') {
            setAnswerCorrect(true);
        } else if (answerInput === '') {
            setAnswerCorrect('');
        } else {
            setAnswerCorrect(false);
        };
    };

    return (
        <div className={unitRedesignStyles['page-10']}>
            <h1>Question 4</h1>
            <p>
                This customer has also been receiving energy from their supplier for one year. They have
                consumed 6500kWh of electricity and 13050kWh of gas. This supplier's standing charge is 22.1p/day
                for electricty and 23.4p/day for gas. The unit rate for electricity is 16.8p/kWh and 2.5p/kWh for
                gas. All rates include the 5% VAT rate. Calculate how much this customer spent in one year.
            </p>
            <input 
                type="text" 
                placeholder='Answer'
                value={answerInput}
                onChange={handleInputChange}
            />
            {answerCorrect === true ? (
                <button className={unitRedesignStyles['button-correct']}>Correct!</button>
            ) : answerCorrect === false ? (
                <button className={unitRedesignStyles['button-incorrect']} onClick={checkAnswer}>Incorrect, try again</button>
            ) : (
                <button className={unitRedesignStyles['button-neutral']} onClick={checkAnswer}>
                    Check Answer
                </button>
            )}
        </div>
    )    
}

function Question5() {
    const [answerInput, setAnswerInput] = useState('');
    const [answerCorrect, setAnswerCorrect] = useState('');

    const handleInputChange = (event) => {
        setAnswerInput(event.target.value);
    };

    const checkAnswer = () => {
        if (answerInput === '1272.75') {
            setAnswerCorrect(true);
        } else if (answerInput === '') {
            setAnswerCorrect('');
        } else {
            setAnswerCorrect(false);
        };
    };

    return (
        <div className={unitRedesignStyles['page-11']}>
            <h1>Question 5</h1>
            <p>
                This time, a customer has been receiving energy from their supplier for 239 days.
                They've consumed 5793kWh of electricity and 9847kWh of gas. The supplier's electricty
                standing charge is 17.17706p/day with a unit rate of 14.51791p/kWh. For gas the standing
                charge is 19.48624p/day and the unit rate is 2.879p/kWh. The rates above do not include
                the 5% VAT. How much does this customer spend in 239 days?
            </p>
            <input 
                type="text" 
                placeholder='Answer'
                value={answerInput}
                onChange={handleInputChange}
            />
            {answerCorrect === true ? (
                <button className={unitRedesignStyles['button-correct']}>Correct!</button>
            ) : answerCorrect === false ? (
                <button className={unitRedesignStyles['button-incorrect']} onClick={checkAnswer}>Incorrect, try again</button>
            ) : (
                <button className={unitRedesignStyles['button-neutral']} onClick={checkAnswer}>
                    Check Answer
                </button>
            )}
        </div>
    )    
}

function Question6() {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const correctAnswer = 'Estimated Annual Consumption';

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    }

    return (
        <div className={unitRedesignStyles['page-15']}>
            <h1>Question 6</h1>
            <p>Which of these does the acronym <i>EAC</i> stand for?</p>
            <button
                className={`${
                    selectedAnswer === 'Energy Assessment Certification'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('Energy Assessment Certification')}
            >
                Energy Assessment Certification
            </button>
            <button
                className={`${
                    selectedAnswer === 'Economic Annual Calculation'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('Economic Annual Calculation')}
            >
                Economic Annual Calculation
            </button>
            <button
                className={`${
                    selectedAnswer === 'Estimated Annual Consumption'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('Estimated Annual Consumption')}
            >
                Estimated Annual Consumption
            </button>
            <button
                className={`${
                    selectedAnswer === 'Expected Annual Consumption'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('Expected Annual Consumption')}
            >
                Expected Annual Consumption
            </button>
        </div>
    )
}

function Question7() {
    const [answerInput, setAnswerInput] = useState('');
    const [answerCorrect, setAnswerCorrect] = useState('');

    const handleInputChange = (event) => {
        setAnswerInput(event.target.value);
    };

    const checkAnswer = () => {
        if (answerInput === '357.4') {
            setAnswerCorrect(true);
        } else if (answerInput === '') {
            setAnswerCorrect('');
        } else {
            setAnswerCorrect(false);
        };
    };

    return (
        <div className={unitRedesignStyles['page-16']}>
            <h1>Question 7</h1>
            <p>
                Below is a table showing a customer's electricity usage from
                January to April. Calculate this customer's total energy consumption
                in kWh for February. 
            </p>
            <table>
                    <tr>
                        <th>Date</th>
                        <th>Meter Readings</th>
                    </tr>
                    <tr>
                        <td>2023-01-01</td>
                        <td>3568.4 kWh</td>
                    </tr>
                    <tr>
                        <td>2023-02-01</td>
                        <td>3801.2 kWh</td>
                    </tr>
                    <tr>
                        <td>2023-03-01</td>
                        <td>4158.6 kWh</td>
                    </tr>
                    <tr>
                        <td>2023-04-01</td>
                        <td>4390.1 kWh</td>
                    </tr>
                </table>
            <input 
                type="text" 
                placeholder='Answer'
                value={answerInput}
                onChange={handleInputChange}
            />
            {answerCorrect === true ? (
                <button className={unitRedesignStyles['button-correct']}>Correct!</button>
            ) : answerCorrect === false ? (
                <button className={unitRedesignStyles['button-incorrect']} onClick={checkAnswer}>Incorrect, try again</button>
            ) : (
                <button className={unitRedesignStyles['button-neutral']} onClick={checkAnswer}>
                    Check Answer
                </button>
            )}
        </div>
    )    
}

function Question8() {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const correctAnswer = '3100kWh';

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    }

    return (
        <div className={unitRedesignStyles['page-15']}>
            <h1>Question 8</h1>
            <p>
                According to OFGEM, what is the annual energy consumption
                of the average household in the United Kingdom?
            </p>
            <button
                className={`${
                    selectedAnswer === '4000kWh'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('4000kWh')}
            >
                4000kWh
            </button>
            <button
                className={`${
                    selectedAnswer === '2700kWh'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('2700kWh')}
            >
                2700kWh
            </button>
            <button
                className={`${
                    selectedAnswer === '3100kWh'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('3100kWh')}
            >
                3100kWh
            </button>
            <button
                className={`${
                    selectedAnswer === '3600kWh'
                        ? (selectedAnswer === correctAnswer ? unitRedesignStyles['button-correct'] : unitRedesignStyles['button-incorrect'])
                        : ''
                }`}
                onClick={() => handleAnswerClick('3600kWh')}
            >
                3600kWh
            </button>
        </div>
    )
}

export default function UnitRedesign() {
    const [pageNumber, setPageNumber] = useState(0);
    const [dashboardPageNumber, setDashboardPageNumber] = useState(0);

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
            <div className={unitRedesignStyles['page-4']}>
                <h1>Unit rate</h1>
                <p>The <b>unit rate</b> is the price-per-unit of the gas and electricity you consume in your household. For exmaple, electricity is measured in
                kilowatt hours (kWh), so a unit rate would be the cost per kWh used. Unit rates can vary depending on several reasons : </p>
                <ul>
                    <li>Your location</li>
                    <li>Your preferred payment method</li>
                    <li>Your energy tariff</li>
                </ul>
                <p>For example, a customer has used 300kWh of electricity and our unit rate is 16.5p/kWh. Using the Price x Quantity forumula
                    we can calculate their bill. <br /><br /> <b>16.5p x 300kWh = 4950p = £49.50</b>
                </p>
            </div>
        ),
        (
            <div className={unitRedesignStyles['page-5']}>
                <h1>Standing charge</h1>
                <p>A <b>standing charge</b> is a fixed daily amount that you must pay no matter how much energy you use.
                It even applies to properties that are empty for part of the year, like a holiday home. The charge coverd the cost
                of supplying the property with gas and electricity. It can thought of as a line rental for a mobile phone, but with energy instead.
                These costs include : 
                </p>
                <ul>
                    <li>Using and maintaining the networks, wires and pipes that carry gas and electricity
                        to customers' homes
                    </li>
                    <li>Keeping homes connected to the energy network</li>
                    <li>Carrying out meter readings</li>
                    <li>Payment towards government initiatives that help vulnerable households and reduce CO2 emissions</li>
                </ul>
                <p>
                    For example, a customer has been with a supplier for 30 days and the supplier's standing charge
                    is 21p/day. Using the Price x Quantity formula, <br /> <br /> <b>21p x 30days = 630p = £63</b>
                </p>
                <p>Now let's try a quick test</p>
            </div>
        ),
        (
            <Question1 /> 
        ),
        (
            <Question2 />
        ),
        (
            <div className={unitRedesignStyles['page-8']}>
                <div>
                    <h1>Measure of gas and electricity units</h1>
                    <p>
                        <b>Electrictity</b> meters record energy consumed in kilowatt hours while <b>gas</b> meters
                        record the volume of the gas consumed in cubic feet in the case of older meters or cubic meters
                        for newer models.
                    </p>
                    <p>
                        The calculations used to generate gas bills are prescribed in <b><i>The Gas (Calculation of Thermal Energy)
                        Regulations (SI 1996/439).</i></b> The Office of Gas and Electricity Markets it the energy regulator and has
                        responsibility for these refulations. Under this governence suppliers bill customers in kilowatt hours for both
                        gas and electricity.
                    </p>
                    <p>To convert the gas units from cubic meters to kilowatt hours we use this formula : </p>
                    <b>
                        <ul>
                            <li>Units Consumed (cubic meters)</li>
                            <li>x Volume Conversion Factor (1.0 for cubic meters)</li>
                            <li>x Volume Correction (1.02264 to account for temperature and pressure)</li>
                            <li>x Calorific Value (39.5 Joules per m³)</li>
                            <li>÷ 3600 (3600 seconds in each hour)</li>
                            <li>x 1000 (Number of Joules in a kilowatt hour)</li>
                            <li>= Number of kilowatt hours</li>
                        </ul>
                    </b>
                </div>
                <img src="src\assets\images\Picture2.png" alt="" />
            </div>
        ),
        (
            <Question3 />
        ),
        (
            <Question4 />
        ),
        (
            <Question5 />
        ),
        (
            <div className={unitRedesignStyles['page-12']}>
                <h1>How electricity usage is calculated</h1>
                <p>
                    Electricity usage is calculated from either <b>actual</b> meter readings
                    or <b>estimated</b> meter readings. Here is an example of some readings below : 
                </p>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Meter Readings</th>
                    </tr>
                    <tr>
                        <td>2023-09-01</td>
                        <td>1250.4 kWh</td>
                    </tr>
                    <tr>
                        <td>2023-10-01</td>
                        <td>1571.2 kWh</td>
                    </tr>
                    <tr>
                        <td>2023-11-01</td>
                        <td>1698.7 kWh</td>
                    </tr>
                    <tr>
                        <td>2023-12-01</td>
                        <td>2044.3 kWh</td>
                    </tr>
                </table>
                <p>
                    To find the customer's monthly consumption, simply subtract the previous month's
                    reading from this month's. So in this case for the month of November : <br /><br /><b>2044.3 - 1698.7 = 345.6kWh</b>
                </p>
            </div>            
        ),
        (
            <div className={unitRedesignStyles['page-13']}>
                <h1>How gas usage is calculated</h1>
                <p>
                    Gas usage is calculated from either <b>actual</b> meter readings
                    or <b>estimated</b> meter readings and requires a conversion from m³ or ft³ into kWh. 
                    Here is an example of some readings below : 
                </p>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Meter Readings</th>
                    </tr>
                    <tr>
                        <td>2022-01-01</td>
                        <td>5637.4m³</td>
                    </tr>
                    <tr>
                        <td>2022-02-01</td>
                        <td>5984.6m³</td>
                    </tr>
                    <tr>
                        <td>2023-03-01</td>
                        <td>6389.1m³</td>
                    </tr>
                </table>
                <p>
                    Again, to find the customer's monthly consumption, simply subtract the previous month's
                    reading from this month's. So in this case for the month of February : <br /><br /><b>6389.1 - 5984.6 = 404.5m³</b>
                </p>
                <p>
                    Then, we need to convert this from cubic meters into kilowatt hours : <br /><br />
                    <b>
                        Units Consumed (404.5m³) <br /> 
                        x Volume Conversion Factor (1.0) <br />
                        x Volume Correction (1.02264) <br />
                        x Calorific Value (39.5m³) <br />
                        ÷ Joules Conversion (3.6) <br />
                        = Total Usage In kWh (4538.75) <br />
                    </b>
                </p>
            </div>            
        ),
        (
            <div className={unitRedesignStyles['page-14']}>
                <h1>Estimated Meter Reads</h1>
                <p>
                    <b>How is an estimated meter reading calculated?</b>
                    <br />
                    The estimated meter reading is derived from a customer's
                    estimated annual consumption <b>(EAC)</b> and gas estimated
                    annual quantity <b>(AQ)</b>.
                </p>
                <p>
                    <b>The estimated annual consumption</b> is calculated by taking all
                    meter readings that will have been provided by the property over a
                    period of one year or more and the average usage per month is calculated
                    using this figure. The estimate for each meter is managed within a centralised
                    industry database.  
                </p>
                <p>
                    <i><b>Remember that the estimated readings can vary slightly from actual usage.</b></i>
                </p>
                <p>
                    Estimated annual consumption (EAC) helps an energy provider to predict how much a customer
                    should be paying each month by direct debit, accounting for advance payment and building
                    credit during the summer to compensate for higher bills during winter.
                </p>
                <p>
                    Accoring to The Office of Gas and Electricity Markets, the 'Average' home in the UK
                    uses <b>3100kWh of electricity</b> and <b>12,000kWh of gas</b> per year. 
                </p>
            </div>
        ),
        (
            <Question6 />
        ),
        (
            <Question7 />
        ),
        (
            <Question8 />
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
            </div>
        </div>
    )
}