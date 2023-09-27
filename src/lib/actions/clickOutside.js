/**
 *
 * @param node
 *
 * @param params
 *
 * @param params.callback
 */
export function clickOutside(node, { callback, isEnabled }) {
	const handleClick = (event) => {
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

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
