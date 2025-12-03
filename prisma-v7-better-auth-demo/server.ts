import { Hono } from 'hono'
import { auth } from './auth'
import { serve } from '@hono/node-server'

const app = new Hono()

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

serve(app, (info) => {
  console.log(`Server running on ${info.address}:${info.port}`)
})
