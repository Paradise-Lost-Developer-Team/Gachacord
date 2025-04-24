# Daily Gacha Bot

## Overview
The Daily Gacha Bot is a Discord bot designed to engage and entertain community members through a daily gacha system. Users can participate in gacha draws to win various items or rewards, enhancing community interaction and fun.

## Features
- **Daily Gacha Draws**: Users can participate in daily gacha draws to win random items or rewards.
- **Help Command**: Provides users with information on how to use the bot and its commands.
- **Error Logging**: Logs errors for better debugging and monitoring of the bot's performance.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- TypeScript
- A Discord bot token (create a bot on the Discord Developer Portal)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd daily-gacha-bot
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Configuration
1. Create a `config.json` file in the `data` directory with the following structure:
   ```json
   {
       "TOKEN": "YOUR_DISCORD_BOT_TOKEN"
   }
   ```
   Replace `YOUR_DISCORD_BOT_TOKEN` with your actual Discord bot token.

### Running the Bot
To start the bot, run the following command:
```
npm start
```

## Commands
- `/gacha`: Execute the gacha command to draw a random item or reward.
- `/help`: Get a list of available commands and their usage.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.