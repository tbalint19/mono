import { createExpressEndpoints, initServer } from '@ts-rest/express'
import express from 'express'
import { authContract } from '@auth/contract'

const server = express()
server.use(express.json())

server.listen(3000, () => console.log("STARTED"))