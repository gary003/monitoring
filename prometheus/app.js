const express = require("express")
const prom = require("prom-client")
const logger = require("morgan")

const app = express()

app.use(logger("dev"))

const collectDefaultMetrics = prom.collectDefaultMetrics
// probe every 5 seconds
collectDefaultMetrics({ timeout: 5000 })

app.get("/", (req, res) => {
  return res.status(200).send("Hello World")
})

app.get("/metrics", async (_, res) => {
  res.set("Content-Type", prom.register.contentType)
  return res.status(200).send(await prom.register.metrics())
})

const API_PORT = process.env.API_PORT || 3000
app.listen(API_PORT, () => {
  console.log(`Listening on port ${API_PORT}`)
})
