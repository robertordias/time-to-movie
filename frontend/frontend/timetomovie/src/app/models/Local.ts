export class Local
{
    constructor(src:any = null)
    {
        this.populate(src);
    }

    id:number;
    uf: string;
    estado: string;

    protected populate(src: any) {

        for (let prop in src) {
            this[prop] = src[prop] ? src[prop] : this[prop];
        }
    }
}