import Express from 'express';
import { Telegraf } from "telegraf";
import {CronJob} from 'cron';
import axios from 'axios';
import CC from 'currency-converter-lt';
const Bot = new Telegraf("2136672859:AAFigyVj3p8b-UPWKzYkYJcRBy6hliBnKdo");




Bot.start((ctx) => {
  const job = new CronJob("0 */1 * * * *", async function () {
   const result = await (await axios.get(`https://api.coingecko.com/api/v3/coins/raptoreum`)).data;
   const miner = await (await axios.get(`https://flockpool.com/api/v1/wallets/rtm/RNAUFxxiuppRUcK5MHNo4pp3MeZv1wif58`)).data;
   let currencyConverter = new CC({from:"USD", to:"COP", amount:Number(result.market_data.current_price.usd)})
   const cop = (await currencyConverter.convert()) * 1000
   const coins =  miner.balance.paid/100000000 
   ctx.reply(`
        ${result.name}
        ${result.symbol}
        ${result.market_data.current_price.usd} USD
        ${cop} COP
        ${coins}
        ${coins * cop}
   `);
  });
  job.start();
});


async function StartBot() {
    try {
      await Bot.launch();
      // eslint-disable-next-line no-console
      console.log('Bot On');
      // console.log(Bot.botInfo)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }


StartBot();

// const server = Express();
// server.listen(3000,() => console.log('Run'));