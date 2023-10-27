/**
 *
 * @param node
 *
 * @param params
 */
export function addClass(node, classes) {
	classes.forEach((styleClass) => {
		node.classList.add(styleClass);
	});

	return {
		destroy() {
			classes.forEach((styleClass) => {
				node.classList.remove(styleClass);
			});
		}
	};
}
