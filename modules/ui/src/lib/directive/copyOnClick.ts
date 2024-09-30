export const copyOnClick = (node: HTMLElement, content?: string) => {

  const eventListener = () => {
    navigator.clipboard.writeText(content || node.innerText)
  }

  node.addEventListener("click", eventListener)

	return {
		destroy() {
			node.removeEventListener("click", eventListener)
		}
	};
}