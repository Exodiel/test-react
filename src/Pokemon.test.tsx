import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import Pokemon from './Pokemon'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
describe('When the user enters a valid pokemon name', () => {
  test('should show the pokemon abilities', async () => {
    const abilities = [{
      ability: {
        name: 'test ability',
        url: 'https://ability.com/ability1'
      }
    },{
      ability: {
        name: 'test ability2',
        url: 'https://ability.com/ability2'
      }
    }]
    
    mockedAxios.get.mockResolvedValueOnce({ data: { abilities } })
    render(<Pokemon />)
    await userEvent.type(screen.getByRole('textbox'), 'pickachu')
    await userEvent.click(screen.getByRole('button'))
    const returnedAbilities = await screen.findAllByRole('listitem')
    expect(returnedAbilities).toHaveLength(2)
  })
})

describe('When the user enters an invalid pokemon name', () => {
  test('should show an error message in the screen', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error())
    render(<Pokemon />)
    await userEvent.type(screen.getByRole('textbox'), 'iadywq')
    await userEvent.click(screen.getByRole('button'))
    const message = await screen.findByText(/Something went wrong.../)
    expect(message).toBeInTheDocument()
  })
})