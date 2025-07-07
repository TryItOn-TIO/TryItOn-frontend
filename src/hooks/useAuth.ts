"use client";

import { useState, useEffect } from "react";
import { getAccessToken } from "@/utils/auth";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getAccessToken();
      setIsAuthenticated(!!token); // token이 있으면 true, 없으면 false
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
};
