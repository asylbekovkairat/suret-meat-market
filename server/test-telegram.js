import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function testTelegramBot() {
  console.log('Testing Telegram bot...');
  console.log('Bot Token:', process.env.TELEGRAM_BOT_TOKEN ? 'Configured ✅' : 'Missing ❌');
  console.log('Chat ID:', process.env.TELEGRAM_CHAT_ID ? `${process.env.TELEGRAM_CHAT_ID} ✅` : 'Missing ❌');
  
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.error('ERROR: Missing Telegram configuration in .env file');
    return;
  }
  
  try {
    // First, get bot info to verify token is valid
    const botInfoResponse = await axios.get(`${TELEGRAM_API}/getMe`);
    
    if (botInfoResponse.data.ok) {
      const botInfo = botInfoResponse.data.result;
      console.log('\nBot Information:');
      console.log(`- Name: ${botInfo.first_name}`);
      console.log(`- Username: @${botInfo.username}`);
      console.log(`- Bot ID: ${botInfo.id}`);
      console.log('- Token is valid ✅');
    } else {
      console.error('ERROR: Invalid bot token');
      return;
    }
    
    // Send a test message
    console.log('\nSending test message to chat ID:', TELEGRAM_CHAT_ID);
    
    const testMessage = `
🧪 *TEST MESSAGE* 🧪

This is a test message from your Suret Meat Market bot.
If you can see this message, your bot is correctly configured!

*Timestamp:* ${new Date().toLocaleString('ru-RU')}
`;
    
    const sendMessageResponse = await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: testMessage,
      parse_mode: 'Markdown'
    });
    
    if (sendMessageResponse.data.ok) {
      console.log('Test message sent successfully! ✅');
      console.log('Your Telegram bot is correctly configured.');
    } else {
      console.error('ERROR: Failed to send test message');
      console.error(sendMessageResponse.data);
    }
    
  } catch (error) {
    console.error('ERROR:', error.message);
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      
      // Provide helpful advice based on error
      if (error.response.data.error_code === 401) {
        console.error('Your bot token is invalid. Please check with BotFather for the correct token.');
      } else if (error.response.data.error_code === 400 && error.response.data.description.includes('chat not found')) {
        console.error('The chat ID is invalid. For group chats, make sure:');
        console.error('1. Your bot is a member of the group');
        console.error('2. The group chat ID starts with a minus sign (-)');
        console.error('3. Someone has sent at least one message in the group after the bot was added');
      }
    }
  }
}

// Run the test
testTelegramBot();
