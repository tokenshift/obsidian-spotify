import { MarkdownPostProcessorContext, Plugin, parseYaml } from 'obsidian'
import { getEmbed, getEmbedIframe } from 'src/spotify'

export default class SpotifyPlugin extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor('spotify', (source, el, ctx) => this.handleSpotifyCodeBlock(source, el, ctx))
	}

	async handleSpotifyCodeBlock (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
		const { url } = parseYaml(source)

		const embed = await getEmbedIframe(url)
		el.appendChild(embed)

		// TODO: How are sessions/cookies handled for an iframe embed like this?
		// I.e. how do I get the Spotify embed to recognize my login and not just
		// give me the song preview?
	}
}
