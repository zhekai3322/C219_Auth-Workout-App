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
        timeout: 10000, // 10s timeout
      })

      // Log the raw response text to debug
      const text = await response.text();  // Get raw response text
      console.log("Response Text:", text);  // Log to console to inspect

      if (text) {
        // If the response is not empty, try parsing it as JSON
        const json = JSON.parse(text);  // Safely parse the text response

        if (!response.ok) {
          setError(json.error || 'Something went wrong');
        } else {
          localStorage.setItem('user', JSON.stringify(json));
          dispatch({ type: 'LOGIN', payload: json });
        }
      } else {
        setError('No response from the server');
      }

    } catch (error) {
      console.error(error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return { signup, isLoading, error }
}
