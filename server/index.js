import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
const isProduction = process.env.RAILWAY_STATIC_URL || process.env.RAILWAY_PUBLIC_DOMAIN;
const corsOptions = {
  origin: '*', // Allow all origins for now to troubleshoot
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
  exposedHeaders: ['Content-Length'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Telegram API endpoint
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Routes
app.get('/', (req, res) => {
  res.send('Suret Meat Market Server is running');
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working!', timestamp: new Date().toISOString() });
});

// Endpoint to handle order submissions
app.post('/api/submit-order', async (req, res) => {
  try {
    const { product, values } = req.body;
    
    if (!product || !values) {
      return res.status(400).json({ success: false, message: 'Missing required data' });
    }
    
    // Convert weight from string to number for calculations
    const weightNum = parseFloat(values.weight);
    const skewers = weightNum * 5;
    const people = weightNum * 4;
    
    // Format message for Telegram
    const message = `
🆕 Новый заказ:
Продукт: ${product.name}
Имя: ${values.name}
Телефон: ${values.phone}
Кол-во: ${values.weight} кг (≈ ${skewers} шампуров, на ${people} чел.)
Город: ${values.city}
Дополнительные услуги: ${values.extras.grill ? '✅ Мангал' : '❌ Мангал'}, ${values.extras.charcoal ? '✅ Уголь' : '❌ Уголь'}
    `;
    
    // Send message to Telegram
    const response = await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
    
    if (response.data.ok) {
      return res.status(200).json({ success: true, message: 'Order submitted successfully' });
    } else {
      console.error('Telegram API error:', response.data);
      return res.status(500).json({ success: false, message: 'Failed to send message to Telegram' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Setup webhook for Telegram
app.post('/api/setup-webhook', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ success: false, message: 'Missing webhook URL' });
    }
    
    const webhookUrl = `${url}/api/telegram-webhook`;
    const response = await axios.get(`${TELEGRAM_API}/setWebhook?url=${webhookUrl}`);
    
    if (response.data.ok) {
      return res.status(200).json({ success: true, message: 'Webhook set successfully' });
    } else {
      console.error('Telegram webhook error:', response.data);
      return res.status(500).json({ success: false, message: 'Failed to set webhook' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Telegram webhook endpoint
app.post('/api/telegram-webhook', (req, res) => {
  console.log('Received update from Telegram:', req.body);
  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
