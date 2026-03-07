import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-cyan-500">404</h1>
        <p className="text-2xl font-semibold text-white mt-4">Page Not Found</p>
        <p className="text-gray-400 mt-2">The page you are looking for does not exist.</p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
