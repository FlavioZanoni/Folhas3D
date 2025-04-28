import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  price: number
  discount: number
  discountedPrice: number
}


const discountDict = process.env.NEXT_PUBLIC_DISCOUNT_DICT

const pricePerKg = Number(process.env.NEXT_PUBLIC_PRICE_PER_KG || 1)
const priceKW = Number(process.env.NEXT_PUBLIC_PRICE_KWH || 0)
const printerWattsH = Number(process.env.NEXT_PUBLIC_PRINTER_WATTSH || 0)
const printerVolSec = Number(process.env.NEXT_PUBLIC_PRINTER_VOL_PER_SEC || 1)


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

    const printTime = volume / printerVolSec
    const printTimeCost = (printTime / 3600) * (priceKW / 1000) * printerWattsH
    const basePrice = quantity * (volume * (pricePerKg / 1000)) + printTimeCost

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
