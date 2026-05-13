import { beforeAll, expect, test, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

// Mocks
vi.mock('@/config/firebase', () => ({ app: {}, auth: {}, db: {} }))
vi.mock('firebase/auth', () => ({ signInWithEmailAndPassword: vi.fn() }))
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))
vi.mock('next/image', () => ({ default: (props: any) => <img {...props} /> }))
vi.mock('next/link', () => ({ default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a> }))
vi.mock('@/utils', () => ({ loginUser: vi.fn().mockResolvedValue(undefined) }))
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }))

import { AuthForm } from '@/components'
import { loginUser } from '@/utils'

beforeAll(() => {
    render(<AuthForm type={'login'} />)
})

/* Test for the simple rendering of the login authForm */
test('Test rendering login page', () => {
    expect(screen.getAllByText('Log in')).toBeDefined()
})

/* Test for all input validation in the login form */
test('Test all invalid input login form', async () => {
    fireEvent.submit(screen.getByRole('button', { name: 'Log in'}))
    await waitFor(() => {
        expect(screen.getByRole('paragraph', { name: 'error-message' })).toBeDefined()
    })
})

/* Test for invalid email validation in the login form */
test('Test invalid email input login form', async () => {
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    // Invalid email
    fireEvent.change(emailInput, { target: { value: 'FalseEmail' } })
    fireEvent.change(passwordInput, { target: { value: 'Password' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Log in'}))
    await waitFor(() => {
        expect(screen.getByRole('paragraph', { name: 'error-message' })).toBeDefined()
    })
})

/* Test for valid login in the form */
test('Test all valid input login form', async () => {
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    // Invalid email
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'Password' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Log in'}))
    await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
})

// Test for invalid login information
test('Test invalid information login', async () => {
    vi.mocked(loginUser).mockRejectedValueOnce(new Error('Invalid credentials'))
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    // Invalid email
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'Password' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Log in'}))
    await waitFor(() => {
        expect(screen.getByRole('paragraph', { name: 'error-message' })).toBeDefined()
    })
})