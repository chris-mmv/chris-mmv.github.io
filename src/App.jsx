import "./App.css";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const terms = ["15", "20", "30", "50"];
  const [term, setTerm] = useState("30");
  const [output, setOutput] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [schedule, setSchedule] = useState([]);

  const handleCalculateClick = () => {
    // alert('Button clicked');
    const monthlyPayment = calculate(balance, rate, term);

    if (!monthlyPayment) {
      setOutput("");
      setSchedule([]);
      return;
    }
    // setOutput(`$${monthlyPayment.toFixed(2)} is your payment`);
    setOutput(`$${formatMoney(monthlyPayment)} is your payment`);

    const amortizationSchedule = scheduleCalc(
      balance,
      rate,
      term,
      monthlyPayment,
    );
    setSchedule(amortizationSchedule);

    const totalInterest = amortizationSchedule.reduce(
      (sum, row) => sum + row.interest,
      0,
    );
    setTotalInterest(`Total interest paid: $${formatMoney(totalInterest)}`);
    // console.log('Calculate clicked', { balance, rate, term });
  };

  function calculate(balance, rate, term) {
    const principal = parseFloat(balance);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const totalPayments = parseInt(term) * 12;

    if (isNaN(principal) || isNaN(monthlyRate) || isNaN(totalPayments)) {
      return "";
    }

    if (monthlyRate === 0) {
      return principal / totalPayments;
    }

    return (
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)
    );
  }

  function scheduleCalc(balance, rate, term, monthlyPayment) {
    const principal = parseFloat(balance);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const totalPayments = parseInt(term) * 12;
    let balanceLeft = principal;
    let schedule = [];

    for (let i = 1; i <= totalPayments; i++) {
      const interestPayment = balanceLeft * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balanceLeft -= principalPayment;
      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: balanceLeft,
      });
    }

    return schedule;
  }

  function formatMoney(value) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <>
      <div className="page">
        <div className="card">
          <header className="header-group">
            <h1>Mortgage Calculator</h1>
            {/* <p>Calculate your monthly mortgage payments with ease.</p> */}
          </header>

          <section className="form">
            <section className="inputs-group">
              {/* balance input */}
              <label htmlFor="balance">Loan Balance</label>
              <input
                id="balance"
                data-testid="balance"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />

              {/* <br /> */}

              {/* rate input */}
              <label htmlFor="rate">Interest Rate (%)</label>
              <input
                id="rate"
                data-testid="rate"
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />

              {/* <br /> */}

              {/* term input */}
              <label htmlFor="term">Loan Term (years)</label>
              <select
                id="term"
                data-testid="term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              >
                {terms.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              {/* <br /> */}
            </section>

            <section className="button-group">
              {/* calculate button */}
              <button
                data-testid="submit"
                type="button"
                onClick={handleCalculateClick}
              >
                Calculate
              </button>
            </section>
          </section>

          <section className="results">
            <section className="output-group">
              {/* output */}
              <div id="output" data-testid="output">
                {output}
              </div>
              <div id="total-interest">{totalInterest}</div>
            </section>
          </section>

          {schedule.length > 0 && (
            <>
              <h2 className="table-title">Amortization Schedule</h2>
              <section className="table-section">
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Payment</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.month}</td>
                          <td>${formatMoney(entry.payment)}</td>
                          <td>${formatMoney(entry.principal)}</td>
                          <td>${formatMoney(entry.interest)}</td>
                          <td>${formatMoney(entry.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
