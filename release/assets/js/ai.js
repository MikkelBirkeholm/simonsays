import * as dotenv from '../../node_modules/dotenv'
dotenv.config()
console.log(process.env)

// fetch("https://api.openai.com/v1/completions", {
//   body: "{'model': 'text-davinci-003', 'prompt': 'Say this is a test', 'temperature': 0, 'max_tokens': 7}",
//   headers: {
//     Authorization: "Bearer YOUR_API_KEY",
//     "Content-Type": "application/json"
//   },
//   method: "POST"
// })