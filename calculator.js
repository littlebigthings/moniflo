let year_length_elm = document.querySelector("[data-show='year_length']"),
    payout_interval_elm = document.querySelector("[data-show='payout_interval']"),
    savings_elm = document.querySelector("[data-show='savings']"),
    interest_rate_elm = document.querySelector("[data-show='interest_rate']"),
    final_capital_elm = document.querySelector("[data-show='final_capital']"),
    total_deposits_elm = document.querySelector("[data-show='total_deposits']"),
    payments_elm = document.querySelector("[data-show='payments']");

let inputFields = {
    quizCapital: document.getElementById('quiz-capital'),
    quizSavings: document.getElementById('quiz-savings'),
    quizSavingsInterval: document.getElementById('quiz-savings-interval'),
    quizYears: document.getElementById('quiz-investment'),
    quizInterestRate: document.getElementById('quiz-interest-rate'),
    quizPayoutInterval: document.getElementById('quiz-payout-interval'),
    quizPayoutInterval: 1
}

document.getElementById('quiz-submit-results').addEventListener('click', function () {
    let preventSubmit = false
    for (field in inputFields) {
        if (field == 'quizPayoutInterval' || field == 'quizSavingsInterval') {
            continue;
        }
        if (!inputFields[field].value || isNaN(inputFields[field].value)) {
            inputFields[field].style.outline = '1px solid red';
            preventSubmit = true
        } else {
            inputFields[field].style.outline = 'none'
        }
    }

    if (preventSubmit) {
        return;
    }
    const { quizCapital, quizSavings, quizSavingsInterval, quizYears, quizInterestRate, quizPayoutInterval } = inputFields
    let periods = 0
    switch (quizPayoutInterval.value) {
        case 'wöchentlich':
            periods = 52
            break;
        case 'monatlich':
            periods = 12
            break;
        case 'quartalsweise':
            periods = 4
            break;
        case 'jährlich':
            periods = 1
            break;
        default:
            periods = 1
    }

    let savingPeriods = 0
    switch (quizSavingsInterval.value) {
        case 'wöchentlich':
            savingPeriods = 52
            break;
        case 'monatlich':
            savingPeriods = 12
            break;
        case 'quartalsweise':
            savingPeriods = 4
            break;
        case 'jährlich':
            savingPeriods = 1
            break;
        default:
            savingPeriods = 1
    }
    const n = periods
    const r = +quizInterestRate.value / 100
    const rnConstant = r / n
    let totalDepositsArray = []
    let totalInterestReceivedArray = []
    let totalFinalCapital = 0
    for (let i = 0; i < quizYears.value; i++) {
        const t = (i + 1)
        const ntVariable = n * t
        const { finalResult, totalDeposits, interestReceived } = compoundCalculator(rnConstant, ntVariable, +quizCapital.value, +quizSavings.value, i + 1, periods, savingPeriods)
        totalDepositsArray.push(totalDeposits.toFixed(2))
        totalInterestReceivedArray.push(interestReceived.toFixed(2))

        if (i + 1 == quizYears.value) {
            totalFinalCapital = finalResult.toFixed(2)
        }
    }

    let totalDeposits = totalDepositsArray[totalDepositsArray.length - 1]
    let totalInterests = totalInterestReceivedArray[totalInterestReceivedArray.length - 1]

    drawDiagram(
        Array.from({ length: +quizYears.value }, (_, i) => i + 1),
        totalDepositsArray,
        totalInterestReceivedArray
    )


    const replacingStrings = {
        'year_length': quizYears.value,
        'payout_interval': quizPayoutInterval.value,
        'savings': getFormattedNumber(quizSavings.value),
        'interest_rate': quizInterestRate.value,
        'final_capital': getFormattedNumber(totalFinalCapital),
        'total_deposits': getFormattedNumber(totalDeposits),
        'payments': getFormattedNumber(totalInterests)
    }

    year_length_elm.textContent = replacingStrings['year_length'];
    payout_interval_elm.textContent = replacingStrings['payout_interval'];
    savings_elm.textContent = replacingStrings['savings'] + "€";
    interest_rate_elm.textContent = replacingStrings['interest_rate'] + "%";
    final_capital_elm.textContent = replacingStrings['final_capital'] + "€";
    total_deposits_elm.textContent = replacingStrings['total_deposits'] + "€";
    payments_elm.textContent = replacingStrings['payments'] + "€";

    document.getElementById('result-final-capital').innerHTML = getFormattedNumber(totalFinalCapital, '€')
    document.getElementById('result-total-deposits').innerHTML = getFormattedNumber(totalDeposits, '€')
    document.getElementById('interests-payments-received').innerHTML = getFormattedNumber(totalInterests, '€')

    let data = { height: document.getElementById("quiz-wrapper").scrollHeight }
    window.top.postMessage(data, '*')
})
window.onresize = function (event) {
    let data = { height: document.getElementById("quiz-wrapper").scrollHeight }
    window.top.postMessage(data, '*')
}
window.onload = function (event) {
    let data = { height: document.getElementById("quiz-wrapper").scrollHeight }
    window.top.postMessage(data, '*')
}

const compoundCalculator = (rnConstant, ntVariable, capital, savings, years, periods, savingPeriods) => {
    const compoundInterest = capital * (Math.pow(1 + rnConstant, ntVariable))

    let futureValue = 0
    if (savings > 0) {
        const ieq = Math.pow(1 + rnConstant, periods / savingPeriods) - 1 // line 20
        const innerFutureValue = (Math.pow(1 + ieq, savingPeriods * years) - 1) / ieq // line 14

        futureValue = savings * innerFutureValue
    }
    let finalResult = compoundInterest + futureValue
    let totalDeposits = capital + (years * savings * savingPeriods)
    let interestReceived = finalResult - totalDeposits

    return {
        finalResult,
        totalDeposits,
        interestReceived
    }
}

const getFormattedNumber = (number, extraText = "") => {
    return number.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".") + extraText
}

const drawDiagram = (labels, dataZinsen, dataEinzahlungen) => {
    let ZinsenFinalText,
        EinzahFinalText,
        GesamtkapitalFinalText,
        JahreFinalText;

    let currentURL = document.location.hostname;
    if (currentURL === 'en.moniflo.com') {
        ZinsenFinalText = "Interest charges",
            EinzahFinalText = "Deposits",
            JahreFinalText = "Years",
            GesamtkapitalFinalText = "Total capital";
    } else if (currentURL != 'en.moniflo.com') {
        ZinsenFinalText = "Zinsen",
            EinzahFinalText = "Einzahlungen",
            GesamtkapitalFinalText = "Gesamtkapital",
            JahreFinalText = "Jahre";
    }
    const ctx = document.getElementById('results-diagram').getContext('2d');

    if (typeof (quizResultChart) !== 'undefined') {
        quizResultChart.destroy()
    }
    const data = {
        labels: labels,
        borderColor: 'red',
        datasets: [
            {
                label: EinzahFinalText,
                data: dataZinsen,
                backgroundColor: [
                    '#024B51'
                ],
            },
            {
                label: ZinsenFinalText,
                data: dataEinzahlungen,
                backgroundColor: [
                    '#F2D79B'
                ],
            },
        ]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: false,
                },
                legend: {
                    align: 'start',
                    labels: {
                        color: 'rgb(2, 75, 81)',
                        usePointStyle: true,
                        padding: 10,
                        font: {
                            size: 16,
                            weight: 900,
                        },
                    },
                    title: {
                        color: 'rgb(2, 75, 81)',
                        font: {
                            size: 21
                        },
                        display: false,
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: JahreFinalText,
                        align: 'start',
                        font: {
                            size: 16,
                            weight: 900
                        },
                        color: '#024B51',

                    }
                },
                y: {
                    position: 'right',
                    stacked: true,
                    title: {
                        display: true,
                        text: GesamtkapitalFinalText,
                        font: {
                            size: 16,
                            weight: 900
                        },
                        color: '#024B51',

                    }
                }
            },
        }
    };

    window.quizResultChart = new Chart(ctx, config);

    document.getElementById('results-block').style.display = 'block'
}