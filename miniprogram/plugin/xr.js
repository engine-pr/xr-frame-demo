module.exports = Behavior({
	methods: {
    /*
		element() {
			return this._element
		},*/
		isExist(parent, target) {
      
			for (const child of parent._children) {
				if (child.ui && child.ui.__wxExparserNodeId__ == target.ui.__wxExparserNodeId__) {
					return true
				}
				var result = this.isExist(child, target)
				if (result) {
					return true
				}
			}
		},
		onekit_add(e) {
			const {
				ui
      } = e.detail
      const element = ui._element
      if(!this.isExist(this._element,element)){
        //[]
        this._element.addChild(element)
      }
    },
    /*
		addNode(child) {
			return this._element.addChild(child)
		},
		dfs(callback, defaultParams, excludeRoot, stop) {
			return this._element.dfs(callback, defaultParams, excludeRoot, stop)
		},
		getChildAtIndex(index) {
			return this._element.getChildAtIndex(index)
		},
		getChildByClass(clz) {
			return this._element.getChildByClass(clz)
		},
		getChildByFilter(filter) {
			return this._element.getChildByFilter(filter)
		},
		getChildByName(name) {
			return this._element.getChildByName(name)
		},
		getChildrenByFilter(filter) {
			return this._element.getChildrenByFilter(filter)
		},
		getChildrenByName(name) {
			return this._element.getChildrenByName(name)
		},
		getComponent(clz) {
      const component = this._element.getComponent(clz)
      return component
		},
		release() {
			return this._element.release()
		},
		removeChild(child) {
			return this._element.removeChild(child)
		},
		removeComponent(clz) {
			return this._element.removeComponent(clz)
		},
		setAttribute(name, value) {
			return this._element.setAttribute(name, value)
		},
		setId(id) {
			return this._element.setId(id)
		}*/
	}
})
