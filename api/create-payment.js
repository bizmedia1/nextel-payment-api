import axios from "axios";

export default async function handler(req, res) {
if (req.method !== "POST") {
  return res.status(405).json({
    success: false,
    message: "Method not allowed"
  });
}
  try {

    const reference =
      "NEXTEL-" + Date.now();

    const customerId =
      Date.now().toString();

    const response =
      await axios.post(

        "https://api-v1.aspfiy.com/reserve-paga/",

        {
          email:
            `${customerId}@nextel.app`,

          reference,

          firstName:
            "Registrant",

          lastName:
            customerId.slice(-6),

          webhookUrl:
            "https://nextel-payment-api.vercel.app/api/webhook",

          phone:
            "09000000000"
        },

        {
          headers: {
            Authorization:
              `Bearer ${process.env.ASPFIY_SECRET_KEY}`,

            "Content-Type":
              "application/json"
          }
        }
      );

    return res.status(200).json({

  success: true,

  reference,

  requestSent: {

    email:
      `${customerId}@nextel.app`,

    firstName:
      "Registrant",

    lastName:
      customerId.slice(-6),

    phone:
      "09000000000"

  },

  aspfiyResponse:
    response.data

});

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

    return res.status(500).json({

      success: false,

      error:
        error.response?.data || error.message

    });

  }

}
