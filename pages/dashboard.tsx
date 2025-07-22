import useUserRole from "@/hooks/useUserRole";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase"; // adjust path if needed
import Link from "next/link";

export default function Dashboard() {
  const { role, loading } = useUserRole();
  const [user] = useAuthState(auth);

  if (!user) return <div className="p-4">Please log in.</div>;
  if (loading) return <div className="p-4">Loading plan info...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.email}</h1>
      <p className="text-lg mb-4">
        Your current plan:{" "}
        <span className="font-semibold capitalize">{role}</span>
      </p>

      <Link href="/scan">
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Go to Document Scanner
        </button>
      </Link>
    </div>
  );
}
