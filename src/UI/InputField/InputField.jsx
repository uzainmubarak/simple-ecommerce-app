import * as React from 'react'

const InputField = React.forwardRef((props, ref) => {
    
    return (
        <div className='mt-3'>
            <label 
            className='
                text-red-900 
                font-semibold 
                w-full 
                text-left' 
            htmlFor={props.name}
            >
            {props.label}
            <span className='text-red-300 text-xs ml-1'>{props.option}</span>
            </label>
            <input
                className='py-2 px-4 mt-2 w-full border-2  border-solid  border-red-200 rounded-[5px] focus:outline-none focus:border-2 focus:border-solid focus:border-red-400 focus:bg-red-100 placeholder-red-300
                ease-in-out duration-300'
                {...props}
                ref={ref}
            />
        </div>
    )
})

export default InputField