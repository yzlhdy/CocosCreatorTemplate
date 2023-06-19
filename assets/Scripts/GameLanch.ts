import { _decorator, Component, Node } from 'cc';
import { Game } from './Game/Game';
import { ResMgr } from './Managers/ResMgr';
import { UIMgr } from './Managers/UIMgr';
const { ccclass, property } = _decorator;

@ccclass('GameLanch')
export class GameLanch extends Component {
    protected onLoad(): void {
        //  初始化 UI资源 音频资源  网络 等...  
        this.node.addComponent(ResMgr)
        this.node.addComponent(UIMgr)
        // 初始化游戏
        this.node.addComponent(Game)
    }
    start() {
        //  检查资源更新
        // 进入游戏代码
        Game.Instance.GameStart()
    }

}


