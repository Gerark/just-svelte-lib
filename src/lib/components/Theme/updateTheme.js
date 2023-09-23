export default function updateTheme(element, theme) {
	if (element && theme && theme.properties) {
		for (let [prop, propertyValue] of Object.entries(theme.properties)) {
			let varString = `--theme-just-${prop}`;
			element.style.setProperty(varString, propertyValue);
		}
		element.style.setProperty('--theme-just-name', theme.name);
	}
}
