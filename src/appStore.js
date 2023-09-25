import { writable, get as svelteGet } from 'svelte/store';
import { createDefaultThemes, createTheme } from '$lib/styles/createTheme.js';
import { dndzone } from 'svelte-dnd-action';

export const allThemes = writable(createDefaultThemes());
export const currentTheme = writable(svelteGet(allThemes)[0].value);
export const currentItem = writable({});

export const configuration = writable([
	{ id: 0, label: 'Bool Property', store: writable(false) },
	{ id: 1, label: 'String Property', type: 'Text', store: writable('') },
	{
		id: 2,
		label: 'Select Theme',
		type: 'Enum',
		values: allThemes,
		store: currentTheme
	},
	{ id: 3, label: 'Number Property', type: 'Number', store: writable(10) },
	{
		id: 4,
		label: 'Themes',
		dndzone: 'themes',
		create: (event) => {
			event.detail.result = {
				label: 'new-theme',
				value: createTheme(
					'new-theme',
					['#666666', '#FFFFFF'],
					['#AA0000', '#000000'],
					['#4570c0', '#121212'],
					['#4CAF50', '#000000'],
					['#008000', '#FFFFFF'],
					['#FFC107', '#121212'],
					['#FF0000', '#FFFFFF']
				)
			};
		},
		copy: (event) => {
			let clone = structuredClone(event.detail.item);
			event.detail.result = clone;
		},
		listUpdated: (event) => {
			allThemes.set(event.detail);
		},
		store: allThemes
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
		]
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
		]
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
		]
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
		]
	}
]);
