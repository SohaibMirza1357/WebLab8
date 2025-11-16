import { auth } from "@/auth"
import Link from "next/link"

export default async function Home() {
  const session = await auth()
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Next.js Auth Project
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          {session 
            ? `Hello, ${session.user.name}! You are logged in.` 
            : 'Please sign in to access protected content.'}
        </p>
        
        {session && (
          <div className="space-x-4">
            <Link
              href="/main"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Go to Main Page
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}