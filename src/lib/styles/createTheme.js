import Color from 'color';
import './tippy-theme.scss';
import './styles.scss';

export function createDefaultThemes() {
	return [
		{
			id: 0,
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
			id: 1,
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
			id: 2,
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

	let baseColors = {};
	addColor(baseColors, surface, onSurface, 'surface');
	addColor(baseColors, primary2, onPrimary, 'primary');
	addColor(baseColors, secondary, onSecondary, 'secondary');
	addColor(baseColors, tertiary, ontertiary, 'tertiary');
	addColor(baseColors, success, onSuccess, 'success');
	addColor(baseColors, warning, onWarning, 'warning');
	addColor(baseColors, error, onError, 'error');

	addComponentProperties(theme.properties, baseColors);

	/* These are default values already defined ( change the logic once we can customize them )
        theme.properties['animation-click-duration'] = '0.15s';
        theme.properties['animation-hover-duration'] = '0.25s';
        theme.properties['gap-default'] = '5px';
        theme.properties['padding-thick'] = '5px';
        theme.properties['padding-thin'] = '2px';
        theme.properties['font-family'] = 'Lucida Sans, serif';
        theme.properties['font-default-size'] = '12px';
        theme.properties['border-width'] = '1px';
        theme.properties['border-radius'] = '10px';
    */
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

function addComponentProperties(properties, baseColors) {
	properties['bg-color'] = baseColors['surface-d4'].toString();
	properties['bg-component-color'] = baseColors['surface-d2'].toString();
	properties['bg-content-color'] = baseColors['surface-d3'].toString();
	properties['bg-highlighted-text-color'] = baseColors['tertiary'].toString();
	properties['bg-selected-color'] = baseColors['primary'].toString();
	properties['bg-hover-color'] = baseColors['primary-d4'].toString();
	properties['bg-table-even'] = baseColors['surface-d2'].toString();
	properties['bg-table-odd'] = baseColors['surface-d1'].toString();

	properties['txt-default-color'] = baseColors['on-surface'].toString();
	properties['txt-inactive-color'] = Color(baseColors['on-surface']).alpha(0.5).toString();
	properties['txt-selected-color'] = baseColors['on-primary'].toString();
	properties['txt-highlighted-color'] = baseColors['on-tertiary'].toString();

	properties['sep-color'] = baseColors['surface'].toString();

	properties['scroll-color'] = baseColors['surface'].toString();
	properties['scroll-hover-color'] = baseColors['surface-l1'].toString();

	properties['border-default-color'] = baseColors['surface-l1'].toString();
	properties['border-hover-color'] = baseColors['primary'].toString();
	properties['border-focus-color'] = baseColors['primary'].toString();
	properties['border-active-color'] = baseColors['secondary'].toString();

	properties['bg-treeviewitem-color'] = 'transparent';
	properties['bg-treeviewitem-hover-color'] = properties['bg-hover-color'].toString();
	properties['bg-treeviewitem-focus-color'] = baseColors['primary'].toString();
	properties['bg-treeviewitem-focus-text-color'] = baseColors['on-primary'].toString();

	properties['bg-button-color'] = baseColors['primary'].toString();
	properties['bg-button-hover-color'] = baseColors['primary-l1'].toString();
	properties['txt-button-color'] = baseColors['on-primary'].toString();

	properties['icon-default-color'] = baseColors['on-surface'].toString();
	properties['icon-hover-color'] = baseColors['primary'].toString();
	properties['icon-treeviewitem-color'] = baseColors['primary-l3'].toString();

	properties['checkmark-default-color'] = baseColors['primary'].toString();
}
