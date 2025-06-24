import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { useUserStore } from "../context/useUserStore";

export const SyncUser = () => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const setUserData = useUserStore((state) => state.setUserData);
  const setCart = useUserStore((state) => state.setCart);
  const setOrders = useUserStore((state) => state.setOrders);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        // First, sync user
        const userRes = await axios.get(`${import.meta.env.VITE_SERVER}/sync-user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = userRes.data.user;
        setUserData(user);


      } catch (err) {
      toast.error("Error for syncing user !");
      }
    };

    if (isSignedIn) {
      syncUser();
    }
  }, [isSignedIn]);

  return null;
};
