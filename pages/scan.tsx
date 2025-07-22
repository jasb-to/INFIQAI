import useUserRole from "@/hooks/useUserRole";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ScanPage() {
  const { role, loading } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !role) {
      router.push("/pricing");
    }
  }, [loading, role, router]);

  if (loading || !role) {
    return <div className="p-4">Checking access...</div>;
  }

  // ... Your scan page content here
}
