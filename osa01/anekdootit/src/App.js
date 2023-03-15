import React, { useState } from 'react'

const Title = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const AnecdoteDisplay = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const Button = ({ handler, text }) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

  const vote = () => {
    const copy = votes.concat()
    copy[selected] += 1
    setVotes(copy)
  }

  const random = () => Math.floor(Math.random() * Math.floor(anecdotes.length))
  const nextAnecdote = () => setSelected(random())

  const mostVotes = (voteArr) => {
    var max = voteArr[0]
    var maxIndex = 0
    for (var i = 1; i < voteArr.length; i++) {
      if (voteArr[i] > max) {
        maxIndex = i
        max = voteArr[i]
      }
    }
    return (
      maxIndex
    )
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <AnecdoteDisplay anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handler={vote} text="vote" />
      <Button handler={nextAnecdote} text="next anecdote" />
      <Title text="Anecdote with most votes" />
      <AnecdoteDisplay anecdote={anecdotes[mostVotes(votes)]} votes={votes[mostVotes(votes)]} />
    </div>
  )
}

export default App