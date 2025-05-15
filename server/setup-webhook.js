import axios from 'axios';
import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('Error: TELEGRAM_BOT_TOKEN is not set in .env file');
  process.exit(1);
}

// Function to set up webhook
async function setupWebhook(url) {
  try {
    const webhookUrl = `${url}/api/telegram-webhook`;
    console.log(`Setting webhook to: ${webhookUrl}`);
    
    const response = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`
    );
    
    if (response.data.ok) {
      console.log('✅ Webhook set successfully!');
      console.log('Webhook info:', response.data.result);
    } else {
      console.error('❌ Failed to set webhook:', response.data.description);
    }
  } catch (error) {
    console.error('❌ Error setting webhook:', error.message);
  }
}

// Function to get current webhook info
async function getWebhookInfo() {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`
    );
    
    if (response.data.ok) {
      console.log('Current webhook info:');
      console.log(JSON.stringify(response.data.result, null, 2));
    } else {
      console.error('Failed to get webhook info:', response.data.description);
    }
  } catch (error) {
    console.error('Error getting webhook info:', error.message);
  }
}

// Ask for the deployment URL
rl.question('Enter your deployment URL (e.g., https://your-domain.com): ', async (url) => {
  if (!url) {
    console.error('Error: URL is required');
    rl.close();
    return;
  }
  
  // Remove trailing slash if present
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  
  await getWebhookInfo();
  await setupWebhook(url);
  
  rl.close();
});

// Handle readline close
rl.on('close', () => {
  console.log('Setup complete!');
  process.exit(0);
});
