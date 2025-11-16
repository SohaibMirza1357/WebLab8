import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SignInButtons from "@/components/SignInButtons"

export default async function SignInPage() {
  const session = await auth()
  
  // Redirect if already logged in
  if (session) {
    redirect('/')
  }
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white shadow-xl rounded-lg px-8 py-10">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Sign In
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Choose your preferred sign-in method
          </p>
          
          <SignInButtons />
        </div>
      </div>
    </div>
  )
}