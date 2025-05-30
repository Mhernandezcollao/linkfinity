export interface MembershipPayment {
    _id: string,
    user: string,
    amount: {
      $numberDecimal: string,
    },
    previous_balance: {
      $numberDecimal: string,
    },
    new_balance: {
      $numberDecimal: string,
    },
    membership: string,
    createdAt: string,
    updatedAt: string,
}