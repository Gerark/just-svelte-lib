import Color from 'color';
import './tippy-theme.scss';

export default function createTheme(id, primary, text, active, icon, highlight) {
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
			active: active,
			icon: icon,
			highlight: highlight,
			'highlight-text': primary
		}
	};
}
