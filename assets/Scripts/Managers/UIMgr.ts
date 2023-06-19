import { _decorator, Button, Component, instantiate, Node, Prefab, Root } from 'cc';
import { ResMgr } from './ResMgr';

type ViewMap = { [key: string]: Node };
export class UICtrl extends Component{
    protected view:ViewMap = {}
    loadAllObjects(node:Node, path = "") {
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            this.view[path + child.name] = child;
            this.loadAllObjects(child, path + child.name + "/");
        }
    }
    protected onLoad(): void {
        this.view = {}
    
        this.loadAllObjects(this.node,"")
    }

    public  addButtonListener(viewName,caller, callback: Function,) {

        const viewNode = this.view[viewName]
        if(!viewNode){
            return
        }
        const button = viewNode.getComponent(Button)
        if(!button){
            return
        }
        console.log(button)
        viewNode.on("click",callback,caller)

    }
}

export class UIMgr extends Component {
    public static Instance: UIMgr =null;
    private uiMap: { [key: string]: Node | null } = {};
    private Canvas:Node = null;

    protected onLoad(): void {
        if(UIMgr.Instance===null){
            UIMgr.Instance = this;
        }else{
            this.destroy()
            return
        }
        this.Canvas = this.node
    }


    public showUI (uiName:string,parent:Node = null):Node{
            if(!parent){
                parent = this.Canvas
            }
            const preFab = ResMgr.Instance.getAsset("GUI","UIPrefabs/"+uiName) as Prefab
            let item:Node  = null as unknown as Node
            if(preFab){
                item = instantiate(preFab)
                parent.addChild(item)
                console.log(item)
                item.addComponent(uiName+'_Ctrl')
            }
            this.uiMap[uiName] = item
            return item
    }

    /**
     * @params uiName string
     * @description 删除指定UI
     */
    public removeUI (uiName:string):void{

        const item = this.uiMap[uiName]
        if(item){
            item.removeFromParent()
            this.uiMap[uiName] =null
        }
    
    }
    /**
     * @description 删除所有
     */
    public clearAll(){
        for (const key in this.uiMap) {
            if (Object.prototype.hasOwnProperty.call(this.uiMap, key)) {
                const element = this.uiMap[key];
                if(element){
                    element.removeFromParent()
                    this.uiMap[key] =null
                }
                
            }
        }
    }



}


