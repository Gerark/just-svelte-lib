/**
 *
 * @param node
 *
 * @param params
 */
export function useWrapper(node, actions) {
	let callbacks = [];
	actions.forEach((action) => {
		callbacks.push(action.run(node, action.params));
	});

	return {
		destroy() {
			callbacks.forEach((callback) => {
				callback.destroy();
			});
		}
	};
}
