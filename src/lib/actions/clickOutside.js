/**
 *
 * @param node
 *
 * @param params
 *
 * @param params.callback
 */
export function clickOutside(node, { callback, isEnabled, isOutside = (node, target) => true }) {
	const handleClick = (event) => {
		if (
			node &&
			!node.contains(event.target) &&
			isOutside(node, event.target) &&
			!event.defaultPrevented &&
			callback &&
			(!isEnabled || isEnabled())
		) {
			callback();
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
