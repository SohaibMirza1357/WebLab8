import { auth } from "@/auth"
import Link from "next/link"
import Image from "next/image"
import SignOutButton from "@/components/SignOutButton"  // ← Updated import

export default async function Navbar() {
  const session = await auth()
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Auth Project
            </Link>
          </div>
          
          <div className="flex items-center">
            {!session ? (
              <Link
                href="/signin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center space-x-5">
                <span className="text-gray-700 text-sm font-medium">
                  {session.user.name}
                </span>
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                )}
                <SignOutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}