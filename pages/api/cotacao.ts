// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  custo: number
}

const resinPrice = 325

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { quantity, sanded, painted, cupom, volume } = req.body

    const custo = quantity * ((volume * resinPrice) / 1000)

    res.status(200).json({ custo })
  }
}
