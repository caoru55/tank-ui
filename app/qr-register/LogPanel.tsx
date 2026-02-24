'use client'

import { useTankStore } from '@/src/store/tankStore'
import { UI } from '@/src/store/uiTheme'

export default function LogPanel() {
  const logs = useTankStore((s) => s.logs)

  return (
    <div style={{ marginTop: 20 }}>
      <h2 style={{ marginBottom: 8 }}>読み取り履歴</h2>
      <div
        style={{
          maxHeight: 220,
          overflowY: 'auto',
          borderRadius: UI.radius,
          boxShadow: UI.shadow,
          padding: 10,
          background: '#fff',
        }}
      >
        {logs.length === 0 && <p style={{ color: '#666' }}>履歴はまだありません。</p>}
        {logs.map((log, index) => (
          <div
            key={`${log.tank}-${log.timestamp}-${index}`}
            style={{
              padding: '8px 0',
              borderBottom: index === logs.length - 1 ? 'none' : '1px solid #ececec',
              color: log.isNormal ? '#2e7d32' : '#ef6c00',
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {log.tank}：{log.from} → {log.to}
            </div>
            <div style={{ fontSize: 12 }}>
              {log.operation} / {new Date(log.timestamp).toLocaleTimeString()}
              {!log.isNormal && log.exceptionType ? <span>（例外: {log.exceptionType}）</span> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}