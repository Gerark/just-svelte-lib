import { writable, get as svelteGet } from 'svelte/store';

export const themes = writable([
	{ id: 0, label: 'dark-juice', value: 'dark-juice' },
	{ id: 1, label: 'dust', value: 'dust' },
	{ id: 2, label: 'crimson', value: 'crimson' }
]);

export const currentTheme = writable(svelteGet(themes)[0].value);
