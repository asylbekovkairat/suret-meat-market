
/**
 * Utility to send messages to a Telegram bot
 * In a real application, this would call a server endpoint
 */

export interface TelegramOrderMessage {
  productName: string;
  name: string;
  phone: string;
  weight: string;
  city: string;
}

export const sendTelegramMessage = async (order: TelegramOrderMessage): Promise<boolean> => {
  // In a production environment, this would call a secure backend endpoint
  // that has your bot token stored safely
  
  // Format message for Telegram
  const weightNum = parseFloat(order.weight);
  const skewers = weightNum * 5;
  const people = weightNum * 4;
  
  const message = `
🆕 Новый заказ:
Продукт: ${order.productName}
Имя: ${order.name}
Телефон: ${order.phone}
Кол-во: ${order.weight} кг (≈ ${skewers} шампуров, на ${people} чел.)
Город: ${order.city}
  `;

  console.log("Would send to Telegram:", message);
  
  // For demonstration, we'll just simulate a successful API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
  
  /* 
  Real implementation would be something like:
  
  const response = await fetch('https://your-backend-endpoint.com/api/telegram-webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message
    }),
  });
  
  return response.ok;
  */
};
