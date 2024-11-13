class INVESTMENTCALCULATIONS {
    constructor() {
        this.$calculatorContainer = document.querySelector("[component-wrapper='calculator']");
        this.$formElement = this.$calculatorContainer.querySelector("form");
        this.$initialCapitalInput = this.$calculatorContainer?.querySelector("[calculator-input='initial-capital']");
        this.$investmentRepeatInput = this.$calculatorContainer?.querySelector("[calculator-input='investment-repeat']");
        this.$investmentAmountInput = this.$calculatorContainer?.querySelector("[calculator-input='investment-amount']");
        this.$investmentPeriodInput = this.$calculatorContainer?.querySelector("[calculator-input='investment-period']");
        this.$annualReturnInput = this.$calculatorContainer?.querySelector("[calculator-input='annual-return']");

        this.$finalCapitalOutput = this.$calculatorContainer?.querySelectorAll("[calculator-output='final-capital']");
        this.$totalDepositOutput = this.$calculatorContainer?.querySelectorAll("[calculator-output='total-deposit']");
        this.$assetGrowthOutput = this.$calculatorContainer?.querySelectorAll("[calculator-output='asset-growth']");

        this.$investmentPeriodOutput = this.$calculatorContainer?.querySelector("[calculator-output='investment-period']");
        this.$investmentAmountOutput = this.$calculatorContainer?.querySelector("[calculator-output='investment-amount']");
        this.$annualReturnOutput = this.$calculatorContainer?.querySelector("[calculator-output='annual-return']");
        this.$chartOutput = this.$calculatorContainer?.querySelector("[calculator-output='chart']");

        // Set up intervals: weekly, monthly, quarterly, annually
        this.intervals = {
            'weekly': 52,
            'monthly': 12,
            'quarterly': 4,
            'annually': 1
        };

        this.inputValues = {
            quizCapital: 5000,
            quizSavings: 100,
            quizYears: 10,
            quizInterestRate: 5,
            quizPayoutInterval: 'weekly' 
        };

        this.init();
    }

    init() {
        this.removeFormSubmission();
        this.addDefaults();
        this.startListener();
        this.doCalculations();
    }

    removeFormSubmission(){
        this.$formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            evt.stopImmediatePropagation();
        });
    }

    addDefaults(){
        this.$initialCapitalInput.value = this.inputValues.quizCapital;
        this.$investmentAmountInput.value= this.inputValues.quizSavings;
        this.$investmentPeriodInput.value= this.inputValues.quizYears;
        this.$annualReturnInput.value= this.inputValues.quizInterestRate;
    }

    startListener() {
        this.$investmentRepeatInput.addEventListener("change", (evt) => {
            this.inputValues.quizPayoutInterval = evt.currentTarget.value;
            this.doCalculations();
        });
        this.$initialCapitalInput.addEventListener("input", (evt) => {
            this.inputValues.quizCapital = evt.currentTarget.value;
            this.doCalculations();
        });
        this.$investmentAmountInput.addEventListener("input", (evt) => {
            this.inputValues.quizSavings = evt.currentTarget.value;
            this.doCalculations();
        });
        this.$investmentPeriodInput.addEventListener("input", (evt) => {
            this.inputValues.quizYears = evt.currentTarget.value;
            this.doCalculations();
        });
        this.$annualReturnInput.addEventListener("input", (evt) => {
            this.inputValues.quizInterestRate = evt.currentTarget.value;
            this.doCalculations();
        });
    }

    checkWarning() {
        if (this.$initialCapitalInput.value.length === 0){
            this.$initialCapitalInput.reportValidity();
        }
        if (this.$investmentAmountInput.value.length === 0){
            this.$investmentAmountInput.reportValidity();
        }
        if (this.$investmentPeriodInput.value.length === 0){
            this.$investmentPeriodInput.reportValidity();
        }
        if (this.$annualReturnInput.value.length === 0){
            this.$annualReturnInput.reportValidity();
        }
    }

    doCalculations() {
        const { quizCapital, quizSavings, quizYears, quizInterestRate, quizPayoutInterval } = this.inputValues;
        this.checkWarning();
        if (!quizCapital || !quizSavings || !quizInterestRate || !quizYears) return;

        const periods = this.intervals[quizPayoutInterval] || 1;
        const savingPeriods = periods; // Assuming the savings interval is the same as the payout interval
        const r = +quizInterestRate / 100;
        const rnConstant = r / periods;

        let totalDepositsArray = [];
        let totalInterestReceivedArray = [];
        let totalFinalCapital = 0;

        for (let i = 0; i < quizYears; i++) {
            const t = i + 1;
            const ntVariable = periods * t;
            const { finalResult, totalDeposits, interestReceived } = this.compoundCalculator(rnConstant, ntVariable, +quizCapital, +quizSavings, t, periods, savingPeriods);
            totalDepositsArray.push(totalDeposits.toFixed(2));
            totalInterestReceivedArray.push(interestReceived.toFixed(2));

            if (i + 1 == quizYears) {
                totalFinalCapital = finalResult.toFixed(2);
            }
        }

        let totalDeposits = totalDepositsArray[totalDepositsArray.length - 1];
        let totalInterests = totalInterestReceivedArray[totalInterestReceivedArray.length - 1];

        this.drawDiagram(Array.from({ length: +quizYears }, (_, i) => i + 1), totalDepositsArray, totalInterestReceivedArray);
        this.updateResults(quizYears, quizPayoutInterval, quizSavings, quizInterestRate, totalFinalCapital, totalDeposits, totalInterests);
    }

    compoundCalculator = (rnConstant, ntVariable, capital, savings, years, periods, savingPeriods) => {
        // Initial capital compounded with chosen interval
        const compoundInterest = capital * Math.pow(1 + rnConstant, ntVariable);

        // Future value of periodic savings
        let futureValue = 0;
        if (savings > 0) {
            const ieq = Math.pow(1 + rnConstant, periods / savingPeriods) - 1; // Adjusted for different compounding and saving frequencies
            const innerFutureValue = (Math.pow(1 + ieq, savingPeriods * years) - 1) / ieq;

            futureValue = savings * innerFutureValue;
        }

        let finalResult = compoundInterest + futureValue;
        let totalDeposits = capital + (years * savings * savingPeriods); // Corrected for saving periods
        let interestReceived = finalResult - totalDeposits;

        return { finalResult, totalDeposits, interestReceived };
    };

    getFormattedNumber = (number, extraText = "") => {
        return number.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".") + extraText;
    };

    drawDiagram = (labels, dataZinsen, dataEinzahlungen) => {
        const text = document.location.hostname === 'en.moniflo.com' ? {
            interest: "Accumulated Interest",
            deposits: "Deposits",
            years: "Years",
            totalCapital: "Total capital"
        } : {
            interest: "Akkumulierte Zinsen",
            deposits: "Einlage",
            years: "Jahre",
            totalCapital: "Gesamtes Kapital"
        };
        
        const ctx = this.$chartOutput.querySelector("#results-diagram").getContext('2d');
        if (window.quizResultChart) window.quizResultChart.destroy();

        window.quizResultChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    { label: text.deposits, data:dataZinsen, backgroundColor: '#E3D87B', borderColor: '#E3D87B', pointRadius: 3, pointHoverRadius: 3 },
                    { label: text.interest, data: dataEinzahlungen, backgroundColor: '#024B51', borderColor: '#024B51' }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        align: 'start',
                        labels: { color: 'rgb(2, 75, 81)', usePointStyle: true, padding: 10, font: { size: 16, weight: 900 } },
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        grid: { display: false },
                        title: { display: false, text: text.years, align: 'start', font: { size: 16, weight: 900 }, color: '#024B51' }
                    },
                    y: {
                        position: 'right',
                        stacked: true,
                        grid:{color:"#E0E0E0"},
                        title: { display: true, text: text.totalCapital, font: { size: 16, weight: 900 }, color: '#024B51' }
                    }
                }
            }
        });
    };

    updateResults = (quizYears, quizPayoutInterval, quizSavings, quizInterestRate, totalFinalCapital, totalDeposits, totalInterests) => {
        const replacingStrings = {
            'year_length': quizYears,
            'payout_interval': quizPayoutInterval,
            'savings': this.getFormattedNumber(quizSavings),
            'interest_rate': quizInterestRate,
            'final_capital': this.getFormattedNumber(totalFinalCapital),
            'total_deposits': this.getFormattedNumber(totalDeposits),
            'payments': this.getFormattedNumber(totalInterests)
        };

        this.$investmentPeriodOutput.textContent = replacingStrings['year_length'];
        this.$investmentAmountOutput.textContent = replacingStrings['savings'];
        this.$finalCapitalOutput.forEach(el => el.textContent = replacingStrings['final_capital']);
        this.$totalDepositOutput.forEach(el => el.textContent = replacingStrings['total_deposits']);
        this.$assetGrowthOutput.forEach(el => el.textContent = replacingStrings['payments']);
        this.$annualReturnOutput.textContent = replacingStrings['interest_rate'];
    };
}

new INVESTMENTCALCULATIONS();
