import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).json({
      message: "Webhook live"
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const payload = req.body;

    if (
      payload.event === "PAYMENT_NOTIFIFICATION" ||
      payload.event === "PAYMENT_NOTIFICATION"
    ) {

      const accountNumber =
        payload.data.account.account_number;

      await redis.set(
        `payment:${accountNumber}`,
        {
          paid: true,
          amount: payload.data.amount,
          reference: payload.data.reference,
          timestamp: Date.now()
        }
      );
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

}
