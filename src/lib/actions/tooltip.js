import { popupSource } from '$lib/actions/popup.js';
import { genericTooltipStore } from '$lib/components/Tooltip/tooltipStore.js';

export function genericTooltip(node, { content, tooltipStore }) {
	let destroy;
	if (content && content.length > 0) {
		const store = tooltipStore ?? genericTooltipStore;
		destroy = popupSource(node, {
			popupId: 'global-tooltip',
			mode: 'hover',
			onTrigger: () => {
				store.setVisible(true);
				store.setContent(content);
			},
			onHide: () => {
				store.setVisible(false);
			}
		});
	}

	return {
		destroy,
		update: ({ content, tooltipStore }) => {
			if (content && content.length > 0) {
				const store = tooltipStore ?? genericTooltipStore;
				store.setContent(content);
			}
		}
	};
}
