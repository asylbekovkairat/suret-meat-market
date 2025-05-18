import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
const isProduction =
  process.env.RAILWAY_STATIC_URL || process.env.RAILWAY_PUBLIC_DOMAIN;
const corsOptions = {
  origin: "*", // Allow all origins for now to troubleshoot
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Content-Length",
    "X-Requested-With",
  ],
  exposedHeaders: ["Content-Length"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Telegram API endpoint
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const TELEGRAM_CONTACT_API = `https://api.telegram.org/bot${process.env.TELEGRAM_CONTACT_BOT_TOKEN}`;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Routes
app.get("/", (req, res) => {
  res.send("Suret Meat Market Server is running");
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working!",
    timestamp: new Date().toISOString(),
  });
});

// Endpoint to handle order submissions
app.post("/api/submit-order", async (req, res) => {
  try {
    const { product, values } = req.body;

    if (!product || !values) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required data" });
    }

    // Check if it's a steak or other product
    const isSteak = product.type === "steak";

    // Format message based on product type
    let amountInfo = "";

    if (isSteak) {
      // For steaks: 1 piece per person
      const quantity = parseInt(values.quantity, 10) || 1;
      amountInfo = `${quantity} шт. (на ${quantity} чел.)`;
    } else {
      // For other products: 4 people per kg, 5 skewers per kg
      const weightNum = parseFloat(values.weight) || 1;
      const skewers = Math.round(weightNum * 5);
      const people = Math.round(weightNum * 4);
      amountInfo = `${values.weight} кг (≈ ${skewers} шампуров, на ${people} чел.)`;
    }

    // Calculate total price
    const totalPrice = values.totalPrice || 0;

    // Format message for Telegram
    const message = `
🔔 *НОВЫЙ ЗАКАЗ* 🔔

*Продукт:* ${product.name}
*Количество:* ${amountInfo}
*Сумма:* ${totalPrice} сом

*Контакты клиента:*
*Имя:* ${values.name}
*Телефон:* +996${values.phone}
*Город:* ${values.city}

*Дополнительные услуги:*
${values.extras.grill ? "✅ Мангал" : "❌ Мангал"}
${values.extras.charcoal ? "✅ Уголь" : "❌ Уголь"}

*Заказ получен:* ${new Date().toLocaleString("ru-RU")}
`;

    // Send message to Telegram
    const response = await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });

    if (response.data.ok) {
      return res
        .status(200)
        .json({ success: true, message: "Order submitted successfully" });
    } else {
      console.error("Telegram API error:", response.data);
      return res.status(500).json({
        success: false,
        message: "Failed to send message to Telegram",
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/contact-us", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required data" });
    }

    // Format message for Telegram
    const messageText = `
🔔 *НОВЫЙ ЗАПРОС* 🔔

*Контакты клиента:*
*Имя:* ${name}
*Телефон:* +996${phone}

*Сообщение:* ${message}
`;

    // Send message to Telegram
    const response = await axios.post(`${TELEGRAM_CONTACT_API}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: messageText,
      parse_mode: "Markdown",
    });

    if (response.data.ok) {
      return res.status(200).json({
        success: true,
        message: "Contact message submitted successfully",
      });
    } else {
      console.error("Telegram API error:", response.data);
      return res.status(500).json({
        success: false,
        message: "Failed to send message to Telegram",
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// Setup webhook for Telegram
app.post("/api/setup-webhook", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res
        .status(400)
        .json({ success: false, message: "Missing webhook URL" });
    }

    const webhookUrl = `${url}/api/telegram-webhook`;
    const contactWebhookUrl = `${url}/api/telegram-contact-webhook`;
    const response = await axios.get(
      `${TELEGRAM_API}/setWebhook?url=${webhookUrl}`
    );
    const contactResponse = await axios.get(
      `${TELEGRAM_CONTACT_API}/setWebhook?url=${contactWebhookUrl}`
    );

    if (response.data.ok && contactResponse.data.ok) {
      return res
        .status(200)
        .json({ success: true, message: "Webhook set successfully" });
    } else {
      console.error("Telegram webhook error:", response.data);
      return res
        .status(500)
        .json({ success: false, message: "Failed to set webhook" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// Telegram webhook endpoint
app.post("/api/telegram-webhook", (req, res) => {
  console.log("Received update from Telegram:", req.body);

  // Process incoming messages if needed
  if (req.body && req.body.message) {
    const { message } = req.body;
    console.log(
      `Received message from ${message.from.first_name}: ${message.text}`
    );

    // You can add logic here to respond to specific commands
    // For example, responding to /status command
    if (message.text && message.text.startsWith("/status")) {
      // Send a response back to the chat
      axios
        .post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: message.chat.id,
          text: "✅ Сервер заказов работает нормально!",
          parse_mode: "Markdown",
        })
        .catch((err) => console.error("Error sending response:", err));
    }
  }

  res.sendStatus(200);
});

// Telegram contact webhook endpoint
app.post("/api/telegram-contact-webhook", (req, res) => {
  console.log("Received update from Telegram contact:", req.body);

  // Process incoming messages for contact bot
  if (req.body && req.body.message) {
    const { message } = req.body;
    console.log(
      `Received contact message from ${message.from.first_name}: ${message.text}`
    );

    // You can add logic here to respond to specific commands for the contact bot
    if (message.text && message.text.startsWith("/help")) {
      // Send a response back to the chat
      axios
        .post(`${TELEGRAM_CONTACT_API}/sendMessage`, {
          chat_id: message.chat.id,
          text: "👋 Этот бот используется для обработки контактных форм с сайта Suret Meat Market.",
          parse_mode: "Markdown",
        })
        .catch((err) => console.error("Error sending response:", err));
    }
  }

  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
