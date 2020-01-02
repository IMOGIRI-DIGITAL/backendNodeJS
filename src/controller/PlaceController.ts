require('dotenv').config()

import { Application, Request, Response, response } from "express";
import { Places } from "../firestore/collections/Places";
import { placeDetails } from "../helpers";


export class PlaceController {
    public async index(req: Request, res: Response) {
        let data = await Places.all()
        const response = await data.map(async (data: any) => {

            const { place_id } = data.google_maps
            let { formatted_address, rating,user_ratings_total, name } = await placeDetails(place_id)
            
            rating = (typeof rating == 'undefined') ? 0 : rating
            user_ratings_total = (typeof user_ratings_total == 'undefined') ? 0 : user_ratings_total

            var placeDetail: any = {
                name, address: formatted_address, rating, ratings_total: user_ratings_total
            }
            
            return {
                ...data,
                google_maps: {
                    ...placeDetail
                }
            }
        })
        
        res.json(await Promise.all(response))
    }

    public async byID(req: Request, res: Response) {
        const data: any = await Places.findOne(req.params.id)
        if (!data)
            return res.status(404).json({
                status: false,
                message: "place do not match"
            })
        
        const { place_id } = data.google_maps
        
        let { formatted_address, rating,user_ratings_total, name } = await placeDetails(place_id)
        
        rating = (typeof rating == 'undefined') ? 0 : rating
        user_ratings_total = (typeof user_ratings_total == 'undefined') ? 0 : user_ratings_total

        var placeDetail: any = {
            name, address: formatted_address, rating, ratings_total: user_ratings_total
        }
        
        

        var result = {
            ...data,
            google_maps: {
                ...placeDetail
            }
        }
        console.log(result)
        return res.json(result)
        
    }

    public async search(req: Request, res: Response) {
        const data = await Places.search(req.params.q)

        const response = await data.map(async (data: any) => {
        
            const { place_id } = data.google_maps
            let { formatted_address, rating,user_ratings_total, name } = await placeDetails(place_id)
            
            rating = (typeof rating == 'undefined') ? 0 : rating
            user_ratings_total = (typeof user_ratings_total == 'undefined') ? 0 : user_ratings_total

            var placeDetail: any = {
                name, address: formatted_address, rating, ratings_total: user_ratings_total
            }
            
            return {
                ...data,
                google_maps: {
                    ...placeDetail
                }
            }
        })

        
        res.json(await Promise.all(response).then(value => value))
        // res.json(req.params)
    }

    public async getPlaceDetails()
    {

    }
}