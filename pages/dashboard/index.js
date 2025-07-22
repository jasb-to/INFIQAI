import { useState } from 'react';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '../../firebaseConfig';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFile = async (e) => {
    e.preventDefault();
    if (!file) return;

    const storageRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(storageRef, file);

    const response = await fetch('/api/scan', {
      method: 'POST',
      body: JSON.stringify({ fileName: file.name }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    setResult(data);

    await deleteObject(storageRef); // Auto-delete after scan
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Upload Document for Scan</h1>
      <form onSubmit={handleFile}>
        <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded">Scan</button>
      </form>
      {result && <pre className="mt-6 p-4 bg-gray-100 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}