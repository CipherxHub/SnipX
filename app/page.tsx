import dynamic from 'next/dynamic';

const CodeEditor = dynamic(() => import('../components/CodeEditor'));

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <CodeEditor />
    </main>
  );
}
