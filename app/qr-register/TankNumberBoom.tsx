'use client'

import { useTankStore } from '@/src/store/tankStore'
import { OPERATION_COLORS, OPERATION_ICONS } from '@/src/store/operationTheme'
import { UI } from '@/src/store/uiTheme'
import type { TankOperation } from '@/src/store/determineTransition'

type TankNumberBoomProps = {
  operation: TankOperation
}

export default function TankNumberBoom({ operation }: TankNumberBoomProps) {
  const tank = useTankStore((s) => s.lastScannedTank)

  if (!tank) {
    return null
  }

  return (
    <div
      className="tank-boom"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `${OPERATION_COLORS[operation]}BB`,
        color: '#fff',
        fontSize: '56px',
        fontWeight: 700,
        zIndex: 20,
        pointerEvents: 'none',
        borderRadius: UI.radius,
        boxShadow: UI.shadow,
      }}
    >
      {OPERATION_ICONS[operation]} {tank}
    </div>
  )
}