// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'Ostello' })
  res.setHeader('Cache-Control', 's-maxage=10');
}
