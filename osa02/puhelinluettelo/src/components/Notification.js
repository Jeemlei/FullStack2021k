import React from 'react'
import '../notification.css'

const Notification = ({ notification }) => {

    if (notification.text === null) {
        return null
    }

    return (
        <div className={notification.type}>
            {notification.text}
        </div>
    )
}

export default Notification