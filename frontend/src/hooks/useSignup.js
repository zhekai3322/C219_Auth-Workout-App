import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Optionally, handle the response data if needed
      // const data = await response.json();
      // console.log(data);

      // Redirect to the desired page after successful sign-up
      navigate('/welcome'); // Replace '/welcome' with your target route

    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle the error (e.g., set an error state)
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};
