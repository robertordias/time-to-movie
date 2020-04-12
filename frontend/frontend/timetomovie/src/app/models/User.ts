import { Local } from "./Local";
import { Week } from "./Week";

export class User
{
    constructor(src: any = null)
    {
        this.populate(src);

        this.week = this.week || [];
        this.domingo = this.week.find( w => w.day == 'DOM' );
        this.segunda = this.week.find( w => w.day == 'SEG' );
        this.terça = this.week.find( w => w.day == 'TER' );
        this.quarta = this.week.find( w => w.day == 'QUA' );
        this.quinta = this.week.find( w => w.day == 'QUI' );
        this.sexta = this.week.find( w => w.day == 'SEX' );
        this.sábado = this.week.find( w => w.day == 'SAB' );
    }

    id:number;
    name: string;
    email: string;
    password: string;
    local: Local;
    week: Week [];

    domingo : any;
    segunda : any; 
    terça : any; 
    quarta : any;
    quinta : any; 
    sexta : any; 
    sábado : any;

    protected populate(src: any) {

        for (let prop in src) {
            this[prop] = src[prop] ? src[prop] : this[prop];
        }
    }
}