import googleMapsClient from "@google/maps";
import dotenv from "dotenv";

const env: any = dotenv.config().parsed

const googleMaps = googleMapsClient.createClient({
    key: env.GOOGLE_MAPS_API_KEY,
    Promise: Promise
})

export const findPlaces = async (query: string) => {
    const results = await googleMaps.places({
        query: query,
        language: 'id',
    }).asPromise().then( (res: any) => res.json ).catch((err: any) => {
        console.log(err)
    })

    return results
}

export const placePhoto = async (photoRef: string, maxHeight: number, maxWidth: number) => {
    var results =   googleMaps.placesPhoto({
                        maxheight: maxHeight,
                        maxwidth: maxWidth,
                        photoreference: photoRef
                    })
                    .asPromise()
                    .then( (res: any) => res.json );

    return results;
}

export const placeDetails = async (placeid: string) => {
    var results = await googleMaps.place({
        placeid: placeid,
        language: 'id'
    }).asPromise().then((res: any) => res.json.result)

    // console.log(results)
    return results
}


var data = async () => {
    var res = await placeDetails('ChIJaygNQ-hQei4RA0lsUtKG3mo') 
    console.log(res)
}




var direction =  async () => {
    
    var res: any = await googleMaps.directions({
        origin: 'bantul',
        destination: 'malioboro'
    }).asPromise().then((res: any) => res.json)

    var result: any = []
    res.routes[0].legs[0].steps.map((data: any, i: any) => {
        console.log(data)
        result.push({lat: data.start_location.lat, lng: data.start_location.lng},{lat: data.end_location.lat, lng: data.end_location.lng})
    })
    console.log(result)
    console.log(res.routes[0].bounds)
    
}


