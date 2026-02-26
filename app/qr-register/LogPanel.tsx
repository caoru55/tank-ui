'use client'

import { useTankStore } from '@/src/store/tankStore'
import { UI } from '@/src/store/uiTheme'

export default function LogPanel() {
  const scannedTanks = useTankStore((s) => s.scannedTanks)

  const sorted = [...scannedTanks].sort((a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  )

  const normal = sorted.filter((item) => item.isNormal)
  const abnormal = sorted.filter((item) => !item.isNormal)

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          borderRadius: UI.radius,
          boxShadow: UI.shadow,
          padding: 10,
          background: '#fff',
        }}
      >
        {sorted.length === 0 && <p style={{ color: '#666', margin: 0 }}>スキャン待機中</p>}

        {normal.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {normal.map((item) => (
              <div
                key={item.tankNumber}
                style={{
                  background: '#e6f4ea',
                  padding: '6px 10px',
                  borderRadius: 6,
                  fontSize: 16,
                  lineHeight: 1.2,
                }}
              >
                {item.tankNumber}
              </div>
            ))}
          </div>
        )}

        {abnormal.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: normal.length > 0 ? 8 : 0 }}>
            {abnormal.map((item) => (
              <div
                key={item.tankNumber}
                style={{
                  background: '#fdecea',
                  padding: '6px 10px',
                  borderRadius: 6,
                  fontSize: 16,
                  lineHeight: 1.2,
                }}
              >
                {item.tankNumber}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}