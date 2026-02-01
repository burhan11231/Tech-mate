'use client'

import {
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth, db } from '@/lib/firebase'
import toast from 'react-hot-toast'

/* ---------------- TYPES ---------------- */

export interface AppUser {
  uid: string
  name: string
  email: string
  phone: string
  role: 'user' | 'admin'
  photoURL: string | null
  providers: string[]
  lastNameUpdatedAt?: Timestamp
}

interface AuthContextType {
  user: AppUser | null
  isLoading: boolean
  logout: () => Promise<void>
}

/* ---------------- CONTEXT ---------------- */

const AuthContext = createContext<AuthContextType | null>(null)

/* ---------------- PROVIDER ---------------- */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        setUser(null)
        setIsLoading(false)
        return
      }

      try {
        const ref = doc(db, 'users', authUser.uid)
        let snap = await getDoc(ref)

        const intent =
          typeof window !== 'undefined'
            ? sessionStorage.getItem('auth_intent')
            : null

        const storedName =
          typeof window !== 'undefined'
            ? sessionStorage.getItem('signup_name')
            : null

        const isNewUser = !snap.exists()

        /* ---------- CREATE USER DOC IF MISSING ---------- */
        if (isNewUser) {
          await setDoc(ref, {
            uid: authUser.uid,
            name: storedName || authUser.displayName || 'User',
            email: authUser.email || '',
            phone: '',
            role: 'user',
            photoURL: authUser.photoURL || '',
            isDisabled: false,
            createdAt: serverTimestamp(),
          })

          snap = await getDoc(ref)
        }

        /* ---------- CLEAN TEMP STORAGE ---------- */
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('signup_name')
          sessionStorage.removeItem('auth_intent')
        }

        const data = snap.data()

        /* ---------- HARD BLOCK: DISABLED ACCOUNT ---------- */
        if (data?.isDisabled === true) {
          if (intent === 'signup') {
            toast.error(
              'Account is deactivated. Please log in to activate it.'
            )
          }

          await signOut(auth)
          setUser(null)
          setIsLoading(false)
          return
        }

        /* ---------- SET APP USER ---------- */
        setUser({
          uid: authUser.uid,
          name: data?.name || authUser.displayName || 'User',
          email: data?.email || authUser.email || '',
          phone: data?.phone || '',
          role: data?.role === 'admin' ? 'admin' : 'user',
          photoURL: data?.photoURL || authUser.photoURL || null,
          providers: authUser.providerData.map(p => p.providerId),
          lastNameUpdatedAt: data?.lastNameUpdatedAt,
        })

        /* ---------- GLOBAL SUCCESS TOAST ---------- */
        if (intent === 'signup') {
  toast.success(
    isNewUser
      ? 'Account created successfully'
      : 'Logged in successfully'
  )
}

if (intent === 'login') {
  toast.success('Logged in successfully')
}
      } catch (err) {
        console.error('[AUTH_CONTEXT_ERROR]', err)
        await signOut(auth)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    })

    return () => unsub()
  }, [])

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/* ---------------- HOOK ---------------- */

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}