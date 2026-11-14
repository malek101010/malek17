//#region node_modules/.nitro/vite/services/ssr/assets/media-DPSB67f5.js
var DB_NAME = "ozombol-media";
var STORE = "blobs";
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error ?? /* @__PURE__ */ new Error("Could not open storage"));
	});
}
async function putMedia(key, blob) {
	const db = await openDb();
	await new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, "readwrite");
		tx.objectStore(STORE).put(blob, key);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("Could not store the file"));
	});
	db.close();
}
async function getMedia(key) {
	const db = await openDb();
	const blob = await new Promise((resolve, reject) => {
		const req = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error ?? /* @__PURE__ */ new Error("Could not read the file"));
	});
	db.close();
	return blob;
}
function compressImage(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			const scale = Math.min(1, 1400 / Math.max(img.width, img.height));
			const width = Math.max(1, Math.round(img.width * scale));
			const height = Math.max(1, Math.round(img.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("Could not read that photo"));
				return;
			}
			ctx.drawImage(img, 0, 0, width, height);
			canvas.toBlob((blob) => {
				URL.revokeObjectURL(url);
				if (!blob) reject(/* @__PURE__ */ new Error("Could not prepare that photo"));
				else resolve(blob);
			}, "image/jpeg", .82);
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Use a JPEG, PNG, or WebP photo"));
		};
		img.src = url;
	});
}
//#endregion
export { getMedia as n, putMedia as r, compressImage as t };
