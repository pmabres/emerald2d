Emerald.GameObjectLastId = 0;
Emerald.GameObject = function (name,tag) {
    Emerald.GameObjectLastId++;
    var objName = name || "defaultName"+Emerald.GameObjectLastId;
    var objTag = tag||"default";
    var gameObject = {
        id:Emerald.GameObjectLastId,
        name:objName,
        tag:objTag,
        components: {},
        componentNextId:0,
        visible:false,
        parent:null,
        childs:[],
        setVisible:function(value){
            this.visible = value;
        },
        addComponent:function(component){
            var name = component.name;
            component.id = this.componentNextId;
            this.components[name||"def"+this.componentNextId] = component;
            this[name||"def"+this.componentNextId] = component;
            this.componentNextId++;
            component.gameObject = this;
            component.init();
            return component;
        },
        removeComponent:function(obj){
            var tmpDel;
            for (var comp in this.components){
                if (this.compareComponent(this.components[comp], obj,comp)) {
                    tmpDel = this.components[comp];
                    //components.splice(i,1);
                    delete this[comp];
                    delete this.components[comp];
                    break;
                }
            }
            return tmpDel;
        },
        addChild:function(obj){
            this.childs.push(obj);
            obj.parent = this;
        },
        addChilds:function(arrObj){
            for (var i=0;i<arrObj.length;i++){
                this.childs.push(arrObj[i]);
                arrObj[i].parent = this;
            }
        },
        setParent:function(obj){
            if (this.parent)
                this.parent.removeChild(this);
            this.parent = obj;
            obj.addChild(this);
        },
        getParentRoot:function(executeOnEach){
            if (this.parent) {
                executeOnEach(this.parent);
                return this.parent.getParentRoot(executeOnEach);
            }
            return this;
        },
        removeParent:function(){
            if (this.parent)
                this.parent.removeChild(this);
            this.parent = null;
        },
        removeChild:function(dynamic){
            var child = removeElement(this.childs,dynamic);
            if (child) child.removeParent();
        },
        getAllChilds:function(){
            return this.childs;
        },
        getChild:function(dynamic){
            return findElement(this.childs,dynamic);
        },
        getParent:function(){
            return this.parent;
        },
        getComponent:function(obj){
            for (var comp in this.components) {
                if (this.compareComponent(this.components[comp], obj,comp)) {
                    return this.components[comp];
                }
            }
        },
        compareComponent:function(comp,obj,idx){
            return ((isString(obj) && comp.name == obj) ||
                (isString(obj) && idx && obj == idx) ||
                (isObject(obj) && comp.id == obj.id) ||
                (isObject(obj) && equals(comp)));
        }
    };
    // On initialization we add the basic component needed (transform)
    gameObject.addComponent(new Emerald.transform());
    return gameObject;
};
