type Options = {
  text: string,
  durationInMillis?: number
}

export const clickText = (node: HTMLElement, options: Options) => {
	
  const defaultText = node.innerText

  const eventListener = () => {
    node.innerText = options.text
    setTimeout(() => {
      node.innerText = defaultText
    }, options.durationInMillis || 3000)
  }

  node.addEventListener("click", eventListener)

	return {
		destroy() {
			node.removeEventListener("click", eventListener)
		}
	};
}