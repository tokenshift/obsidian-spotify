import parse from "node-html-parser"
import { requestUrl } from "obsidian"

export const baseURL = 'https://open.spotify.com'

export async function getEmbed (songUrl: string) {
  const url = new URL('/oembed', baseURL)
  url.searchParams.set('url', songUrl)
  const response = await requestUrl(url.toString())
  return response.json
}

export async function getEmbedIframe (songUrl: string) {
  const { html } = await getEmbed(songUrl)
  const parsed = parse(html).firstChild

  const iframe = document.createElement('iframe')
  iframe.src = parsed.attributes['src']
  iframe.title = parsed.attributes['title']
  iframe.height = parsed.attributes['height']
  iframe.width = '100%'
  iframe.allowFullscreen = true
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture'
  iframe.loading = 'lazy'

  return iframe
}
