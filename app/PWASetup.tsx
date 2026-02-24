'use client'

import { useEffect } from 'react'
import { sendQueuedMovements } from '@/src/store/offlineQueue'

export default function PWASetup() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return
    }

    navigator.serviceWorker.register('/sw.js').catch(() => undefined)

    const flushQueue = () => {
      void sendQueuedMovements().catch(() => undefined)
    }

    window.addEventListener('online', flushQueue)
    flushQueue()

    return () => {
      window.removeEventListener('online', flushQueue)
    }
  }, [])

  return null
}