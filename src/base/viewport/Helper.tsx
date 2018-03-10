import * as Sortable from "sortablejs"
export default class Helper{
    store;
    constructor(props){
        this.store = props;
    }
    public registerInnerDrag(parentInstanceKey: string, dragParentDom: HTMLElement, params?: any, groupName = "gaea-container") {
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
}