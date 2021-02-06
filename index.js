require("dotenv/config")
const express = require("express")
const configureServer = require("./src/config/serverConfig")
const PORT = process.env.PORT || 56989

const { initDatabase } = require("./src/config/database")

const app = configureServer(express)

app.listen(PORT, async () => {
  try {
    await initDatabase()
    console.log(`\n>> Server open on port ${PORT}\n`)
  } catch (error) {
    console.log(">> Não foi possivel conectar ao banco de dados:\n\n", error,"\n\n")
  }

})