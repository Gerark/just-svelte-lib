import { writable } from 'svelte/store';
import { themes as allThemes, currentTheme } from './lib/styles/themeStore.js';

export const currentItem = writable({});

export const configuration = writable([
	{
		id: 0,
		label: 'Bool Property with a long name just to test if everything works as expected',
		store: writable(false),
		description: 'Tooltip Text'
	},
	{
		id: 1,
		label: 'String Property',
		type: 'Text',
		store: writable(''),
		description: 'Tooltip Text'
	},
	{
		id: 2,
		label: 'Select Theme',
		type: 'Enum',
		values: allThemes,
		store: currentTheme,
		description: 'Tooltip Text'
	},
	{
		id: 3,
		label: 'Number Property',
		type: 'Number',
		store: writable(10),
		description: 'Tooltip Text'
	},
	{
		id: 4,
		label: 'Function Property',
		type: 'Function',
		store: writable(() => {
			console.log('FUNCTION CALL');
		}),
		description: 'Tooltip Text'
	},
	{
		id: 5,
		label: 'Themes',
		dndzone: 'themes',
		create: (event) => {
			event.detail.result = {
				label: 'new-theme',
				value: 'new-theme'
			};
		},
		copy: (event) => {
			let clone = structuredClone(event.detail.item);
			event.detail.result = clone;
		},
		listUpdated: (event) => {
			allThemes.set(event.detail);
		},
		store: allThemes,
		description: 'Tooltip Text'
	}
]);

export const fakeData = writable([
	{
		id: 0,
		label: 'HTML',
		items: [
			{
				id: 8,
				label: 'HTML Basics',
				items: [
					{
						id: 16,
						label: 'HTML Tags',
						description: 'This covers basic HTML tags.'
					},
					{
						id: 17,
						label: 'HTML Structure',
						description: 'This explains the structure of an HTML document.'
					}
				]
			},
			{
				id: 9,
				label: 'HTML Forms',
				items: [
					{
						id: 18,
						label: 'Form Elements',
						description: 'This covers HTML form elements.'
					}
				]
			}
		],
		description: 'Tooltip Text'
	},
	{
		id: 1,
		label: 'CSS',
		items: [
			{
				id: 10,
				label: 'CSS Basics',
				items: [
					{
						id: 19,
						label: 'Selectors',
						description: 'This explains CSS selectors.'
					},
					{
						id: 20,
						label: 'Properties',
						description: 'This covers CSS properties.'
					}
				]
			}
		],
		description: 'Tooltip Text'
	},
	{
		id: 2,
		label: 'JavaScript',
		items: [
			{
				id: 11,
				label: 'JavaScript Basics',
				items: [
					{
						id: 21,
						label: 'Variables',
						description: 'This covers JavaScript variables.'
					},
					{
						id: 22,
						label: 'Functions',
						description: 'This explains JavaScript functions.'
					}
				]
			},
			{
				id: 12,
				label: 'JavaScript DOM',
				items: [
					{
						id: 23,
						label: 'DOM Manipulation',
						description: 'This covers manipulating the Document Object Model with JavaScript.'
					}
				]
			}
		],
		description: 'Tooltip Text'
	},
	{
		id: 3,
		label: 'Responsive Design',
		items: [
			{
				id: 13,
				label: 'Media Queries',
				description: 'This explains CSS media queries for responsive design.'
			},
			{
				id: 14,
				label: 'Flexbox',
				description: 'This covers CSS Flexbox layout.'
			},
			{
				id: 15,
				label: 'Grid Layout',
				description: 'This covers CSS Grid layout for responsive design.',
				items: [
					{
						id: 13,
						label: 'Media Queries',
						description: 'This explains CSS media queries for responsive design.'
					},
					{
						id: 14,
						label: 'Flexbox',
						description: 'This covers CSS Flexbox layout.'
					},
					{
						id: 15,
						label: 'Grid Layout',
						description: 'This covers CSS Grid layout for responsive design.',
						items: [
							{
								id: 13,
								label: 'Media Queries',
								description: 'This explains CSS media queries for responsive design.'
							},
							{
								id: 14,
								label: 'Flexbox',
								description: 'This covers CSS Flexbox layout.'
							},
							{
								id: 15,
								label: 'Grid Layout',
								description: 'This covers CSS Grid layout for responsive design.'
							}
						]
					}
				]
			}
		],
		description: 'Tooltip Text'
	}
]);
