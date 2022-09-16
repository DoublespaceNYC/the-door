import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

const handler: Handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const errorGen = (msg: string) => {
    return { statusCode: 500, body: msg }
  }

  try {
    const { email, name, company, listId } = JSON.parse(event.body as string)

    if (!email) {
      return errorGen('Missing Email')
    }

    const prefixServer = 'us4'

    const subscriber = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        NAME: name,
        COMPANY: company,
      },
    }
    const creds = `any:${process.env.MAILCHIMP_KEY}`
    const response = await fetch(
      `https://${prefixServer}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(creds).toString('base64')}`,
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
      body: JSON.stringify({ err }), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
