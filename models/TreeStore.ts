type TypeItem = {
    id: number | string;
    parent: number | string;
    type?: any;
}

export class TreeStore {
    private items: TypeItem[];
    private itemMap: Map<number | string, TypeItem> = new Map();
    private childrenMap: Map<number | string, TypeItem[]> = new Map();

    constructor(list: TypeItem[]) {
        this.items = list;

        list.forEach(item => {
            this.itemMap.set(item.id, item);

            if (!this.childrenMap.has(item.parent)) {
                this.childrenMap.set(item.parent, []);
            }
            this.childrenMap.get(item.parent)!.push(item);
        });
    }

    getAll() {
        return this.items;
    }

    getItem(id: number | string): TypeItem | undefined {
        return this.itemMap.get(id);
    }

    getChildren(id: number | string): TypeItem[] {
        return this.childrenMap.get(id) || [];
    }

    getAllChildren(id: number | string): TypeItem[] {
        const result: TypeItem[] = [];
        const stack: TypeItem[] = this.getChildren(id);

        while (stack.length > 0) {
            const current = stack.shift()!; // если не важен порядок, то pop()
            result.push(current);
            stack.push(...this.getChildren(current.id));
        }
        return result;
    }

    getAllParents(id: number | string): TypeItem[] {
        const result: TypeItem[] = [];
        let current = this.getItem(id);

        while (current && current.parent !== 'root') {
            current = this.getItem(current.parent);
            if (current) {
                result.push(current);
            }
        }

        return result;
    }
}