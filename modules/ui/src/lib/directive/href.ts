type Options = {
  hash: string,
  delay?: number,
  soft?: boolean,
  path?: string,
}

export const href = (node: HTMLElement, { hash, delay, soft, path }: Options) => {

  const eventListener = (event: Event) => {
    event.stopPropagation()
    if (!path || path === window.location.pathname)
      setTimeout(() => {
        if (!soft)
          window.location.hash = "re-scroll"
        window.location.hash = hash
      }, delay || 0)
    else
      window.location.href = path +  (hash ? "#" + hash : "")
      
  }

  node.addEventListener("click", eventListener)

	return {
		destroy() {
			node.removeEventListener("click", eventListener)
		}
	};
}