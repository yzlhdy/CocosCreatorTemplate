import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { ResMgr } from '../Managers/ResMgr';
import { UIMgr } from '../Managers/UIMgr';


/**
 * @description 单例模式
 */
export class Game extends Component {

    public static Instance: Game = null;
    protected onLoad(): void {
        if(Game.Instance===null){
            Game.Instance  = this
        }else{
            this.destroy()
            return
        }
    }

    public GameStart(): void {

        const resPkg = {
            "GUI":{
                assetType:Prefab,
                urls:[
                    "UIPrefabs/UIGame"
                ]
            }
        }
        ResMgr.Instance.preloadResPackage(resPkg,(num:any)=>{
            console.log(num)
        },()=>{
            this.EnterGameScene()
        })

    }


    public EnterGameScene(): void {
        UIMgr.Instance.showUI("UIGame")
    }

   
}


