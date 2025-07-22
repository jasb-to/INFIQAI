import { auth } from "@/lib/firebase";
import { getTodayScanCount, logScan } from "@/lib/firestore";
import { onAuthStateChanged } from "firebase/auth";

useEffect(() => {
  const checkScanLimit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdTokenResult();
    const role = token.claims.role || "starter";

    const count = await getTodayScanCount(user.uid);
    const limits: Record<string, number | null> = {
      starter: 5,
      pro: 50,
      enterprise: null,
    };

    const limit = limits[role];

    if (limit !== null && count >= limit) {
      alert("You’ve hit your daily scan limit. Upgrade your plan for more scans.");
      router.push("/pricing");
    }
  };

  onAuthStateChanged(auth, () => checkScanLimit());
}, []);
