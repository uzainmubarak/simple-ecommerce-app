import React from 'react'

const Error = ({errorMessage}) => {
    return (
      <p className="text-sm mt-1 text-red-600">            
        {errorMessage}
      </p>
    )
  }

export default Error