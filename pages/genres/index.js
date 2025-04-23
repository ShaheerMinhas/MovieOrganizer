import Link from 'next/link'

const genres = [
  { id: 'g1', name: 'Science Fiction' },
  { id: 'g3', name: 'Adventure' },
  { id: 'g4', name: 'Drama' },
  { id: 'g5', name: 'Thriller' },
]

export default function GenresPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🎭 Browse by Genre</h1>
        <ul className="space-y-4">
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link
                href={`/genres/${genre.id}`}
                className="text-red-400 hover:text-red-600 text-xl underline"
              >
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
