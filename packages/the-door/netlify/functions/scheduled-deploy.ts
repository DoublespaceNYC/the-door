import fetch from 'node-fetch'
import { schedule } from '@netlify/functions'

const buildHookUrl =
  `https://api.netlify.com/build_hooks/${process.env.BUILD_HOOK_NIGHTLY}`

export const handler = schedule('0 8 * * *', async () => {
  try {
    const response = await fetch(buildHookUrl, { method: 'POST' })
    if (response.ok) {
      console.log('Build hook response:', response)
    }
    return {
      statusCode: 200
    }
  } catch (error) {
    console.log('Build hook error:', error)
    return {
      statusCode: 500
    }
  }
})