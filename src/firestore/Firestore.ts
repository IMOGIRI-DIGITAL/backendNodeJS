import admin from "firebase-admin";
import * as serviceAccount from "./../firestore/edukatrip-firebase-adminsdk.json";
 
 
const credential: object = serviceAccount;
admin.initializeApp({credential: admin.credential.cert(credential)});

const firestore = admin.firestore()


export class Firestore {
    protected static instance: boolean = false;
    static collections: string


    public static async all() {
        
        var result  = await firestore.collection(this.collections).get()
        var data: any[] = [];
        result.forEach((doc: any) => {
            data.push({id: doc.id,... doc.data()});
        })

        return data
    }


    public static async insert(data: object, key: string = '')
    {;
        var result: any;
        try {
            
            if ( key == '' ) // key otomatis di buat jika valuenya kosong
                result = await firestore.collection(this.collections).add(data);
            else
                result = await firestore.collection(this.collections).doc(key).set(data);
        } catch (error) {
            return false
        }


        if (result)
            return result.id;
        else
            return false;
    }





    public static async update(data: object, key: string)
    {
        var result: any;

        result = await firestore.collection(this.collections).doc(key).update(data)
        
        if ( result )
            return true;
        else
            return false;
    }



    public static async delete(key: string)
    {

        var result;
        result = await firestore.collection(this.collections).doc(key).delete()
        if (result)
            return true;
        else
            return false;
    }



    public static async findOne(params: string | object | any)
    {
        var data: any;;

        var result: any;
        if(typeof params == 'string')
        {
            result = await firestore
                    .collection(this.collections)
                    .doc(params)
                    .get();
            
            if ( typeof result.data() == 'undefined' )
                data = false
            else
                data = {id: result.id,... result.data()}
        }
        else if( typeof params == 'object')
        {
            var lastParams;
            result = await firestore
                    .collection(this.collections);

            for (lastParams in params);
            for ( var i in params )
            {
                if ( lastParams == i )
                    result = await result.where(i, '=', params[i]).limit(1).get();
                else
                    result = await result.where(i, '=',params[i]);

            }
            result.forEach((doc: any) => {
                data = {id: doc.id,... doc.data()}
            })
        }
        else
            result = null;
        
        if ( typeof data == 'undefined' )
            data = false
        
        return data;
    }



    public static async findMore(params: object | any)
    {
        var data: any[] = [];;

        var result: any;
        
        var lastParams;
        result = await firestore
                .collection(this.collections);

        for (lastParams in params);
        for ( var i in params )
        {
            if ( lastParams == i )
                result = await result.where(i, '=', params[i]).get();
            else
                result = await result.where(i, '=',params[i]);

        }
        result.forEach((doc: any) => {
            data.push({id: doc.id,... doc.data()})
        });
        
        
        return data;
    }



    public static async textSearch(word: string)
    {
        word = word.toLowerCase();

        var allData: any[] = await this.all();
        var result: any[] = [];
        allData.forEach((data, key) => {
            var keywords: string = '';
            for (var i in data)
            {
                keywords += data[i];
            }
            keywords = keywords.toLowerCase()
            data = { ... data,keywords }
            if ( keywords.includes(word) )
                result.push( data );
            allData[key] = data
        });

        return result
    }



    public static async filterRange(from: any | object, to: any | object)
    {;
        var data: any[] = [];

        var objectFrom = Object.keys(from)[0];
        var objectTo = Object.keys(to)[0];
        from = { name: objectFrom, value: from[objectFrom] };
        to = { name: objectTo, value: to[objectTo] };

        var result = await firestore.collection(this.collections)
                    .where(from.name, '>=', from.value)
                    .where(to.name, '<=', to.value).get();

        result.forEach((doc: any) => {
            data.push({ id: doc.id,... doc.data() })
        });

        return data;
    }



    public static async min(document: string)
    {
        var data: any;
        var result: any;
        result = await firestore.collection(this.collections).orderBy(document, 'asc').limit(1).get();
        
        result.forEach((doc: any) => {
            data = { id: doc.id,... doc.data()}
        })

        return data;
    }


    public static async max(document: string)
    {
        var data: any;
        var result: any;
        result = await firestore.collection(this.collections).orderBy(document, 'desc').limit(1).get();
        
        result.forEach((doc: any) => {
            data = { id: doc.id,... doc.data()}
        })

        return data;
    }


}

