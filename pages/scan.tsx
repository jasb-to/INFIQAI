import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firestore";
import { useRouter } from "next/router";

export default function ScanPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSubscription = async () => {
      const user = auth.currentUser;
      if (!user) return router.push("/login");

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists() || docSnap.data().subscriptionStatus !== "active") {
        alert("Please subscribe to access scanning.");
        router.push("/pricing");
      } else {
        setLoading(false);
      }
    };

    checkSubscription();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* Scan UI here */}
    </div>
  );
}
