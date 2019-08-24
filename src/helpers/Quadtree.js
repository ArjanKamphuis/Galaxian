export default class QuadTree {
    constructor(boundBox, lvl) {
        this.maxObjects = 10;
        this.bounds = boundBox || {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };

        this.objects = [];
        this.nodes = [];
        this.level = lvl || 0;
        this.maxLevels = 5;
    }

    clear() {
        this.objects = [];
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].clear();
        }
        this.nodes = [];
    }

    getAllObjects(returnedObjects) {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].getAllObjects(returnedObjects);
        }
        for (let i = 0, len = this.objects.length; i < len; i++) {
            returnedObjects.push(this.objects[i]);
        }
        return returnedObjects;
    }

    findObjects(returnedObjects, obj) {
        if (typeof obj === 'undefined') {
            console.log('UNDEFINED OBJECT');
            return;
        }

        let index = this.getIndex(obj);
        if (index !== -1 && this.nodes.length) {
            this.nodes[index].findObjects(returnedObjects, obj);
        }
        for (let i = 0, len = this.objects.length; i < len; i++) {
            returnedObjects.push(this.objects[i]);
        }
        return returnedObjects;
    }

    insert(obj) {
        if (typeof obj === 'undefined') {
            return;
        }

        if (obj instanceof Array) {
            for (let i = 0, len = obj.length; i < len; i++) {
                this.insert(obj[i]);
            }
            return;
        }

        if (this.nodes.length) {
            let index = this.getIndex(obj);
            if (index !== -1) {
                this.nodes[index].insert(obj);
                return;
            }
        }

        this.objects.push(obj);
        if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
            if (this.nodes[0] == null) {
                this.split();
            }
            let i = 0;
            while (i < this.objects.length) {
                let index = this.getIndex(this.objects[i]);
                if (index !== -1) {
                    this.nodes[index].insert((this.objects.splice(i, 1))[0]);
                } else {
                    i++;
                }
            }
        }
    }

    getIndex(obj) {
        let index = -1;
        const verticalMidpoint = this.bounds.x + this.bounds.width / 2;
        const horizontalMidpoint = this.bounds.y + this.bounds.height / 2;
        const topQuadrant = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
        const bottomQuadrant = (obj.y > horizontalMidpoint);

        if (obj.x < verticalMidpoint && obj.x + obj.width < verticalMidpoint) {
            if (topQuadrant) {
                index = 1;
            } else if (bottomQuadrant) {
                index = 2;
            }
        } else if (obj.x > verticalMidpoint) {
            if (topQuadrant) {
                index = 0;
            } else if (bottomQuadrant) {
                index = 3;
            }
        }

        return index;
    }

    split() {
        const subWidth = (this.bounds.width / 2) | 0;
        const subHeight = (this.bounds.height / 2) | 0;

        this.nodes[0] = new QuadTree({
            x: this.bounds.x + subWidth,
            y: this.bounds.y,
            width: subWidth,
            height: subHeight
        }, this.level + 1);

        this.nodes[1] = new QuadTree({
            x: this.bounds.x,
            y: this.bounds.y,
            width: subWidth,
            height: subHeight
        }, this.level + 1);

        this.nodes[2] = new QuadTree({
            x: this.bounds.x,
            y: this.bounds.y + subHeight,
            width: subWidth,
            height: subHeight
        }, this.level + 1);

        this.nodes[3] = new QuadTree({
            x: this.bounds.x + subWidth,
            y: this.bounds.y + subHeight,
            width: subWidth,
            height: subHeight
        }, this.level + 1);
    }
}
