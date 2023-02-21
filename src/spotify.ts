import { requestUrl } from "obsidian"

export const baseURL = 'https://open.spotify.com'

export async function getEmbed (songUrl: string) {
  const url = new URL('/oembed', baseURL)
  url.searchParams.set('url', songUrl)
  const response = await requestUrl(url.toString())
  return response.json
}
