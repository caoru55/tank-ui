'use client'

import { useState } from 'react'
import { useTankStore } from '@/src/store/tankStore'
import { UI } from '@/src/store/uiTheme'

export default function LogPanel() {
  const scannedTanks = useTankStore((s) => s.scannedTanks)
  const sendQueue = useTankStore((s) => s.sendQueue)
  const [sendingGroup, setSendingGroup] = useState<'normal' | 'abnormal' | null>(null)

  const sorted = [...scannedTanks].sort((a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  )

  const normal = sorted.filter((item) => item.isNormal)
  const abnormal = sorted.filter((item) => !item.isNormal)

    const handleSendGroup = async (targetIsNormal: boolean) => {
    const current = useTankStore.getState().scannedTanks
    const beforeSend = [...current] // ← 追加（正しいスナップショット）
    const target = current.filter((item) => item.isNormal === targetIsNormal)

    if (target.length === 0 || sendingGroup !== null) {
        return
    }

    if (!targetIsNormal) {
        const ok = window.confirm('異常な遷移を送信します。よろしいですか？')
        if (!ok) {
        return
        }
    }

    const remaining = current.filter((item) => item.isNormal !== targetIsNormal)
    setSendingGroup(targetIsNormal ? 'normal' : 'abnormal')

    // target のみ送信
    useTankStore.setState({ scannedTanks: target })

    try {
        await sendQueue()
        const afterSend = useTankStore.getState().scannedTanks

        if (afterSend.length === 0) {
        // 成功 → remaining を復元
        useTankStore.setState({ scannedTanks: remaining })
        } else {
        // 失敗 → beforeSend を復元（stale バグ防止）
        useTankStore.setState({ scannedTanks: beforeSend })
        }
    } finally {
        setSendingGroup(null)
    }
    }

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
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1 }}>
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
            <button
              onClick={() => void handleSendGroup(true)}
              disabled={sendingGroup !== null}
              style={{
                height: 28,
                border: 'none',
                background: '#2e7d32',
                color: '#fff',
                borderRadius: 6,
                fontSize: 14,
                padding: '0 10px',
                cursor: sendingGroup !== null ? 'not-allowed' : 'pointer',
                opacity: sendingGroup !== null ? 0.6 : 1,
              }}
            >
              {sendingGroup === 'normal' ? '送信中' : '送信'}
            </button>
          </div>
        )}

        {abnormal.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 8,
              marginTop: normal.length > 0 ? 8 : 0,
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1 }}>
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
            <button
              onClick={() => void handleSendGroup(false)}
              disabled={sendingGroup !== null}
                style={{
                height: 28,
                border: 'none',
                background: '#c62828',
                color: '#fff',
                  borderRadius: 6,
                fontSize: 14,
                padding: '0 10px',
                cursor: sendingGroup !== null ? 'not-allowed' : 'pointer',
                opacity: sendingGroup !== null ? 0.6 : 1,
              }}
            >
              {sendingGroup === 'abnormal' ? '送信中' : '送信'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}