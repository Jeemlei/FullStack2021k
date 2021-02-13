import React from 'react'

const Filter = ({ filter, setNewFilter }) => {

    const handleFilter = (event) => setNewFilter(event.target.value)

    return (
        <div>
            <input
                value={filter}
                onChange={handleFilter}
            />
        </div>
    )
}

export default Filter