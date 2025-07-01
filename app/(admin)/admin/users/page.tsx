'use client'

import React, { useEffect, useState } from 'react'
import { apiFetch } from '@/app/utils/apiClient';


interface User {
  name: string
  email: string
  is_admin: boolean
}

type PasswordInputProps = {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  autoComplete: string
  show: boolean
  toggleShow: () => void
  minLength?: number
}

function PasswordInput({
  id,
  label,
  value,
  onChange,
  disabled,
  autoComplete,
  show,
  toggleShow,
  minLength,
}: PasswordInputProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="block font-medium mb-1">{label}</label>
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-2 border rounded pr-10"
        autoComplete={autoComplete}
        minLength={minLength}
        required
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute top-12 right-2 -translate-y-1/2 text-md text-gray-600 hover:text-gray-900"
        tabIndex={-1}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? '🙈' : '👁️'}
      </button>
    </div>
  )
}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Password reset form state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetError, setResetError] = useState<string | null>(null)
  const [resetSuccess, setResetSuccess] = useState<string | null>(null)
  const [resetLoading, setResetLoading] = useState(false)

  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      setError(null)

      try {
        const data = await apiFetch('/admin/user')
        setUser(data)
      } catch (err) {
        setError((err as Error).message)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  async function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault()
    setResetError(null)
    setResetSuccess(null)
    setResetLoading(true)

    if (newPassword !== confirmPassword) {
      setResetError('New password and confirmation do not match')
      setResetLoading(false)
      return
    }

    try {
      await apiFetch('/admin/password-reset', {
        method: 'POST',
        body: JSON.stringify({
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        }),
      })

      setResetSuccess('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setResetError((err as Error).message)
    } finally {
      setResetLoading(false)
    }
  }

  if (loading) return <div>Loading user info...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>
  if (!user) return <div>User is not logged in.</div>

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow space-y-6">
      <section>
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Admin:</strong> {user.is_admin ? 'Yes' : 'No'}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Change Password</h2>
        <form onSubmit={handlePasswordReset} className="space-y-4" noValidate>
          <PasswordInput
            id="currentPassword"
            label="Current Password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            disabled={resetLoading}
            autoComplete="current-password"
            show={showCurrentPassword}
            toggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
          />

          <PasswordInput
            id="newPassword"
            label="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            disabled={resetLoading}
            autoComplete="new-password"
            show={showNewPassword}
            toggleShow={() => setShowNewPassword(!showNewPassword)}
            minLength={8}
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            disabled={resetLoading}
            autoComplete="new-password"
            show={showConfirmPassword}
            toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            minLength={8}
          />

          {resetError && <p className="text-red-600">{resetError}</p>}
          {resetSuccess && <p className="text-green-600">{resetSuccess}</p>}

          <button
            type="submit"
            disabled={resetLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {resetLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </section>
    </div>
  )
}
