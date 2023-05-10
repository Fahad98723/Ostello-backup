import { useEffect, useState } from 'react'
import { isEmpty } from '../../../../utils'

export const CustomInputField = ({
  name,
  description,
  className = '',
  disableState,
  required = false,
  ref,
  defaultValue,
  type = 'text',
  errorState = () => {},
  onChange = () => {},
}) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setValue(defaultValue)
  }, [])

  useEffect(() => {
    errorState(error, setError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const [isDisable] = disableState
  useEffect(() => {
    if (required && isEmpty(value)) {
      setError(`${name} is required`)
    } else {
      setError('')
    }
    // if (isEmpty(value)) {
    //   toast.error(name)
    // }

    if (name === 'Description (Paragraph1)') {
      
    }
  }, [value, required, name, defaultValue])

  return (
    <div className=' lg:py-2'>
      <div className=''>
        {error.length > 0 && !isDisable && (
          <span className='text-[#FF0000]'>{error}</span>
        )}
        <div
          className={` ${className} shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
            !isEmpty(error) && !isDisable && 'border-red'
          }`}
        >
          <h2 className=' mb-1' style={{ fontSize: '15px' }}>
            {name}
          </h2>

          {type === 'text' ? (
            <input
              ref={ref}
              type='text'
              placeholder={description}
              autoFocus
              className='text-xl bg-white  focus:outline-none w-full'
              defaultValue={!isEmpty(defaultValue) ? defaultValue : ''}
              disabled={isDisable}
              onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
              }}
            />
          ) : (
            type === 'textarea' && (
              <textarea
                ref={ref}
                type='text'
                placeholder={description}
                autoFocus
                className='text-xl bg-white  focus:outline-none w-full'
                defaultValue={!isEmpty(defaultValue) ? defaultValue : ''}
                disabled={isDisable}
                onChange={(e) => {
                  setValue(e.target.value)
                  onChange(e.target.value)
                }}
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}
