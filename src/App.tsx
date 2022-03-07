import React from 'react'
import './App.css'
import { getUser, User } from './get-user'

function App() {
  const [text, setText] = React.useState('')
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value)
  }
  return (
    <div>
      {user ? <p>Username: {user.name}</p> : null}
      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>
      <p>You typed: {text ? text : '...'}</p>
    </div>
  )
}

interface CustomInputProps {
  children: React.ReactNode
  value: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
}

function CustomInput({ children, value, onChange }: CustomInputProps) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        placeholder="Example"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default App
