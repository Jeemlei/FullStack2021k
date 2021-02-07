import React from 'react'

const Filter = ({ text, filter, setNewFilter }) => {

    const handleFilter = (event) => setNewFilter(event.target.value)

    return (
        <div>
            {text}
            <input
                value={filter}
                onChange={handleFilter}
            />
        </div>
    )
}

export default Filter