# Suret Meat Market - Telegram Bot Integration

This server handles the integration between the Suret Meat Market website and a Telegram bot for order notifications.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- A Telegram bot created through BotFather

### Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - Copy `.env` file and update the values
   - Make sure to set your `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`

3. Start the server:
   ```
   npm run dev
   ```

### Getting Your Telegram Chat ID

1. Start a chat with your bot in Telegram
2. Send any message to your bot
3. Visit the following URL in your browser (replace with your actual token):
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
4. Look for the "chat" object in the JSON response and find the "id" field
5. Update the `TELEGRAM_CHAT_ID` in your `.env` file with this value

### Setting Up Webhook for Production

When deploying to production, you need to set up a webhook for your Telegram bot:

1. Deploy your server to your hosting provider
2. Run the webhook setup script:
   ```
   node setup-webhook.js
   ```
3. Enter your production URL when prompted (e.g., https://your-domain.com)

## API Endpoints

### POST /api/submit-order
Receives order data from the frontend and sends it to Telegram.

Request body:
```json
{
  "product": {
    "id": 1,
    "name": "Product Name",
    "description": "Product Description"
  },
  "values": {
    "weight": "1",
    "name": "Customer Name",
    "phone": "1234567890",
    "city": "City Name",
    "extras": {
      "grill": true,
      "charcoal": false
    }
  }
}
```

### POST /api/telegram-webhook
Endpoint that receives updates from Telegram.

### POST /api/setup-webhook
Endpoint to set up the Telegram webhook programmatically.

Request body:
```json
{
  "url": "https://your-domain.com"
}
```
