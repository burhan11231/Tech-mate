'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

interface SignupForm {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export default function SignupPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  /* 🔒 LOCK BACKGROUND SCROLL */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  /* ✅ Redirect ONLY when auth context is ready */
  useEffect(() => {
  if (user) {
    router.replace('/')
  }
}, [user, router])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError(null)
    }
  }

  /* ================= EMAIL SIGNUP ================= */

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      setPasswordError('Passwords do not match')
      toast.error('Passwords do not match')
      return
    }

    if (form.password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      const user = cred.user

      await updateProfile(user, { displayName: form.name })

      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)

      if (!snap.exists()) {
        await setDoc(ref, {
          uid: user.uid,
          name: form.name,
          email: form.email,
          phone: form.phone || '',
          role: 'user',
          photoURL: '',
          isDisabled: false,
          createdAt: serverTimestamp(),
        })
      }

      toast.success('Account created successfully')
      // ❌ Do NOT redirect here
    } catch (err: any) {
      console.error(err)
      toast.error('Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  /* ================= GOOGLE SIGNUP ================= */

  const handleGoogleSignup = async () => {
  setLoading(true)

  try {
    const result = await signInWithPopup(
      auth,
      new GoogleAuthProvider()
    )

    // 🔐 If user exists, signup/login is SUCCESS
    if (result?.user) {
      toast.success('Account created successfully')
      return // ⛔ IMPORTANT: stop here
    }

    // fallback (rare)
    toast.error('Google signup failed')
  } catch (err: any) {
    console.error('[GOOGLE_SIGNUP_ERROR]', err)

    // ❗ Ignore abort/navigation related errors
    if (
      err?.code === 'auth/popup-closed-by-user' ||
      err?.code === 'auth/cancelled-popup-request'
    ) {
      return
    }

    toast.error('Google signup failed')
  } finally {
    setLoading(false)
  }
}

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-full flex justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-auto">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Create your account
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Join TECHMATE to connect with us
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-4">

            <input
              name="name"
              placeholder="Full name"
              required
              onChange={onChange}
              className="input-field"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={onChange}
              className="input-field"
            />

            <input
              name="phone"
              placeholder="Phone (optional)"
              onChange={onChange}
              className="input-field"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                onChange={onChange}
                className={`input-field pr-10 ${
                  passwordError ? 'border-red-500 focus:border-red-500' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                required
                onChange={onChange}
                className={`input-field pr-10 ${
                  passwordError ? 'border-red-500 focus:border-red-500' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {passwordError && (
              <p className="text-sm text-red-600 font-medium">
                {passwordError}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full h-11 rounded-lg bg-gray-900 text-white font-semibold disabled:opacity-50"
            >
              {loading ? 'Creating…' : 'Create account'}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* GOOGLE */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full h-11 border rounded-lg font-semibold flex items-center justify-center gap-3 hover:bg-gray-50"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* FOOTER */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue-600">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}