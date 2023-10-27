import { generateQuickGUID } from '$lib/utils/guid.js';
import { writable } from 'svelte/store';

export class CollectionItem {
	constructor(id, data) {
		this.id = id;
		this.data = data;
	}
}

/**
 * @callback PreAddCallback
 * @param {String} id
 */

/**
 * @callback PostRemoveCallback
 * @param {String} id
 */

/**
 * @callback PostAddCallback
 * @param {String} id
 */

export class ElementCollection {
	/**
	 * @type {Array<PreAddCallback>}
	 */
	#preAddCallbacks = [];

	/**
	 * @type {Array<PostAddCallback>}
	 */
	#postAddCallbacks = [];

	/**
	 * @type {Array<PostRemoveCallback>}
	 */
	#postRemoveCallbacks = [];

	/**
	 * @type {Array<CollectionItem>}
	 */
	#items = [];

	#itemsStore = writable([]);

	get length() {
		return this.#items.length;
	}

	subscribe(callback) {
		return this.#itemsStore.subscribe(callback);
	}

	/**
	 * @param {PreAddCallback} callback
	 */
	onPreAddItem(callback) {
		this.#preAddCallbacks.push(callback);
		return () => {
			this.#removeCallback(this.#preAddCallbacks, callback);
		};
	}

	/**
	 * @param {PostAddCallback} callback
	 */
	onPostAddItem(callback) {
		this.#postAddCallbacks.push(callback);
		return () => {
			this.#removeCallback(this.#postAddCallbacks, callback);
		};
	}

	/**
	 * @param {PostRemoveCallback} callback
	 */
	onPostRemoveItem(callback) {
		this.#postRemoveCallbacks.push(callback);
		return () => {
			this.#removeCallback(this.#postRemoveCallbacks, callback);
		};
	}

	/**
	 * @param {Array<Object>} array
	 * @param {Object} callback
	 */
	#removeCallback(array, callback) {
		const index = array.findIndex((x) => x === callback);
		if (index !== -1) {
			array.splice(index, 1);
		}
	}

	/**
	 * @param {Object} data
	 */
	addItem(data) {
		let id = generateQuickGUID();
		this.#preAddCallbacks.forEach((x) => x(id));
		let collectionItem = new CollectionItem(id, data);
		this.#items.push(collectionItem);
		this.#itemsStore.update((currentValue) => {
			currentValue.push(collectionItem);
			return currentValue;
		});
		this.#postAddCallbacks.forEach((x) => x(id));
		return id;
	}

	/**
	 * @param {String} itemId
	 */
	removeItem(itemId) {
		let index = this.#items.findIndex((x) => {
			return x.id === itemId;
		});
		if (index !== 1) {
			this.#items.splice(index, 1);
			this.#itemsStore.update((val) => {
				val.splice(index, 1);
				return val;
			});
			this.#postRemoveCallbacks.forEach((x) => x(itemId));
		}
	}

	/**
	 * @param {String} itemId
	 * @param {Object} itemData
	 */
	updateItem(itemId, itemData) {
		let index = this.#items.findIndex((x) => {
			return x.id === itemId;
		});
		if (index !== -1) {
			this.#items[index].data = itemData;
			this.#itemsStore.update((val) => {
				val[index].data = itemData;
				return val;
			});
		}
	}

	/**
	 * @param {String} itemId
	 */
	getIndex(itemId) {
		return this.#items.findIndex((x) => {
			return x.id === itemId;
		});
	}
}
