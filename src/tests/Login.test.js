import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Login', () => {
  
  it('Tests if the user is redirected to the Log In page when clicking the Login button', () => {
    render(<App />)
    const logInPageButton = screen.getByRole('button', { name: 'Login'});
    userEvent.click(logInPageButton);
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    expect(loginButton).toBeInTheDocument();
  });
  
  it('Tests if the Log In button starts disabled', () => {
    render(<App />)
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    expect(loginButton).toBeDisabled();
  });

  it('Tests if the Log In button activates when all inputs are valid', () => {
    render(<App />)
    userEvent.type(screen.getByTestId('email-input'), 'test@hotmail.com')
    userEvent.type(screen.getByTestId('password-input'), 'password')
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    expect(loginButton).toBeEnabled();
  });

  it('Tests if there is a button with the text "Create Account"', () => {
    render(<App />)
    const createAccButton = screen.getByRole('button', { name: 'Create account' });
    expect(createAccButton).toBeInTheDocument();
  });

  it('Tests if the Log In button only works when there is a user with the respective email', () => {
    render(<App />)
    localStorage.setItem('test@hotmail.com', JSON.stringify({
      email: 'test@hotmail.com',
      password: 'password',
    }))
    userEvent.type(screen.getByTestId('email-input'), 'test@hotmail.com')
    userEvent.type(screen.getByTestId('password-input'), 'password')
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    userEvent.click(loginButton);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
