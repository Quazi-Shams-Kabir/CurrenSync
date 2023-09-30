// Uncomment 1,2,3,4 and Comment out 5,6 to use with api key
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// 1. To use env variables (hiding api key)
// import "dotenv/config";

const app = express();
const port = 3000;

// 5. Open use url
const API_URL = "https://open.er-api.com/v6/latest/";

// 2. Bearer token url
// const API_URL = "https://v6.exchangerate-api.com/v6/";

// 3. Add bearer token here
// const config = {
//   headers: { Authorization: `Bearer ${process.env.API_KEY}` },
// };

// to use static files like images, css etc
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// global var, to use this in post route too
var country = "";
app.get("/", async (req, res) => {
  try {
    // calling api and waiting for the result then run the next line of code
    // this api will check user's ip and returns two letter country code
    const result = await axios.get("https://api.country.is");
    country = result.data.country;
    res.render("index.ejs", {
      value: 1,
      currencies: curCode,
      country: country,
    });
  } catch (error) {
    res.send("Something is wrong on our side");
    console.log(error);
    res.status(500);
  }
});

// 6. Open access (without api key)
app.post("/", async (req, res) => {
  var data = [];
  try {
    const result = await axios.get(API_URL + req.body.from);
    // Open access is not allowing pair conversion, so this for conversion
    const ans = req.body.ammount * result.data.rates[req.body.to];
    // Adding all the data in this array to send it to ejs file
    data = [
      result.data.time_last_update_utc.slice(0,-5),
      result.data.time_next_update_utc.slice(0,-5),
      req.body.from,
      req.body.to,
      req.body.ammount,
      result.data.rates[req.body.to],
      ans,
    ];
    res.render("index.ejs", {
      value: data[4],
      currencies: curCode,
      country: country,
      data: data,
    });
  } catch (error) {
    res.send("Something is wrong on our side");
    console.log(error);
    res.status(500);
  }
});


// 4. For api key endpoint
// app.post("/", async (req, res) => {
//   var data = [];
//   try {
//     const result = await axios.get(
//       API_URL +
//         "/pair/" +
//         req.body.from +
//         "/" +
//         req.body.to +
//         "/" +
//         req.body.ammount,
//       config
//     );
//     data = [
//       result.data.time_last_update_utc.slice(0,-5),
//       result.data.time_next_update_utc.slice(0,-5),
//       req.body.from,
//       req.body.to,
//       req.body.ammount,
//       result.data.conversion_rate,
//       result.data.conversion_result,
//     ];
//     res.render("index.ejs", {
//       value: data[4],
//       currencies: curCode,
//       country: country,
//       data: data,
//     });
//     console.log(result.data.conversion_result);
//   } catch (error) {
//     res.status(500);
//   }
// });

app.listen(port,() => {
  console.log(`server started on ${port}`);
});

// \\ IMPROVEMENTS
// cache can be stored with apicache middleware
// for 24hrs(user's current time - next update) with the returned data,
// to not hit the api again and again, free tier have rate limitation,
// premium have certain no.s of calls per month (1hr cache max)
// as it refreshes every 24hrs (every day at 12am) with free and every 1hr for prem

// All the currency codes available in exchange rate api
var curCode = [
  "USD",
  "INR",
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "FOK",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KID",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TVD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XDR",
  "XOF",
  "XPF",
  "YER",
  "ZMW",
  "ZWL",
];
