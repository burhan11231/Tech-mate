'use client'

import {
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  Timestamp,
} from 'firebase/firestore'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth, db } from '@/lib/firebase'

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
      // 🔹 Logged out
      if (!authUser) {
        setUser(null)
        setIsLoading(false)
        return
      }

      try {
        const ref = doc(db, 'users', authUser.uid)
        const snap = await getDoc(ref)

        // ⏳ During signup, Firestore doc may not exist yet
        // DO NOT sign out, just wait
        if (!snap.exists()) {
          setIsLoading(true)
          return
        }

        const data = snap.data()

        // 🔐 HARD BLOCK: deactivated account
        if (data.isDisabled === true) {
          await signOut(auth)
          setUser(null)
          setIsLoading(false)
          return
        }

        // ✅ Valid active user
        setUser({
          uid: authUser.uid,
          name: data.name || authUser.displayName || 'User',
          email: data.email || authUser.email || '',
          phone: data.phone || '',
          role: data.role === 'admin' ? 'admin' : 'user',
          photoURL: data.photoURL || authUser.photoURL || null,
          providers: authUser.providerData.map(p => p.providerId),
          lastNameUpdatedAt: data.lastNameUpdatedAt,
        })
      } catch (err) {
        console.error('[AUTH_LOAD_ERROR]', err)
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