import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { add } from 'demo'
import type { AddResult } from 'demo'
import { users } from 'models'
import type { UserData } from 'models'
import { createFactory, createMiddleware } from 'hono/factory'

const app = new Hono()

const factory = createFactory()

const auth = factory.createMiddleware(async (ctx, next) => {
  ctx.set('user', { name: "" })
  await next()
})

app.use(auth)

factory.createHandlers(auth, async (ctx) => {

})

app.get('/', auth, (c) => {
  c.var
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
