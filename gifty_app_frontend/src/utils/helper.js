export const DAYS_FOR_REFUND = 7

export const paymentStatuses = {
    REFUNDED: 'r',
    CLAIMED: 'c',
    PENDING: 'p'
}

export function reload(e) {
    e.preventDefault();
    window.location.reload();
}
