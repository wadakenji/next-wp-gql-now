export default async (req, res) => {
  if (req.query.token !== 'mySecretToken') {
    return res.status(401).json({message: 'Invalid token'})
  }

  res.setPreviewData({
    title: req.query.title,
    date: req.query.date,
    content: req.query.content,
    author: {
      userId: req.query.authorId,
      name: req.query.authorName
    },
    categories: {edges: JSON.parse(req.query.categories).map(c => ({node: c}))}
  })

  res.writeHead(307, {Location: '/preview'})
  res.end()
}