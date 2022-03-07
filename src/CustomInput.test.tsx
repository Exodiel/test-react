import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomInput from './CustomInput'

describe('When everything is OK', () => {
  test('should call the onChange callback handler when using the fireEvent function', () => {
    const onChange = jest.fn()
    render(
      <CustomInput value="" onChange={onChange}>
        Input:
      </CustomInput>
    )
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Luca' }
    })
    expect(onChange).toHaveBeenCalledTimes(1)
  })
  test('should call the onChange callback handler when using the userEvent API', async () => {
    const onChange = jest.fn()
    render(
      <CustomInput value="" onChange={onChange}>
        Input:
      </CustomInput>
    )
    userEvent.type(screen.getByRole('textbox'), 'David')
    expect(onChange).toHaveBeenCalledTimes(5)
  })
})
