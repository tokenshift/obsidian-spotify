import { MarkdownPostProcessorContext, Plugin, parseYaml } from 'obsidian'
import { getEmbed } from 'src/spotify'

export default class SpotifyPlugin extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor('spotify', (source, el, ctx) => this.handleSpotifyCodeBlock(source, el, ctx))
	}

	async handleSpotifyCodeBlock (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
		const { url } = parseYaml(source)

		const embed = await getEmbed(url)

		const div = document.createElement('div')
		div.classList.add('obsidian-spotify')
		div.innerHTML = embed.html
		el.appendChild(div)

		// TODO: How are sessions/cookies handled for an iframe embed like this?
		// I.e. how do I get the Spotify embed to recognize my login and not just
		// give me the song preview?
	}
}
