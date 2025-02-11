import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label htmlFor="email">Email address:</label>
      <input 
        id="email"
        type="email" 
        placeholder="example@example.com"
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      
      <label htmlFor="password">Password:</label>
      <input 
        id="password"
        type="password" 
        placeholder="•••••••••"
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button type="submit" disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
