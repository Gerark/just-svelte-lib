//TODO: This GUID generation must to be changed
export function generateQuickGUID() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
