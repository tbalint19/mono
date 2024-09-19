import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { add } from '../../../../packages/demo/out'
import type { AddResult } from '../../../../packages/demo/out'
import { users } from '../../../../packages/models/out'
import type { UserData } from '../../../../packages/models/out'

const app = new Hono()

app.get('/', (c) => {
  const result: AddResult = add(1, 2)
  const col = users.username
  const data: UserData = { age: 10 }
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on port ${port}`)
serve({
  fetch: app.fetch,
  port
})
