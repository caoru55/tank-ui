'use client'

import { useEffect, useState } from 'react'
import { useTankStore } from '@/src/store/tankStore'
import { OPERATION_COLORS } from '@/src/store/operationTheme'
import type { TankOperation } from '@/src/store/determineTransition'

type FeedbackLayerProps = {
  operation: TankOperation
}

export default function FeedbackLayer({ operation }: FeedbackLayerProps) {
  const errorMessage = useTankStore((s) => s.errorMessage)
  const last = useTankStore((s) => s.lastTransition)
  const [effect, setEffect] = useState('')

  useEffect(() => {
    if (errorMessage) {
      setEffect('flash-error')
      return
    }

    if (last) {
      setEffect(last.isNormal ? 'flash-success' : 'flash-exception')
    }
  }, [errorMessage, last])

  useEffect(() => {
    if (!effect) return
    const timer = window.setTimeout(() => setEffect(''), 700)
    return () => window.clearTimeout(timer)
  }, [effect])

  return (
    <div
      className={effect}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        ['--op-color-light' as string]: `${OPERATION_COLORS[operation]}55`,
      }}
    />
  )
}