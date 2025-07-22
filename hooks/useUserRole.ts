import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { onIdTokenChanged } from "firebase/auth";
import { getApp } from "firebase/app";

export default function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(getApp());
    return onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        setRole(token.claims.role || null);
      } else {
        setRole(null);
      }
      setLoading(false);
    });
  }, []);

  return { role, loading };
}
