import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { add } from 'demo'
import type { AddResult } from 'demo'

const app = new Hono()

app.get('/', (c) => {
  const result: AddResult = add(1, 2)
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on port ${port}`)
serve({
  fetch: app.fetch,
  port
})
