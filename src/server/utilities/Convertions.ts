import { getPercentage, roundDecimals } from '@baggie/math'

export class Convertions {
  private readonly decimalRoundOff = 2
  constructor (private readonly primaryDigit: string | number) {
    if (typeof primaryDigit === 'string') {
      this.primaryDigit = roundDecimals(parseFloat(primaryDigit), this.decimalRoundOff)
    } else {
      this.primaryDigit = roundDecimals(primaryDigit, this.decimalRoundOff)
    }
  }

  isRepresentedInCrore (): boolean {
    return false
  }

  isRepresentedInLakhs (): boolean {
    return false
  }

  getWholeNumber (): number {
    return this.primaryDigit as number
  }

  getPercentage (part: Convertions): number {
    const percentage: number = getPercentage({ part: part.getWholeNumber(), whole: this.getWholeNumber() })
    return roundDecimals(percentage, this.decimalRoundOff)
  }
}
