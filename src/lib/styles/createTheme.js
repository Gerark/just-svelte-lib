import Color from 'color';
import './tippy-theme.scss';

export function createDefaultThemes() {
	return [
		{
			label: 'dark',
			value: createTheme('dark', '#383838', '#9e9e9e', '#0070e0', '#77c5f9', '#8bc24a', '#000000')
		},
		{
			label: 'red',
			value: createTheme('red', '#883838', '#889e9e', '#8870e0', '#88c5f9', '#88c24a', '#000000')
		}
	];
}

export function createTheme(id, primary, text, active, icon, highlight, textHighlight) {
	return {
		id: id,
		name: id,
		colors: {
			primary: primary,
			primary2: Color(primary).darken(0.35).hex(),
			primary3: Color(primary).darken(0.53).hex(),
			primary4: Color(primary).lighten(0.55).hex(),
			primary5: Color(primary).lighten(1.28).hex(),
			text: text,
			text1: Color(text).darken(0.215).hex(),
			text2: Color(text).lighten(0.215).hex(),
			textHighlight: textHighlight,
			active: active,
			icon: icon,
			highlight: highlight,
			'highlight-text': primary
		}
	};
}
