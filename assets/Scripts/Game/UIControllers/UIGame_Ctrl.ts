import { Label, _decorator, } from 'cc';
const { ccclass, property } = _decorator;
import { UICtrl } from '../../Managers/UIMgr';
@ccclass
export class UIGame_Ctrl extends UICtrl {
   protected onLoad(): void {
     super.onLoad();
     this.view["Version"].getComponent(Label).string = "v2.0.0" 

     this.addButtonListener('GameStart',this,this.clickButton)
   } 
   private clickButton(){
     console.log("点击")
   }
}


