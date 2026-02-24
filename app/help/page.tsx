'use client'

import {
  OPERATION_COLORS,
  OPERATION_ICONS,
  OPERATION_LABELS,
  STATE_COLORS,
} from '@/src/store/operationTheme'
import { UI } from '@/src/store/uiTheme'
import type { TankOperation, TankState } from '@/src/store/determineTransition'

const modeOrder: TankOperation[] = ['use_tanks', 'retrieve_tanks', 'refill_tanks', 'testfail_tanks', 'discard_tanks']

const stateRows: Array<{ state: TankState; label: string }> = [
  { state: 'Available', label: '使用可能' },
  { state: 'InUse', label: '使用中' },
  { state: 'Retrieved', label: '回収済' },
  { state: 'ToBeDiscarded', label: '廃棄予定' },
  { state: 'Discarded', label: '廃棄済' },
]

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        marginBottom: 18,
        padding: 14,
        borderRadius: UI.radius,
        boxShadow: UI.shadow,
        background: '#fff',
      }}
    >
      <h2 style={{ marginBottom: 10, fontSize: 20, fontWeight: 700 }}>{title}</h2>
      {children}
    </section>
  )
}

export default function HelpPage() {
  return (
    <main style={{ padding: 20, maxWidth: 820, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 14 }}>かんたんヘルプ</h1>

      <Card title="操作モード（色とアイコン）">
        <div style={{ display: 'grid', gap: 10 }}>
          {modeOrder.map((mode) => (
            <div
              key={mode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: `${OPERATION_COLORS[mode]}22`,
                padding: 10,
                borderRadius: UI.radius,
              }}
            >
              <span style={{ fontSize: 26 }}>{OPERATION_ICONS[mode]}</span>
              <span style={{ fontSize: 18, fontWeight: 600 }}>{OPERATION_LABELS[mode]}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="タンク状態（色）">
        <div style={{ display: 'grid', gap: 10 }}>
          {stateRows.map((row) => (
            <div
              key={row.state}
              style={{
                background: `${STATE_COLORS[row.state]}22`,
                padding: 10,
                borderRadius: UI.radius,
                fontSize: 18,
              }}
            >
              {row.label}
            </div>
          ))}
        </div>
      </Card>

      <Card title="例外遷移のルール">
        <p style={{ fontWeight: 700, marginBottom: 8 }}>例外遷移は充填所の半径 50m 以内のみ許可</p>
        <div
          style={{
            height: 150,
            borderRadius: UI.radius,
            background: '#ffecec',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: '#4CAF50',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}
          >
            充填所
          </div>
        </div>
      </Card>

      <Card title="使い方（10秒）">
        <ol style={{ paddingLeft: 20, display: 'grid', gap: 6 }}>
          <li>操作モードを選ぶ</li>
          <li>QR をかざす</li>
          <li>結果を色・音・振動で確認</li>
          <li>履歴で確認</li>
        </ol>
      </Card>
    </main>
  )
}