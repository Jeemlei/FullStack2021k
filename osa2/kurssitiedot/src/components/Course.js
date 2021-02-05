import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
        </div>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>
    )
}

const Total = ({ parts }) => {
    return (
        <div>
            <b>total of {parts.reduce((sum, part) => { return (sum + part.exercises) }, 0)} exercises</b>
        </div>
    )
}

export default Course