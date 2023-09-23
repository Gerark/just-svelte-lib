export default function flexItems(node, flex) {
	setFlexItemProperties(node, flex, 'flex');
	return {
		destroy() {}
	};
}

function setFlexItemProperties(node, items, property) {
	if (items.length > 0) {
		let index = 0;
		node.childNodes.forEach((x) => {
			if (x.tagName) {
				if (index < items.length) {
					x.style[property] = items[index];
				}
				++index;
			}
		});
	}
}
