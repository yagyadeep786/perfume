import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureRazorpayPayment } from "@/store/shop/order-slice"; // Adjusted action for Razorpay
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function RazorpayReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("razorpay_payment_id"); // Razorpay's payment ID
  const razorpayOrderId = params.get("razorpay_order_id"); // Razorpay's order ID
  const signature = params.get("razorpay_signature"); // Razorpay's signature

  useEffect(() => {
    if (paymentId && razorpayOrderId && signature) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(captureRazorpayPayment({ paymentId, razorpayOrderId, signature, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, razorpayOrderId, signature, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default RazorpayReturnPage;
