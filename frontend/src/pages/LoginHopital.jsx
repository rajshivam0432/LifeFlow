import React, { useState } from 'react';

function LoginHospital() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation for the sake of this example
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    // Call the login API here (this can be replaced with your API integration)
    // For now, we are just logging the credentials
    console.log('Hospital Login:', { email, password });

    // On successful login (assuming successful login is based on some condition)
    // Redirect or do further processing here
    setError('');
    alert('Login Successful');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-16">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">Hospital Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg text-lg hover:bg-red-600"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-red-500 hover:underline">
              Register as a Hospital
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginHospital;
