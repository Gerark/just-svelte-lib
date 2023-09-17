export default function updateTheme(element, theme) {
	if (element && theme && theme.colors) {
		for (let [prop, color] of Object.entries(theme.colors)) {
			let varString = `--theme-just-${prop}`;
			element.style.setProperty(varString, color);
		}
		element.style.setProperty('--theme-just-name', theme.name);
	}
}
