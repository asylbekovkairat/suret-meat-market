import axios from "axios";
import dotenv from "dotenv";
import readline from "readline";

// Load environment variables
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CONTACT_BOT_TOKEN = process.env.TELEGRAM_CONTACT_BOT_TOKEN;

if (!TELEGRAM_BOT_TOKEN) {
  console.error("Error: TELEGRAM_BOT_TOKEN is not set in .env file");
  process.exit(1);
}

if (!TELEGRAM_CONTACT_BOT_TOKEN) {
  console.error("Error: TELEGRAM_CONTACT_BOT_TOKEN is not set in .env file");
  process.exit(1);
}

// Function to set up order webhook
async function setupWebhook(url) {
  try {
    const webhookUrl = `${url}/api/telegram-webhook`;
    console.log(`Setting order webhook to: ${webhookUrl}`);

    const response = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`
    );

    if (response.data.ok) {
      console.log("✅ Order webhook set successfully!");
      console.log("Webhook info:", response.data.result);
    } else {
      console.error(
        "❌ Failed to set order webhook:",
        response.data.description
      );
    }
  } catch (error) {
    console.error("❌ Error setting order webhook:", error.message);
  }
}

// Function to set up contact webhook
async function setupContactWebhook(url) {
  try {
    const webhookUrl = `${url}/api/telegram-contact-webhook`;
    console.log(`Setting contact webhook to: ${webhookUrl}`);

    const response = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_CONTACT_BOT_TOKEN}/setWebhook?url=${webhookUrl}`
    );

    if (response.data.ok) {
      console.log("✅ Contact webhook set successfully!");
      console.log("Webhook info:", response.data.result);
    } else {
      console.error(
        "❌ Failed to set contact webhook:",
        response.data.description
      );
    }
  } catch (error) {
    console.error("❌ Error setting contact webhook:", error.message);
  }
}

// Function to get current webhook info for order bot
async function getOrderWebhookInfo() {
  try {
    console.log("\n--- ORDER BOT WEBHOOK INFO ---");
    const response = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`
    );

    if (response.data.ok) {
      console.log("Current order webhook info:");
      console.log(JSON.stringify(response.data.result, null, 2));
    } else {
      console.error(
        "Failed to get order webhook info:",
        response.data.description
      );
    }
  } catch (error) {
    console.error("Error getting order webhook info:", error.message);
  }
}

// Function to get current webhook info for contact bot
async function getContactWebhookInfo() {
  try {
    console.log("\n--- CONTACT BOT WEBHOOK INFO ---");
    const response = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_CONTACT_BOT_TOKEN}/getWebhookInfo`
    );

    if (response.data.ok) {
      console.log("Current contact webhook info:");
      console.log(JSON.stringify(response.data.result, null, 2));
    } else {
      console.error(
        "Failed to get contact webhook info:",
        response.data.description
      );
    }
  } catch (error) {
    console.error("Error getting contact webhook info:", error.message);
  }
}

// Ask for the deployment URL
rl.question(
  "Enter your deployment URL (e.g., https://your-domain.com): ",
  async (url) => {
    if (!url) {
      console.error("Error: URL is required");
      rl.close();
      return;
    }

    // Remove trailing slash if present
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }

    console.log("\n=== SETTING UP TELEGRAM WEBHOOKS ===");

    // Get current webhook info for both bots
    await getOrderWebhookInfo();
    await getContactWebhookInfo();

    console.log("\n=== SETTING UP NEW WEBHOOKS ===");

    // Set up webhooks for both bots
    await setupWebhook(url);
    await setupContactWebhook(url);

    console.log("\n=== VERIFYING NEW WEBHOOK SETUP ===");

    // Verify the webhook setup
    await getOrderWebhookInfo();
    await getContactWebhookInfo();

    rl.close();
  }
);

// Handle readline close
rl.on("close", () => {
  console.log("\n✅ Setup complete! Both webhooks are now configured.");
  console.log("Order bot and Contact bot are ready to receive messages.");
  process.exit(0);
});
