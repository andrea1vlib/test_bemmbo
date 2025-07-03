
export type Invoices = {
  id: string
  receiverName: string
  amount: number
  currency: "CLP" | "USD"
  injected?: boolean
  selected?: boolean
}