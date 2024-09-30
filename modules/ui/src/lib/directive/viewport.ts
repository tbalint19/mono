import type { ActionReturn } from 'svelte/action';

interface Attributes {
	'on:enterViewport': () => void
	'on:exitViewport': () => void
}

let intersectionObserver: IntersectionObserver;

const ensureIntersectionObserver = () => {
	if (intersectionObserver) return;

  intersectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach(entry => {
				const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
				entry.target.dispatchEvent(new CustomEvent(eventName))
			})
		}
	)
}

export const viewport = (element: HTMLElement): ActionReturn<void, Attributes> => {
	ensureIntersectionObserver()

	intersectionObserver.observe(element)

	return {
		destroy() {
			intersectionObserver.unobserve(element)
		}
	}
}