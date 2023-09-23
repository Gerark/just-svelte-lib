import Color from 'color';
import './tippy-theme.scss';
import './styles.scss';

export function createDefaultThemes() {
	return [
		{
			label: 'dark-juice',
			value: createTheme(
				'dark-juice',
				['#3f3731', '#FFFFFF'],
				['#ea861a', '#000000'],
				['#4570c0', '#121212'],
				['#4CAF50', '#000000'],
				['#008000', '#FFFFFF'],
				['#FFC107', '#121212'],
				['#FF0000', '#FFFFFF']
			)
		},
		{
			label: 'dust',
			value: createTheme(
				'dust',
				['#383838', '#9e9e9e'],
				['#333333', '#AAAAAA'],
				['#FFA726', '#121212'],
				['#4CAF50', '#000000'],
				['#008000', '#FFFFFF'],
				['#FFC107', '#121212'],
				['#FF0000', '#FFFFFF']
			)
		},
		{
			label: 'crimson',
			value: createTheme(
				'crimson',
				['#666699', '#9e9e9e'],
				['#DC143C', '#AAAAAA'],
				['#FFA726', '#121212'],
				['#4CAF50', '#000000'],
				['#008000', '#FFFFFF'],
				['#FFC107', '#121212'],
				['#FF0000', '#FFFFFF']
			)
		}
	];
}

export function createTheme(
	id,
	[surface, onSurface],
	[primary2, onPrimary],
	[secondary, onSecondary],
	[tertiary, ontertiary],
	[success, onSuccess],
	[warning, onWarning],
	[error, onError]
) {
	let theme = {
		id: id,
		name: id,
		properties: {}
	};

	addColor(theme.properties, surface, onSurface, 'surface');
	addColor(theme.properties, primary2, onPrimary, 'primary');
	addColor(theme.properties, secondary, onSecondary, 'secondary');
	addColor(theme.properties, tertiary, ontertiary, 'tertiary');
	addColor(theme.properties, success, onSuccess, 'success');
	addColor(theme.properties, warning, onWarning, 'warning');
	addColor(theme.properties, error, onError, 'error');

	addComponentProperties(theme.properties);

	theme.properties['animation-click-duration'] = '0.15s';
	theme.properties['animation-hover-duration'] = '0.25s';
	theme.properties['gap-default'] = '5px';
	theme.properties['font-family'] = 'Lucida Sans, serif';
	return theme;
}

function addColor(properties, color, onColor, name) {
	let step = 0.15;
	properties[name] = color;
	for (let value = step, i = 1; i < 5; ++i) {
		properties[`${name}-d${i}`] = Color(color).darken(value);
		properties[`${name}-l${i}`] = Color(color).lighten(value);
		value += step;
	}
	properties[`on-${name}`] = onColor;
}

function addComponentProperties(properties) {
	properties['bg-color'] = properties['surface-d4'];
	properties['bg-component-color'] = properties['surface-d2'];
	properties['bg-content-color'] = properties['surface-d3'];
	properties['bg-highlighted-text-color'] = properties['tertiary'];
	properties['bg-selected-color'] = properties['primary'];
	properties['bg-hover-color'] = Color(properties['primary']).alpha(0.1);

	properties['txt-default-color'] = properties['on-surface'];
	properties['txt-inactive-color'] = Color(properties['on-surface']).alpha(0.5);
	properties['txt-selected-color'] = properties['on-primary'];
	properties['txt-highlighted-color'] = properties['on-tertiary'];

	properties['sep-color'] = properties['surface'];

	properties['scroll-color'] = properties['surface'];
	properties['scroll-hover-color'] = properties['surface-l1'];

	properties['border-width'] = '1px';
	properties['border-radius'] = '10px';
	properties['border-default-color'] = properties['surface-l1'];
	properties['border-hover-color'] = properties['primary'];
	properties['border-focus-color'] = properties['primary'];
	properties['border-active-color'] = properties['primary'];

	properties['bg-treeviewitem-color'] = 'transparent';
	properties['bg-treeviewitem-hover-color'] = properties['bg-hover-color'];
	properties['bg-treeviewitem-focus-color'] = properties['primary'];
	properties['bg-treeviewitem-focus-text-color'] = properties['on-primary'];

	properties['bg-button-color'] = properties['primary'];
	properties['bg-button-hover-color'] = properties['primary-l1'];
	properties['txt-button-color'] = properties['on-primary'];

	properties['icon-default-color'] = properties['on-surface'];
	properties['icon-hover-color'] = properties['primary'];
	properties['icon-treeviewitem-color'] = properties['primary-l3'];
}
