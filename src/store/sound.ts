export const playSuccess = (): void => {
  new Audio('/sounds/success.mp3').play().catch(() => {})
}

export const playError = (): void => {
  new Audio('/sounds/error.mp3').play().catch(() => {})
}
