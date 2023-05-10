import React from 'react'

const InputField = ({
  label,
  inputState,
  placeholderText,
  className = '',
  errorState,
  type = 'text',
}) => {
  const [error, setError] = errorState
  const [inputValue, setInputValue] = inputState
  return (
    <div className='flex-col flex w-full my-4 transition-all'>
      {error.length > 0 && (
        <p className='w-full text-xs text-right text-[#FF0000]'>{error}</p>
      )}
      <div
        className={`${className} md:max-w-[416px] ${
          error.length !== 0 ? 'border-red' : 'border-light-gray'
        } first-letter:transition ease-in-out m-0`}
      >
        {type === 'textarea' ? (
          <div>
            <label htmlFor='first-name' className='block text-gray-500 pb-2'>
              {label}
            </label>
            <textarea
              id='w3review'
              name='w3review'
              rows='4'
              cols='50'
              required
              value={inputValue || ''}
              className='form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-[#D0D5DD]
              rounded-[10px]
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none'
              onChange={(e) => {
                e.preventDefault()
                setInputValue(e.target.value)
                setError('')
              }}
              placeholder={placeholderText}
            />{' '}
          </div>
        ) : (
          <div className='form-control'>
            <label htmlFor='first-name' className='block text-gray-500 pb-2'>
              {label}
            </label>
            <input
              type={`${type}`}
              className='
            block
            w-full
            px-3
            py-2
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-[#D0D5DD]
            rounded-[10px]
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"'
              value={inputValue || ''}
              onChange={(e) => {
                e.preventDefault()
                setInputValue(e.target.value)
                setError('')
              }}
              placeholder={placeholderText}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default InputField
