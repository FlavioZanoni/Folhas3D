import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  price: number
  discount: number
  discountedPrice: number
}

const pricePerKg = process.env.NEXT_PUBLIC_PRICE_PER_KG
const discountDict = process.env.NEXT_PUBLIC_DISCOUNT_DICT

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { quantity, volume, cupom } = req.body

    if (!quantity || !volume) {
      return res.status(400).json({ price: 0, discount: 0, discountedPrice: 0 })
    }
    if (quantity < 1 || quantity > 100) {
      return res.status(400).json({ price: 0, discount: 0, discountedPrice: 0 })
    }

    const costPerKg = pricePerKg ? parseFloat(pricePerKg) : 0
    const resinPrice = costPerKg || 0

    const basePrice = quantity * ((volume * resinPrice) / 1000)

    if (discountDict && cupom) {
      let discounts = null
      try {
        const decodedDiscountDict = Buffer.from(discountDict, 'base64').toString('utf-8');
        discounts = JSON.parse(decodedDiscountDict);
      } catch (error) {
        console.error("Failed to decode or parse discount dictionary:", error);
        res.status(200).json({
          price: basePrice,
          discount: 0,
          discountedPrice: 0
        })
        return
      }

      const percent = discounts.desc[cupom]

      if (percent && !isNaN(percent)) {
        res.status(200).json({
          price: basePrice,
          discount: percent,
          discountedPrice: basePrice - (basePrice * percent / 100)
        })
        return
      }
    }

    res.status(200).json({ price: basePrice, discountedPrice: 0, discount: 0 })
  }
}
