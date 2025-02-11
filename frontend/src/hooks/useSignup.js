// import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'

// export const useSignup = () => {
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(null)
//   const { dispatch } = useAuthContext()

//   const signup = async (email, password) => {
//     setIsLoading(true)
//     setError(null)

//     const response = await fetch('/api/user/signup', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ email, password })
//     })
//     const json = await response.json()

//     if (!response.ok) {
//       setIsLoading(false)
//       setError(json.error)
//     }
//     if (response.ok) {
//       // save the user to local storage
//       localStorage.setItem('user', JSON.stringify(json))

//       // update the auth context
//       dispatch({type: 'LOGIN', payload: json})

//       // update loading state
//       setIsLoading(false)
//     }
//   }

//   return { signup, isLoading, error }
// }

import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        timeout: 10000 // 10s timeout
      })

      if (!response.ok) {
        const json = await response.json()
        setError(json.error)
      } else {
        const json = await response.json()
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({ type: 'LOGIN', payload: json })
      }
    } catch (error) {
      console.error(error)
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}