import { useState } from "react";
import { payments } from "../data/payments";
import { services } from "../data/services";
import { users } from "../data/users";
import { wallet } from "../data/wallet";

export const useData = () => {
  const [data, setData] = useState({
    services: [...services],
    users: [...users],
    payments: [...payments],
    wallet: { ...wallet },
  });

  const updateService = (updatedService) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === updatedService.id ? updatedService : service
      ),
    }));
  };

  const addService = (newService) => {
    setData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { ...newService, id: prev.services.length + 1 },
      ],
    }));
  };

  const updateWallet = (newWalletNumber) => {
    setData((prev) => ({
      ...prev,
      wallet: { number: newWalletNumber },
    }));
  };

  const addPayment = (payment) => {
    setData((prev) => ({
      ...prev,
      payments: [
        ...prev.payments,
        { ...payment, id: prev.payments.length + 1 },
      ],
    }));
  };

  const updatePaymentStatus = (paymentId, status) => {
    setData((prev) => ({
      ...prev,
      payments: prev.payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status } : payment
      ),
    }));
  };

  return {
    ...data,
    updateService,
    addService,
    updateWallet,
    addPayment,
    updatePaymentStatus,
  };
};
