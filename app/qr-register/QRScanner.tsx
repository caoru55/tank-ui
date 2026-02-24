'use client'

import { useEffect, useRef, useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { useTankStore } from '@/src/store/tankStore'
import { OPERATION_COLORS } from '@/src/store/operationTheme'
import { playBeep } from '@/src/store/playBeep'
import { UI } from '@/src/store/uiTheme'
import type { GPSLocation, TankOperation } from '@/src/store/determineTransition'

type QRScannerProps = {
  operation: TankOperation
}

const normalizeScanResult = (result: unknown): string | null => {
  if (typeof result === 'string') {
    const value = result.trim()
    return value.length > 0 ? value : null
  }

  if (Array.isArray(result) && result.length > 0) {
    const first = result[0] as { rawValue?: unknown }
    if (typeof first?.rawValue === 'string') {
      const value = first.rawValue.trim()
      return value.length > 0 ? value : null
    }
  }

  return null
}

export default function QRScannerPanel({ operation }: QRScannerProps) {
  const transitionStatus = useTankStore((s) => s.transitionStatus)
  const setLastScannedTank = useTankStore((s) => s.setLastScannedTank)
  const [gps, setGps] = useState<GPSLocation>(null)
  const [isCooldown, setIsCooldown] = useState(false)
  const cooldownRef = useRef(false)
  const clearTimerRef = useRef<number | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      () => setGps(null),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 8000 },
    )
  }, [])

  useEffect(() => {
    return () => {
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current)
      }
    }
  }, [])

  const handleScan = async (result: unknown) => {
    if (cooldownRef.current) return

    const tankNumber = normalizeScanResult(result)
    if (!tankNumber) return

    cooldownRef.current = true
    setIsCooldown(true)
    setLastScannedTank(tankNumber)

    await transitionStatus(tankNumber, operation, gps)

    const { errorMessage, lastTransition } = useTankStore.getState()

    if (errorMessage) {
      playBeep('error')
      navigator.vibrate?.(200)
    } else if (lastTransition && !lastTransition.isNormal) {
      playBeep('exception')
      navigator.vibrate?.([100, 50, 100])
    } else {
      playBeep('success')
      navigator.vibrate?.(50)
    }

    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current)
    }

    clearTimerRef.current = window.setTimeout(() => {
      cooldownRef.current = false
      setIsCooldown(false)
      setLastScannedTank(null)
    }, 800)
  }

  return (
    <div
      style={{
        border: `4px solid ${OPERATION_COLORS[operation]}`,
        borderRadius: UI.radius,
        padding: 6,
        boxShadow: UI.shadow,
        transition: `border-color ${UI.transition}`,
        background: '#fff',
      }}
    >
      <Scanner
        onScan={handleScan}
        onError={(err) => console.error(err)}
        constraints={{ facingMode: 'environment' }}
      />
      {isCooldown && <p style={{ marginTop: 10, color: '#666' }}>次のスキャンを準備中…</p>}
    </div>
  )
}