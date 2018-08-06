export default interface Transaction {
_data: Table[]
}

interface Table {
  name: string;
  amount: number;
}