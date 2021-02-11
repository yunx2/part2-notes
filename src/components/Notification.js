import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null // render nothing to screen
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification;