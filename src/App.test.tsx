import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import App from './App'
import { getUser } from './get-user'

jest.mock('./get-user')
const mockedGetUser = mocked(getUser, true)

describe('When everything is OK', () => {
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<App />)
    await waitFor(() => expect(mockedGetUser).toHaveBeenCalled())
  })
  
  test('should select the children that is being passed to the CustomInput component', () => {
    expect(screen.getByText(/Input/)).toBeInTheDocument()
  })

  test('should select the input element by its role', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('should select a label element by its text', () => {
    expect(screen.getByLabelText('Input:')).toBeInTheDocument()
  })

  test('should select input element by placeholder text', () => {
    expect(screen.getByPlaceholderText('Example')).toBeInTheDocument()
  })

  test('should select the input element by its role by queryByRole', () => {
    const result = screen.queryByRole('textbox')
    expect(result).toBeInTheDocument()
  })
})

describe('When the component fetches the user successfully', () => {
  beforeEach(() => {
    mockedGetUser.mockClear()
  })

  test('should call getUser Once', async () => {
    render(<App />)
    await waitFor(() => expect(mockedGetUser).toHaveBeenCalledTimes(1))
  })

  test('should render the username passed', async () => {
    const name = 'Pepito'
    mockedGetUser.mockResolvedValueOnce({id: "1", name})
    render(<App />)
    expect(screen.queryByText(/Username/)).toBeNull()
    expect(await screen.findByText(/Username/)).toBeInTheDocument()
    expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument()
  })
})
