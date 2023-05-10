export default function handler(req, res) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(/, /)[0].replace(/^.*:/, '') : req.socket.remoteAddress;
    const ipv4 = ip.includes(':') ? ip.split(':').reverse()[0] : ip;
    res.status(200).json({ ip: ipv4 });
  }