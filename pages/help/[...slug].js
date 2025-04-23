import { useRouter } from 'next/router'

export default function HelpPage() {
  const router = useRouter()
  const { slug } = router.query 
  if (!slug || slug.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Help & Support</h1>
        <p>Welcome to the Help Section. Please choose a category:</p>
        <ul className="text-lg mt-4">
          <li><a href="/help/faqs" className="text-blue-400 hover:underline">FAQs</a></li>
          <li><a href="/help/contact" className="text-blue-400 hover:underline">Contact Us</a></li>
          <li><a href="/help/privacy" className="text-blue-400 hover:underline">Privacy Policy</a></li>
        </ul>
      </main>
    )
  }
  const slugPath = slug[0]

  const content = {
    faqs: (
      <div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">Frequently Asked Questions</h2>
        
      </div>
    ),
    contact: (
      <div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">Contact Us</h2>
        <p>If you have any inquiries, please contact us at:</p>
        <p>Email: support@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
    ),
    privacy: (
      <div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">Privacy Policy</h2>
        <p>Our privacy policy outlines how we handle your personal information:</p>
  
      </div>
    ),
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Help & Support</h1>
      {content[slugPath] || (
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Page Not Found</h2>
          <p>The section "{slugPath}" you are looking for does not exist.</p>
        </div>
      )}
    </main>
  )
}
