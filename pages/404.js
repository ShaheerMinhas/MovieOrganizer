
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-lg text-gray-300 mb-4">WOAH BE CAREFUL.</p>
        <Link href="/" className="text-lg text-blue-400 hover:underline">
  Go back to Home
</Link>
 
      </div>
    </div>
  )
}
