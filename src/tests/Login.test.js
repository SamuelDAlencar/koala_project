import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Login', () => {
  it('Tests if the first page is the login page', () => {
    render(<App />)
    const loginText = screen.getByText('Login');
    expect(loginText).toBeInTheDocument();
  });

  it('Tests if there is a button with the text "Log In!"', () => {
    render(<App />)
    const loginButton = screen.getByRole('button', { name: 'Log In!' });
    expect(loginButton).toBeInTheDocument();
  });
  
  it('Tests if the Log In button starts disabled', () => {
    render(<App />)
    const loginButton = screen.getByRole('button', { name: 'Log In!' });
    expect(loginButton).toBeDisabled();
  });

  it('Tests if the Log In button activates when all inputs are valid', () => {
    render(<App />)
    userEvent.type(screen.getByTestId('email-input'), 'test@hotmail.com')
    userEvent.type(screen.getByTestId('password-input'), 'password')
    const loginButton = screen.getByRole('button', { name: 'Log In!' });
    expect(loginButton).toBeEnabled();
  });

  it('Tests if there is a button with the text "Create Account"', () => {
    render(<App />)
    const createAccButton = screen.getByRole('button', { name: 'Create account' });
    expect(createAccButton).toBeInTheDocument();
  });

  it('Tests if the Log In button redirects the user to the Home Page', () => {
    render(<App />)
    userEvent.type(screen.getByTestId('email-input'), 'test@hotmail.com')
    userEvent.type(screen.getByTestId('password-input'), 'password')
    const loginButton = screen.getByRole('button', { name: 'Log In!' });
    userEvent.click(loginButton);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
