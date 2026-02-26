'use client'

import { useEffect, useState } from 'react'
import { useTankStore } from '@/src/store/tankStore'

export default function TankNumberBoom() {
  const tank = useTankStore((s) => s.lastScannedTank)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!tank) {
      return
    }

    const showTimer = window.setTimeout(() => setIsVisible(true), 0)
    const hideTimer = window.setTimeout(() => setIsVisible(false), 700)

    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
    }
  }, [tank])

  if (!tank) {
    return null
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 700ms ease-out',
        background: 'rgba(0, 0, 0, 0.55)',
        color: '#fff',
        fontSize: 42,
        fontWeight: 700,
        zIndex: 20,
        pointerEvents: 'none',
        borderRadius: 8,
        padding: '8px 14px',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {tank}
    </div>
  )
}