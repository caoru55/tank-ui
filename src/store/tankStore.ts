import { create } from 'zustand'

type TankStatuses = {
  Available: string[]
  InUse: string[]
  Retrieved: string[]
  ToBeDiscarded: string[]
  Discarded: string[]
}

type TankStore = {
  statuses: TankStatuses | null
  updatedAt: string | null
}

export const useTankStore = create<TankStore>(() => ({
  statuses: null,
  updatedAt: null,
}))