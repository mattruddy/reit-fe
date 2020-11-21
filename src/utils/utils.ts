import moment from 'moment'

export const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

export const dateFormat = (date: Date): string => {
  return moment(date).format("yyyy-MM-DD")
}

export const isNumeric = (s: any): boolean => {
  return !isNaN(s)
}