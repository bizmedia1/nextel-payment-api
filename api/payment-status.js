import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {

  const { accountNumber } = req.query;

  if (!accountNumber) {
    return res.status(400).json({
      paid: false
    });
  }

  const payment = await redis.get(
    `payment:${accountNumber}`
  );

  return res.status(200).json({
    paid: !!payment,
    payment
  });

}
