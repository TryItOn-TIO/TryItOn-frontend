"use client";

import { useState } from "react";

export type AlertOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "info" | "success" | "warning" | "error";
  onConfirm?: () => void;
  onCancel?: () => void;
};

export type UseCustomAlertReturn = {
  isOpen: boolean;
  options: AlertOptions;
  openAlert: (alertOptions: AlertOptions) => Promise<boolean>;
  closeAlert: () => void;
};

export function useCustomAlert(): UseCustomAlertReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({
    message: "",
    type: "info",
  });

  const openAlert = (alertOptions: AlertOptions) => {
    setOptions(alertOptions);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      setOptions({
        ...alertOptions,
        onConfirm: () => {
          if (alertOptions.onConfirm) alertOptions.onConfirm();
          setIsOpen(false);
          resolve(true);
        },
        onCancel: () => {
          if (alertOptions.onCancel) alertOptions.onCancel();
          setIsOpen(false);
          resolve(false);
        },
      });
    });
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    options,
    openAlert,
    closeAlert,
  };
}
