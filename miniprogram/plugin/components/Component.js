export default class Component {
	constructor() {
		this._data = {}
	}

	// Properties
	get priority() {
		return this._priority
	}
	set priority(priority) {
		this._priority = priority
	}
	get schema() {
    console.error(this)
		throw new Error("TODO")
	}
	static get EVENTS() {
		throw new Error("TODO")
	}
	// Accessors
	get el() {
		return this._el
	}
	get scene() {
		return this.el.scene
	}
	get version() {
		return 1
	}
	// Methods
	getData(key) {
		return this._data[key]
	}
	setData(data) {
		const prevData = this._data
		for (const key of Object.keys(data)) {
			this.setDataOne(key, data[key])
		}
		this._data = Object.assign(prevData, data)
		this.onUpdate(prevData, data)
	}
	setDataOne(key, value) {
    
	}
	onAdd(parent, data) {}
	onRelease(data) {}
	onRemove(parent, data) {}
	onTick(deltaTime, data) {}
	onUpdate(data, preData) {}
}
