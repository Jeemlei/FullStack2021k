import React, { useState } from 'react'

const Title = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ handler, text }) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const StatsTable = ({ good, neutral, bad }) => {
  const all = () => good + neutral + bad
  const average = () => (good / all() + (-1 * bad) / all()).toFixed(1)
  const positive = () => (good / all() * 100).toFixed(1) + " %"

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all()} />
        <StatisticLine text="average" value={average()} />
        <StatisticLine text="positive" value={positive()} />
      </tbody>
    </table>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <Title text="statistics" />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Title text="statistics" />
      <StatsTable good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="give feedback" />
      <Button handler={() => setGood(good + 1)} text="good" />
      <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handler={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App