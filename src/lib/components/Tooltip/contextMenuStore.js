import { writable } from 'svelte/store';

export function createContextMenuStore(id) {
	let { set, update, subscribe } = writable({
		id: id,
		mousePosition: { x: 0, y: 0 },
		controller: null,
		visibilityFlag: writable(false)
	});

	return {
		set,
		update,
		subscribe,
		show: () => {
			update((x) => {
				x.visibilityFlag.set(true);
				return x;
			});
		},
		hide: () => {
			update((x) => {
				x.visibilityFlag.set(false);
				return x;
			});
		}
	};
}
