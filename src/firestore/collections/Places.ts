import { Firestore } from "../Firestore";


export class Places extends Firestore {
    static collection: string = 'places'

    static getInstance() {
        Firestore.collections = this.collection
    }

    static async all(): Promise<void | any> {
        this.getInstance()
        return await Firestore.all()
    }

    static async save(data : object, key : string = '') {
        this.getInstance();
        try {

            var saved = await Firestore.insert(data, key);
        } catch (error) {
            console.log(error)
            return false;
        }
        if (saved) {
            var users = await Firestore.findOne(saved);
            return users;
        } else {
            return false;
        }
    }

    static async search(q: string)
    {
        this.getInstance()
        return await Firestore.textSearch(q)
    }

    static async update(data: object, key: string)
    {
        this.getInstance()

        var updated = await Firestore.update(data, key)

        if ( updated )
            return true;
        return false;
    }
    static async findOne(params : object | string) {
        var data: any[] = [];
        this.getInstance();

        var result = await Firestore.findOne(params)

        

        return result;
    }
}