import { writable } from 'svelte/store';

export const genericTooltipStore = createTooltipStore();

export function createTooltipStore() {
	const { set, update, subscribe } = writable({
		delay: { start: 0, end: 2500 }
	});

	function setContent(content) {
		update((x) => {
			x.content = content;
			return x;
		});
	}

	function setVisible(flag) {
		update((x) => {
			x.visible = flag;
			return x;
		});
	}

	return {
		subscribe,
		setContent,
		setVisible
	};
}
