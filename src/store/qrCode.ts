export type ParsedQrCode = {
  raw: string
  tankNumber: string
  crcHex: string | null
}

const TANK_NUMBER_PATTERN = /^[A-Z][0-9]{2}$/
const QR_PATTERN = /^([A-Z][0-9]{2})(?:[-:]?([0-9A-F]{4}))?$/

const toAsciiBytes = (value: string): number[] =>
  Array.from(value).map((char) => char.charCodeAt(0))

const toHex4 = (value: number): string =>
  value.toString(16).toUpperCase().padStart(4, '0')

const crc16CcittFalse = (value: string): number => {
  let crc = 0xffff
  for (const byte of toAsciiBytes(value)) {
    crc ^= byte << 8
    for (let index = 0; index < 8; index += 1) {
      const msb = crc & 0x8000
      crc = (crc << 1) & 0xffff
      if (msb) crc ^= 0x1021
    }
  }
  return crc & 0xffff
}

const crc16Good = (value: string): number => {
  const ccittFalse = crc16CcittFalse(value)
  return (ccittFalse ^ 0xffff) & 0xffff
}

export const parseQrCode = (rawValue: string): ParsedQrCode => {
  const normalized = rawValue.trim().toUpperCase()
  const matched = normalized.match(QR_PATTERN)

  if (!matched) {
    throw new Error('QRコード形式が不正です（例: B03 または B03-430B）')
  }

  const tankNumber = matched[1]
  const crcHex = matched[2] ?? null

  if (!TANK_NUMBER_PATTERN.test(tankNumber)) {
    throw new Error('タンク番号形式が不正です（例: B03）')
  }

  return {
    raw: normalized,
    tankNumber,
    crcHex,
  }
}

export const verifyCrc16 = (tankNumber: string, crcHex: string): boolean => {
  const expected = crcHex.toUpperCase()
  const good = toHex4(crc16Good(tankNumber))
  return expected === good
}