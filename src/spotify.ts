import axios from 'axios'

export const baseURL = 'https://open.spotify.com'

export async function getEmbed (url: string) {
  const client = axios.create({
    baseURL
  })

  const { data } = await client.get('/oembed', {
    params: { url }
  })

  return data
}