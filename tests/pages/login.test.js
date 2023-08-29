import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../src/pages/Login.jsx';

describe('Login Component', () => {
  it('renders login form', () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('displays error message on invalid login', async () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'invalidUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText('User not recognised');
    expect(errorMessage).toBeInTheDocument();
  });
});
