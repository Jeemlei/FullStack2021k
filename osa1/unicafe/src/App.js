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

const Statistic = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = () => good + neutral + bad
  const average = () => good / all() + (-1 * bad) / all()
  const positive = () => (good / all() * 100) + " %"

  return (
    <div>
      <Title text="statistics" />
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all()} />
      <Statistic text="average" value={average()} />
      <Statistic text="positive" value={positive()} />
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