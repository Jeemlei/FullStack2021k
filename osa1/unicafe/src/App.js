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

const Statistic = ({ text, amount }) => {
  return (
    <p>{text} {amount}</p>
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
      <Title text="statistics" />
      <Statistic text="good" amount={good} />
      <Statistic text="neutral" amount={neutral} />
      <Statistic text="bad" amount={bad} />
    </div>
  )
}

export default App