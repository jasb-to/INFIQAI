import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>INFIQAI - AI Data Compliance</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">INFIQAI</h1>
          <p className="mb-6">Automated Document Compliance & Intelligence</p>
          <Link href="/dashboard">
            <button className="px-6 py-2 bg-black text-white rounded">Go to Dashboard</button>
          </Link>
        </div>
      </main>
    </>
  );
}