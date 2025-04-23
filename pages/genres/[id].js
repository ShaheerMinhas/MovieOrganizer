import Link from 'next/link'

// Static generation for genre pages
export async function getStaticPaths() {
  const genreIds = ['g1', 'g3', 'g4', 'g5']
  const paths = genreIds.map(id => ({ params: { id } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const genreMap = {
    g1: 'Science Fiction',
    g3: 'Adventure',
    g4: 'Drama',
    g5: 'Thriller'
  }

  const genreName = genreMap[params.id]

  if (!genreName) {
    return {
      notFound: true
    }
  }

  const res = await fetch('http://localhost:3000/api/movies')
  const data = await res.json()
  const allMovies = data.movies // Ensure this matches your API structure

  const filteredMovies = allMovies.filter(movie => movie.genreId === params.id)

  return {
    props: {
      genreName,
      movies: filteredMovies
    },
    revalidate: 60 // ISR: Re-generate the page every 60 seconds
  }
}

export default function GenrePage({ genreName, movies }) {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-500">
          🎬 {genreName} Movies
        </h1>

        {movies.length === 0 ? (
          <p className="text-center text-gray-400">No movies found in this genre.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {movies.map(movie => (
              <div
                key={movie.id}
                className="bg-gray-900 rounded-xl shadow-lg p-5 hover:shadow-xl transition"
              >
                <h2 className="text-2xl font-semibold text-red-400 mb-2">{movie.title}</h2>
                <p className="text-sm text-gray-300 mb-2">{movie.description}</p>
                <p className="text-xs text-gray-500">
                  Release Year: {movie.releaseYear} | Rating: {movie.rating}
                </p>
                <Link
                  href={`/movies/${movie.id}`}
                  className="mt-3 inline-block text-blue-400 hover:underline text-sm"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/">
            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full text-white shadow-md transition">
              ⬅ Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
