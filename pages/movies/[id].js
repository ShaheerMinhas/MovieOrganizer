import Link from 'next/link'

// Generate paths for each movie based on movie ID
export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/movies')
  const data = await res.json()
  const allMovies = data.movies

  const paths = allMovies.map(movie => ({
    params: { id: movie.id }
  }))

  return {
    paths,
    fallback: 'blocking' // Allows ISR for new movies
  }
}

// Fetch movie data by ID
export async function getStaticProps({ params }) {
  const res = await fetch('http://localhost:3000/api/movies')
  const data = await res.json()
  const allMovies = data.movies

  const movie = allMovies.find(m => m.id === params.id)

  if (!movie) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      movie
    },
    revalidate: 60
  }
}

export default function MovieDetails({ movie }) {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-red-500 mb-6">{movie.title}</h1>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <p className="mb-4 text-gray-300 text-lg">{movie.description}</p>

          <ul className="text-sm text-gray-400 space-y-2">
            <li><strong>Release Year:</strong> {movie.releaseYear}</li>
            <li><strong>Rating:</strong> {movie.rating}</li>
            <li>
              <Link href={`/movies/${movie.id}/director`} className="text-blue-400 hover:underline">
                View Director Info →
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link href="/movies">
            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full text-white shadow-md transition">
              ⬅ Back to Movies
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
