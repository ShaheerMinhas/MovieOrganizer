

import data from '../../../data.json'

export default function handler(req, res) {
  const { id } = req.query 
  const director = data.directors.find((d) => d.id === id)

  if (!director) {
    return res.status(404).json({ message: 'Director not found' }) 
  }
  return res.status(200).json(director)
}
