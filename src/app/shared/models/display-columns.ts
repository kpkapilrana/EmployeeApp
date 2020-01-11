export interface IDisplayColumns {
    name: string;
    id: string;
    weight: number;
    type: string;
    sort ?: Boolean;
}

export class DisplayColumn implements IDisplayColumns {
    type = 'text';
    constructor(
        public name: string,
        public id: string,
        public weight: number,
        public sort?: boolean
    ) {
    }
}

export class DisplayNumber implements IDisplayColumns {
    type = 'number';
    constructor(
        public name: string,
        public id: string,
        public weight: number,
        public sort?: boolean
    ) {
    }
}
