// // ---------------------
// // Imports
// // ---------------------
// import Groq from "groq-sdk";
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import OAuth from "oauth-1.0a";
// import crypto from "crypto";
// import axios from "axios";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ======================================================
// // GROQ: Recipe Generation Endpoint
// // ======================================================
// const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// app.post("/api/recipe", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await client.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "llama-3.3-70b-versatile",
//     });

//     res.json({ recipe: response.choices[0].message.content });
//   } catch (err) {
//     console.error("Groq Error:", err);
//     res.status(500).json({ error: "Failed to generate recipe" });
//   }
// });

// // ======================================================
// // FATSECRET: OAuth Setup
// // ======================================================
// const fatSecretKey = process.env.FATSECRET_CONSUMER_KEY;
// const fatSecretSecret = process.env.FATSECRET_CONSUMER_SECRET;

// const oauth = OAuth({
//   consumer: { key: fatSecretKey, secret: fatSecretSecret },
//   signature_method: "HMAC-SHA1",
//   hash_function(baseString, key) {
//     return crypto.createHmac("sha1", key).update(baseString).digest("base64");
//   },
// });

// const BASE_URL = "https://platform.fatsecret.com/rest/server.api";

// // ======================================================
// // FATSECRET: Food Search Endpoint
// // GET /api/food/search?query=banana
// // ======================================================
// app.get("/api/food/search", async (req, res) => {
//   const { query } = req.query;

//   const requestData = {
//     url: `${BASE_URL}?method=foods.search&search_expression=${encodeURIComponent(
//       query
//     )}&format=json`,
//     method: "GET",
//   };

//   const headers = oauth.toHeader(oauth.authorize(requestData));

//   try {
//     const response = await axios.get(requestData.url, { headers });
//     res.json(response.data);
//   } catch (err) {
//     console.error("FatSecret Search Error:", err.response?.data || err.message);
//     res.status(500).json({ error: "Error fetching data from FatSecret" });
//   }
// });

// // ======================================================
// // FATSECRET: Detailed Nutrition Endpoint
// // GET /api/food/:id
// // ======================================================
// const formatNumber = (val) => {
//     const num = Number(val);
//     if (Number.isNaN(num)) return null;
  
//     const rounded = Math.round(num * 10) / 10;
//     return Number.isInteger(rounded) ? rounded : rounded;
//   };

// app.get("/api/food/:id", async (req, res) => {
//   const { id } = req.params;

//   // IMPORTANT: Use food.get.v2 (not food.get)
//   const requestData = {
//     url: `${BASE_URL}?method=food.get.v2&food_id=${id}&format=json`,
//     method: "GET",
//   };

//   const headers = oauth.toHeader(oauth.authorize(requestData));

//   try {
//     const response = await axios.get(requestData.url, { headers });
//     const food = response.data.food;

//     // Make sure servings is ALWAYS an array
//     let servings = food.servings.serving;
//     let serving = Array.isArray(servings) ? servings[0] : servings;    

//     const servingQty = parseFloat(serving.serving_description);
//     const unit = serving.serving_description.split(" ")[1];

//     // Return clean formatted data for React
//     const formatted = {
//       foodName: food.food_name,
//       brand: food.brand_name || null,
//       serving: servingQty, 
//       servingUnit: unit,
//       calories: formatNumber(serving.calories), 
//       protein: formatNumber(serving.protein), 
//       fat: formatNumber(serving.fat),
//       carbs: formatNumber(serving.carbohydrate)
//     };
//     res.json(formatted);
//   } catch (err) {
//     console.error(
//       "FatSecret Nutrition Error:",
//       err.response?.data || err.message
//     );
//     res.status(500).json({ error: "Error fetching nutrition info" });
//   }
// });

// // ======================================================
// // Start Server
// // ======================================================
// app.listen(5050, () =>
//   console.log("🚀 Server running on http://localhost:5050")
// );

import Groq from "groq-sdk";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import axios from "axios";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-vercel-app.vercel.app"
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Macro Map backend is running");
});

app.post("/api/recipe", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    res.json({ recipe: response.choices[0].message.content });
  } catch (err) {
    console.error("Groq Error:", err);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

const fatSecretKey = process.env.FATSECRET_CONSUMER_KEY;
const fatSecretSecret = process.env.FATSECRET_CONSUMER_SECRET;

const oauth = OAuth({
  consumer: {
    key: fatSecretKey,
    secret: fatSecretSecret,
  },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return crypto.createHmac("sha1", key).update(baseString).digest("base64");
  },
});

const BASE_URL = "https://platform.fatsecret.com/rest/server.api";

app.get("/api/food/search", async (req, res) => {
  const { query } = req.query;

  const requestData = {
    url: `${BASE_URL}?method=foods.search&search_expression=${encodeURIComponent(
      query
    )}&format=json`,
    method: "GET",
  };

  const headers = oauth.toHeader(oauth.authorize(requestData));

  try {
    const response = await axios.get(requestData.url, { headers });
    res.json(response.data);
  } catch (err) {
    console.error("FatSecret Search Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Error fetching data from FatSecret" });
  }
});

const formatNumber = (val) => {
  const num = Number(val);
  if (Number.isNaN(num)) return null;

  const rounded = Math.round(num * 10) / 10;
  return Number.isInteger(rounded) ? rounded : rounded;
};

app.get("/api/food/:id", async (req, res) => {
  const { id } = req.params;

  const requestData = {
    url: `${BASE_URL}?method=food.get.v2&food_id=${id}&format=json`,
    method: "GET",
  };

  const headers = oauth.toHeader(oauth.authorize(requestData));

  try {
    const response = await axios.get(requestData.url, { headers });
    const food = response.data.food;

    const servings = food.servings.serving;
    const serving = Array.isArray(servings) ? servings[0] : servings;

    const servingQty = parseFloat(serving.serving_description);
    const unit = serving.serving_description.split(" ")[1];

    const formatted = {
      foodName: food.food_name,
      brand: food.brand_name || null,
      serving: servingQty,
      servingUnit: unit,
      calories: formatNumber(serving.calories),
      protein: formatNumber(serving.protein),
      fat: formatNumber(serving.fat),
      carbs: formatNumber(serving.carbohydrate),
    };

    res.json(formatted);
  } catch (err) {
    console.error("FatSecret Nutrition Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Error fetching nutrition info" });
  }
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});