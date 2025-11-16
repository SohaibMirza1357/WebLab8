import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

// Server-side data fetching
async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
    cache: 'no-store'
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  
  return res.json()
}

export default async function MainPage() {
  // Server-side session validation
  const session = await auth()
  
  if (!session) {
    redirect('/signin')
  }
  
  // Fetch data on server
  const posts = await getPosts()
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Main Page
          </h1>
          <p className="text-gray-600">
            This is a server-rendered page with data from a public API
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/item/${post.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">
                {post.body}
              </p>
              <div className="mt-4 text-blue-600 font-medium">
                Read more →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}