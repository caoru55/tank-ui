import type { TankOperation, TankState } from './determineTransition'

export const OPERATION_COLORS: Record<TankOperation, string> = {
  use_tanks: '#2196F3',
  retrieve_tanks: '#9C27B0',
  refill_tanks: '#4CAF50',
  testfail_tanks: '#F44336',
  discard_tanks: '#9E9E9E',
}

export const OPERATION_ICONS: Record<TankOperation, string> = {
  use_tanks: '📤',
  retrieve_tanks: '📥',
  refill_tanks: '⛽',
  testfail_tanks: '⚠️',
  discard_tanks: '🗑️',
}

export const OPERATION_LABELS: Record<TankOperation, string> = {
  use_tanks: '持出',
  retrieve_tanks: '回収',
  refill_tanks: '充填',
  testfail_tanks: '点検不合格',
  discard_tanks: '廃棄',
}

export const OPERATION_VOICE: Record<TankOperation, string> = {
  use_tanks: 'もちだしモードです',
  retrieve_tanks: '回収モードです',
  refill_tanks: '充填モードです',
  testfail_tanks: '点検不合格モードです',
  discard_tanks: '廃棄モードです',
}

export const STATE_COLORS: Record<TankState, string> = {
  Available: '#4CAF50',
  InUse: '#2196F3',
  Retrieved: '#9C27B0',
  ToBeDiscarded: '#F44336',
  Discarded: '#9E9E9E',
}