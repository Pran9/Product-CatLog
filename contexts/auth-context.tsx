"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth"
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore"

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false)
      return
    }

    import("@/lib/firebase")
      .then(({ auth }) => {
        if (!auth) {
          setLoading(false)
          return
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              const db = getFirestore()
              const userRef = doc(db, "users", user.uid)

              // Save/update user profile in Firestore
              await setDoc(
                userRef,
                {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  lastLoginAt: serverTimestamp(),
                  createdAt: serverTimestamp(),
                },
                { merge: true }, // don't overwrite if user already exists
              )
            } catch (error) {
              console.error("Error saving user in Firestore:", error)
            }
          }
          setUser(user)
          setLoading(false)
        })

        return () => unsubscribe()
      })
      .catch(() => setLoading(false))
  }, [])

  const signInWithGoogle = async () => {
    if (typeof window === "undefined") return
    try {
      const { auth, googleProvider } = await import("@/lib/firebase")
      if (auth && googleProvider) {
        await signInWithPopup(auth, googleProvider)
      }
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  const signOut = async () => {
    if (typeof window === "undefined") return
    try {
      const { auth } = await import("@/lib/firebase")
      if (auth) {
        await firebaseSignOut(auth)
      }
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
