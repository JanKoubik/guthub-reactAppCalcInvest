import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import "./Queriees.css";

const Calculator = () => {

    const initialFirstBasicMoney = Number(localStorage.getItem("firstBasicMoney") || 10000);
    const initialTimeOfYearInvesting = Number(localStorage.getItem("timeOfYearInvesting") || 1);
    const initialYearInterest = Number(localStorage.getItem("yearInterest") || 3);

    let [firstBasicMoney, setFirstBasicMoney] = useState(initialFirstBasicMoney)
    let [timeOfYearInvesting, setTimeOfYearInvesting] = useState(initialTimeOfYearInvesting)
    let [yearInterest, setYearInterest] = useState(initialYearInterest)
    let [onlyInterestMoney, setOnlyInterestMoney] = useState(0)
    let [yourMoney, setYourMoney] = useState(0)
    let [allMoneyTakeIt, setAllMoneyTakeIt] = useState(0)

    useEffect(() => {
        localStorage.setItem("firstBasicMoney", firstBasicMoney)
        localStorage.setItem("timeOfYearInvesting", timeOfYearInvesting)
        localStorage.setItem("yearInterest", yearInterest)

        let yearMoney = (firstBasicMoney / 100) * yearInterest
        let monthlyMoneyTakeIt = (yearMoney / 12) * timeOfYearInvesting
        let allMoneyTakeIt = monthlyMoneyTakeIt + firstBasicMoney

        setOnlyInterestMoney(monthlyMoneyTakeIt)
        setYourMoney(firstBasicMoney)
        setAllMoneyTakeIt(allMoneyTakeIt)


    },[firstBasicMoney, timeOfYearInvesting, yearInterest])

    const dataGraph = [
          {
            name: 'Celkové',
            Peníze: Math.round(allMoneyTakeIt)
          },
          {
            name: 'Vložené',
            Peníze: Math.round(yourMoney)
          },
          {
            name: 'Invest.',
            Peníze: Math.round(onlyInterestMoney)
          }
    ]

    return ( 
        <div className="calculator">
            <div className="calculator-place">
                <form className="calculator-form">
                    <label>Počáteční investovaná částka.
                        <input type="number" value={firstBasicMoney} onChange={(e) => setFirstBasicMoney(parseInt(e.target.value) || 0)}></input>
                    </label>
                    <label>Doba investování (měsíce).
                        <input type="number" value={timeOfYearInvesting} onChange={(e) => setTimeOfYearInvesting(parseInt(e.target.value) || 0)}></input>
                    </label>
                    <label>Roční úrok %.
                        <input type="number" value={yearInterest} onChange={(e) => setYearInterest(parseInt(e.target.value) || 0)}></input>
                    </label>
                </form>
            </div>

            <div className="calculator-endPointsPlace">
                <div className="calculator-endPointsPlace-bars">
                    <h2><span>Celkový výnos</span> {Math.round(allMoneyTakeIt)} Kč</h2>
                </div>
                <div className="calculator-endPointsPlace-bars">
                    <h2><span>Pouze investiční výnos</span> {Math.round(onlyInterestMoney)} Kč</h2>
                </div>
                <div className="calculator-endPointsPlace-bars">
                    <h2><span>Vložené vaše peníze</span> {yourMoney} Kč</h2>
                </div>
            </div>

            <div className="calculator-graph">
            <BarChart
          width={300}
          height={300}
          data={dataGraph}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          <Bar dataKey="Peníze" fill="#82ca9d" />
        </BarChart>
            </div>
        </div>
     );
}
 
export default Calculator;