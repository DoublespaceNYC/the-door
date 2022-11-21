import { Handler } from '@netlify/functions'
import { URLSearchParams } from 'url'
// import fetch from 'node-fetch'
const fetch = require('node-fetch')

const handler: Handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const errorGen = (msg: string) => {
    return { statusCode: 500, body: msg }
  }

  try {
    const { email, name, company, accessToken } = JSON.parse(event.body as string)

    const subscriber = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        NAME: name,
        COMPANY: company,
      },
    }

    const subscriptionKey = "792f6909bb284360a5c22b665c948254"

    const params = {}

    const response = await fetch(
      `https://api.sky.blackbaud.com/constituent/v1/constituents?${new URLSearchParams(params)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Bb-Api-Subscription-Key': subscriptionKey,
        },
        body: JSON.stringify(subscriber),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: data.status, body: data.detail }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "You've signed up to the mailing list!",
        detail: data,
      }),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify(err), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
