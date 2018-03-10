export interface StoreState {
    plugins?:any,
    tools?:[number,number,number,number],
    viewport?:any,
    app?:any
}

export class ViewportStore {
    /**
     * 视图区域 dom
     */
    public viewportDOM: HTMLElement = null
    /**
     * 根级实例的 key
     */
    public rootInstanceKey: string = null
    /**
     * 当前所有组件实例
     */
    public instances = new Map<string, any>()
    /**
     * 组件实例到dom节点的映射
     */
    public instanceDoms = new Map<string, HTMLElement>()
    /**
     * current drag info
     */
    public currentDragInfo: any = null

    public currentHoverInstanceKey: string = null

    public currentEditInstanceKey: string

    public get currentFullInformation() {
        const fullObj: any = {}
        this.instances.forEach((instanceInfo, instanceKey) => {
            fullObj[instanceKey] = instanceInfo
        })
        return fullObj
    }

    /**
     * 拖拽前数据获取是否完毕
     */
    public dragStartDataReady = false
}