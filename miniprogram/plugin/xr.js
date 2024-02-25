module.exports = Behavior({
	methods: {
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
    onekit_count(){
      this.triggerEvent("onekit_count")
    },
		onekit_add(e) {
			const {
				ui
      } = e.detail
      const element = ui._element
      if(!this.isExist(this._element,element)){
        this._element.addChild(element)
        if(this.properties.TYPE=="scene"){
          this.onekit_count++
        }else{
          this.triggerEvent("onekit_count")
        }
      }
    }
	}
})
