import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

// Server-side data fetching using dynamic segment
async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'no-store'
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }
  
  return res.json()
}

async function getComments(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    cache: 'no-store'
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch comments')
  }
  
  return res.json()
}

export default async function ItemPage({ params }) {
  // Server-side session validation
  const session = await auth()
  
  if (!session) {
    redirect('/signin')
  }
  
  // Await the params object
  const { id } = await params
  
  // Fetch data on server using dynamic segment
  const post = await getPost(id)
  const comments = await getComments(id)
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/main"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to Main Page
        </Link>
        
        <article className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
              Post #{post.id}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <p className="text-gray-700 text-lg leading-relaxed">
            {post.body}
          </p>
        </article>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>
          
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {comment.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {comment.email}
                      </p>
                    </div>
                    <p className="text-gray-700">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}