import tippy, { followCursor } from 'tippy.js';

export function justTooltip(node, description) {
	if (!tippy) {
		return;
	}

	let params = {
		content: `<div class="just-tooltip-content" data-theme="just">${description}</div>`,
		theme: 'just',
		placement: 'bottom-start',
		animation: 'fade',
		duration: [250, 0],
		delay: [250, 0],
		offset: [15, 15],
		allowHTML: true,
		plugins: [followCursor],
		followCursor: true,
		popperOptions: {
			strategy: 'fixed',
			modifiers: [
				{
					name: 'preventOverflow',
					enabled: true,
					options: {
						mainAxis: true,
						altAxis: true
					}
				},
				{
					name: 'flip',
					enabled: false
				}
			]
		}
	};

	const tip = tippy(node, { ...params });

	return {
		update: (newParams) => {
			tip.setProps({ ...newParams });
		},
		destroy: () => tip.destroy()
	};
}
