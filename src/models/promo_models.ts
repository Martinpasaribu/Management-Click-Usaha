export interface ContactModels {
    
    name : string;
    email : string;
    phone : number;
    message : string;

}


    type image  = {
        row: number,
        image: string
    }

    type List  = {
        head: string,
        paragraph: string,
        value: number
    }

    export interface CardType  {
        price: string | null
        title: string
        list: List []| []
        title2: string
        desc: string | null
        image: image [] | []
        image_bg: string | null
    }