import { HttpTypes } from "@medusajs/types"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const statusLabels: Record<string, string> = {
  not_fulfilled: "در انتظار پردازش",
  partially_fulfilled: "بخشی ارسال شده",
  fulfilled: "آماده یا ارسال شده",
  partially_shipped: "بخشی ارسال شده",
  shipped: "ارسال شده",
  partially_delivered: "بخشی تحویل شده",
  delivered: "تحویل شده",
  canceled: "لغو شده",
  requires_action: "نیازمند اقدام",
  not_paid: "پرداخت نشده",
  awaiting: "در انتظار پرداخت",
  authorized: "پرداخت تأیید شده",
  partially_authorized: "بخشی تأیید شده",
  captured: "پرداخت شده",
  partially_captured: "بخشی پرداخت شده",
  refunded: "بازپرداخت شده",
  partially_refunded: "بخشی بازپرداخت شده",
}

const getStatusLabel = (status?: string) => {
  if (!status) {
    return "نامشخص"
  }

  return statusLabels[status] || status.split("_").join(" ")
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const orderDate = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(order.created_at))

  return (
    <div>
      <p className="text-sm leading-7 text-black/60 small:text-base">
        جزئیات تأیید سفارش به ایمیل زیر ارسال خواهد شد:
      </p>

      <p
        className="mt-1 break-all font-semibold text-black"
        data-testid="order-email"
      >
        {order.email}
      </p>

      <div className="mt-6 grid gap-3 small:grid-cols-2">
        <div className="rounded-[16px] bg-[#f0f0f0] p-4">
          <p className="text-xs text-black/50">شماره سفارش</p>

          <p className="mt-2 font-bold text-black" data-testid="order-id">
            #{order.display_id}
          </p>
        </div>

        <div className="rounded-[16px] bg-[#f0f0f0] p-4">
          <p className="text-xs text-black/50">تاریخ ثبت سفارش</p>

          <p className="mt-2 font-bold text-black" data-testid="order-date">
            {orderDate}
          </p>
        </div>
      </div>

      {showStatus && (
        <div className="mt-3 grid gap-3 small:grid-cols-2">
          <div className="rounded-[16px] border border-black/10 p-4">
            <p className="text-xs text-black/50">وضعیت سفارش</p>

            <p
              className="mt-2 font-semibold text-black"
              data-testid="order-status"
            >
              {getStatusLabel(order.fulfillment_status)}
            </p>
          </div>

          <div className="rounded-[16px] border border-black/10 p-4">
            <p className="text-xs text-black/50">وضعیت پرداخت</p>

            <p
              className="mt-2 font-semibold text-black"
              data-testid="order-payment-status"
            >
              {getStatusLabel(order.payment_status)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
