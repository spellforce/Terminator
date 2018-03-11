import * as Sortable from "sortablejs"
import Terminator from "../../Terminator";
export default class Helper{
    private static readonly TAP = 'Viewport Helper';
    private store;
    constructor(props){
        this.store = props;
    }
    public registerInnerDrag(parentInstanceKey: string, dragParentDom: HTMLElement, params?: any, groupName = "gaea-container") {
        Terminator.log(Helper.TAP,"registerInnerDrag");
        // const instance = this.store.instances.get(parentInstanceKey)

        Sortable.create(dragParentDom, {
            animation: 50,
            // 放在一个组里,可以跨组拖拽
            group: {
                name: groupName,
                pull: true,
                put: true
            },
            sort: true,
            onStart: (event: any) => {

            },
            onEnd: (event: any) => {

            },
            onAdd: (event: any) => {

            },
            onUpdate: (event: any) => {

            },
            onRemove: (event: any) => {

            }
        })
    }

    public registerOuterDrag(dragParentDom: HTMLElement) {
        // 上次拖拽的位置
        let lastDragStartIndex = -1

        Sortable.create(dragParentDom, {
            animation: 50,
            // 放在一个组里,可以跨组拖拽
            group: {
                name: "gaea-container",
                pull: "clone",
                put: false
            },
            sort: false,
            delay: 0,
            onStart: (event: any) => {

            },
            onEnd: (event: any) => {

            }
        })
    }
}