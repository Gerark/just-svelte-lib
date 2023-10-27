import { autoPlacement, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

let popups = [];

function triggerPopup(popupId, element, onTrigger) {
	let popup = popups.find((x) => x.popupId === popupId);
	if (popup) {
		popup.triggerBy(element, onTrigger);
	}
}

function hidePopup(popupId, element, onHidden) {
	let popup = popups.find((x) => x.popupId === popupId);
	if (popup) {
		popup.hideBy(element, onHidden);
	}
}

export function popupSource(node, { popupId, mode, flagStore, onTrigger, onHide }) {
	if (mode === 'hover') {
		return popupOnMouseHover(node, popupId, onTrigger, onHide);
	} else {
		return popupOnFlagStore(node, popupId, flagStore, onTrigger, onHide);
	}
}

export function popupOnMouseHover(node, popupId, onTrigger, onHide) {
	function mouseenter() {
		triggerPopup(popupId, node, onTrigger);
	}

	function mouseleave() {
		hidePopup(popupId, node, onHide);
	}

	node.addEventListener('mouseenter', mouseenter);
	node.addEventListener('mouseleave', mouseleave);

	return {
		destroy: () => {
			node.removeEventListener('mouseenter', mouseenter);
			node.removeEventListener('mouseleave', mouseleave);
		}
	};
}

export function popupOnFlagStore(node, popupId, flagStore, onTrigger, onHide) {
	let unsubscribe = flagStore.subscribe((flag) => {
		if (flag) {
			triggerPopup(popupId, node, onTrigger);
		} else {
			hidePopup(popupId, node, onHide);
		}
	});

	return {
		destroy: () => {
			unsubscribe();
		}
	};
}

export function popupTarget(node, params) {
	node.style.position = params.strategy ?? 'absolute';
	let stopAutoCompute;
	let showTimeout = -1;
	let hideTimeout = -1;
	setVisibility(false);

	function setVisibility(visible) {
		node.style.display = visible ? 'block' : 'none';
	}

	function clearShowTimeout() {
		if (showTimeout >= 0) {
			clearTimeout(showTimeout);
			showTimeout = -1;
		}
	}

	function clearHideTimeout() {
		if (hideTimeout >= 0) {
			clearTimeout(hideTimeout);
			hideTimeout = -1;
		}
	}

	function show(source, onShown) {
		if (params.delay && params.delay.show) {
			showTimeout = setTimeout(() => {
				clearHideTimeout();
				setVisibility(true);
				if (onShown) onShown();
				stopAutoCompute = startAutoCompute(source);
			}, params.delay.show);
		} else {
			setVisibility(true);
			if (onShown) onShown();
			stopAutoCompute = startAutoCompute(source);
		}
	}

	function hide(onHidden) {
		if (params.delay && params.delay.hide) {
			clearShowTimeout();
			hideTimeout = setTimeout(() => {
				setVisibility(false);
				if (onHidden) onHidden();
			}, params.delay.hide);
		} else {
			setVisibility(false);
			if (onHidden) onHidden();
		}
	}

	function startAutoCompute(source) {
		if (stopAutoCompute) {
			stopAutoCompute();
			stopAutoCompute = null;
		}

		let middleware = [];
		if (typeof params.placement == 'object') {
			const customPosition = {
				name: 'customPosition',
				fn({ x, y }) {
					return {
						x: params.placement.x,
						y: params.placement.y
					};
				}
			};
			middleware.push(customPosition);
		}
		middleware.push(flip(), shift(), offset(params.offset ?? 10));
		if (!params.placement) {
			middleware.push(autoPlacement());
		}

		let compute = () => {
			computePosition(source, node, {
				placement: typeof params.placement === 'string' ? params.placement : undefined,
				strategy: params.strategy ?? 'absolute',
				middleware
			}).then(({ x, y }) => {
				Object.assign(node.style, {
					left: `${x}px`,
					top: `${y}px`,
					'z-index': '999999'
				});
			});
		};

		if (params.noAutoUpdate) {
			compute();
			return () => {};
		} else {
			return autoUpdate(source, node, compute);
		}
	}

	popups.push({
		popupId: params.popupId,
		triggerBy: (element, onShown) => {
			show(element, onShown);
		},
		hideBy: (element, onHidden) => {
			if (stopAutoCompute) {
				stopAutoCompute();
			}
			hide(onHidden);
		}
	});
}
