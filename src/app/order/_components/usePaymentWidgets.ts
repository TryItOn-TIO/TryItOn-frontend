import { useEffect, useState } from "react";
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";

type Amount ={
  currency: string;
  value: number;
}

function generateRandomString() {
  if (typeof window !== "undefined") {
    return window.btoa(Math.random().toString()).slice(0, 20);
  }
  return "";
}

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();

export function usePaymentWidgets(isOpen: boolean, amount: number) {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<Amount>({
    currency: "KRW",
    value: amount,
  });

  // 토스페이먼츠 위젯 초기화
  useEffect(() => {
    if (!isOpen) return;

    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({
          customerKey,
        });
        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }

    fetchPaymentWidgets();
  }, [isOpen]);

  // 위젯 렌더링
  useEffect(() => {
    if (!isOpen || !widgets) return;

    async function renderPaymentWidgets() {
      if (!widgets) return;
      
      try {
        await widgets.setAmount(paymentAmount);

        await widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        });

        await widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        });

        setReady(true);
      } catch (error) {
        console.error("Error rendering payment widgets:", error);
      }
    }

    renderPaymentWidgets();
  }, [widgets, isOpen, paymentAmount]);

  const updateAmount = async (newAmount: Amount) => {
    setPaymentAmount(newAmount);
    if (widgets) {
      await widgets.setAmount(newAmount);
    }
  };

  return {
    ready,
    widgets,
    paymentAmount,
    updateAmount,
  };
}
