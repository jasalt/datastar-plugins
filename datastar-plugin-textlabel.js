// Icon: icon-park-outline:text-recognition
// Slug: Binds the text content of an element with value translated in window.labels object.
// Description: Like data-text but resolves a "translated" text value from window.labels object.

// Copyright: Jarkko Saltiola
// License: BSD-3

// Interactive demo on Codepen: https://codepen.io/jasalt/pen/qEbjwbQ
// Repo: https://codeberg.org/jasalt/datastar-plugins / https://github.com/jasalt/datastar-plugins

// Example:

// With object defined in user's JavaScript and bound to window object:
// const labels = {
// 	"search": {
// 		"mode": {
// 			"music": "Music",
// 			"sfx": "SFX",
// 			"all": "All",
// 		}
// 	}
// window.labels = labels;

// Usage: <p data-on-load-search.mode="music" data-textlabel="$search.mode"></p>
// Result: <p data-signals-search.mode="music" data-textlabel="$search.mode">Music</p>

import { load, apply } from './datastar.js' // Tested with Datastar 1.0 RC5 (including Pro)

// console.log("Plugin init")

// Define the plugin
const TextlabelPlugin = {
	type: 'attribute',
	name: 'textlabel',
	keyReq: 'denied',
	valReq: 'must',
	returnsValue: true,
	onLoad: ({ el, effect, rx, runtimeErr, value }) => {
		// console.log("Plugin onLoad")
		const update = () => {
			observer.disconnect()
			const signalValue = rx()

			// console.log("Plugin update, value: " + value + " evaluating to " + signalValue)

			const labels = window.labels
			if (!labels) {
				throw runtimeErr('LabelsObjectNotFound', {
					message: 'Global labels object not found on window.labels'
				})
			}

			// Parse the signal path from the evaluated value

			const pathMatch = String(value).match(/^\$([a-zA-Z_][a-zA-Z0-9_.]*)$/)?.[1]
			if (!pathMatch) {
				throw runtimeErr('InvalidLabelPath', {
					message: 'Could not extract label path from expression'
				})
			}

			const pathSegments = pathMatch.split('.')
			let labelObj = labels
			for (const segment of pathSegments) {
				if (labelObj && typeof labelObj === 'object') {
					labelObj = labelObj[segment]
				} else {
					labelObj = undefined
					break
				}
			}

			const label = labelObj?.[signalValue]
			if (label === undefined) {
				console.warn(`Label not found for path: ${pathSegments.join('.')}.${signalValue}`)
				el.textContent = signalValue
			} else {
				el.textContent = `${label}`
			}

			observer.observe(el, {
				childList: true,
				characterData: true,
				subtree: true,
			})
		}

		const observer = new MutationObserver(update)
		const cleanup = effect(update)

		return () => {
			observer.disconnect()
			cleanup()
		}
	},
}

// Load the plugin into Datastar
load(TextlabelPlugin)

// Apply to existing elements
apply()

// TODO occasional `Uncaught (in promise) DOMException: The operation was aborted.` from apply
// might be fixed on RC6, report if not
