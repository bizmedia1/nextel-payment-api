export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {

    const {
      firstName,
      lastName,
      email,
      phone
    } = req.body;

    const reference =
      "NEXTEL_" +
      Date.now() +
      "_" +
      Math.floor(Math.random() * 100000);

    const response = await fetch(
      "https://api-v1.aspfiy.com/reserve-paga/",
      {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${process.env.ASPFIY_SECRET_KEY}`,
          "Content-Type":
            "application/json",
          accept:
            "application/json"
        },
        body: JSON.stringify({

          reference,

          firstName,

          lastName,

          email,

          phone,

          webhookUrl:
            "https://nextel-payment-api.vercel.app/api/webhook"

        })
      }
    );

    const data =
      await response.json();

    return res.status(200).json(data);

  } catch (error) {

    return res.status(500).json({

      success: false,

      error:
        error.message

    });

  }

}
