/**
 *
 * @param node
 *
 * @param params
 *
 * @param params.callback
 */
export function scrollOutside(node, { callback, isEnabled }) {
	const handleScroll = (event) => {
		if (
			node &&
			!node.contains(event.target) &&
			!event.defaultPrevented &&
			callback &&
			(!isEnabled || isEnabled())
		) {
			callback();
		}
	};

	document.addEventListener('scroll', handleScroll, true);

	return {
		destroy() {
			document.removeEventListener('scroll', handleScroll, true);
		}
	};
}
