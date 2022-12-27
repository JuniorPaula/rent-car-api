export class NumberFormat {
  static getCurrencyFormat(language, currency) {
    const currencyFormated = new Intl.NumberFormat(language, {
      style: 'currency',
      currency,
    })

    return currencyFormated
  }
}
