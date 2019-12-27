require('dotenv').config()

import { Application, Request, Response, response } from "express";
import { Packages, Places } from "../firestore/collections";
import { placeDetails } from "../helpers";

import { PackagesType } from "../resources/interfaces";


const number_format = require('numeral');

export class PackageController {
    public async index(req: Request, res: Response) {
        let data = await Packages.all()
        // let response  = data.map
        // const results = await data.map(async (data: any) => {
        //     data.packagePlaces = await Promise.all(await data.packagePlaces.map(async (data: any) => {

        //         var ref: any
        //         ref = await Places.findOne(data._path.segments[1])
                
        //         return ref
        //     })).then(val => val)

        //     return data
        // })
        // var coba= data.find((el: any) => {
        //     console.log(el.packagePlaces)
        // })

        // console.log(results)
        res.json(data)
    }

    public async findOne(req: Request, res: Response) {
        
        
        try {
            let data = await Packages.findOne(req.params.id)
            
            if (data)
            {
    
                // data.rating = 0
                let ratings: number = 0;
                let ratings_total: number = 0;
                let packagePrice: number = 0;
        
                var packages = await Promise.all(await data.packagePlaces.map(async (data: any) => {
        
                    var ref: any
                    
                    ref = await Places.findOne(data._path.segments[1])
        
                    
                    const { place_id } = ref.google_maps
                    let { formatted_address, rating,user_ratings_total, name } = await placeDetails(place_id)
                    
                    rating = (typeof rating == 'undefined') ? 0 : rating
                    user_ratings_total = (typeof user_ratings_total == 'undefined') ? 0 : user_ratings_total
        
                    var placeDetail: any = {
                        name, address: formatted_address, rating, ratings_total: user_ratings_total
                    }
        
                    packagePrice += ref.placePrice
                    ratings += rating
                    ratings_total += user_ratings_total
                
                    
                    return {
                        ...ref,
                        google_maps: {
                            ...placeDetail
                        },
                    }
                })).then(val => val)
        
                data.packagePlaces = packages
                data.rating = ratings
                data.ratings_total = ratings_total
                data.totalPrice = packagePrice
                data.totalPriceFormat = number_format(packagePrice).format('0,0')
                // console.log(data)
                return res.json(data)
            }
            else
            {
                return res.status(404).json({
                    status: false,
                    message: "Package not found"
                })
            }
        } catch (error) {
            return res.status(404).json({
                status: false,
                message: "Package not found"
            })
        }



    }

    public async save(req: Request, res: Response) {
        var packages: PackagesType= req.body
        console.log(Packages.save(packages))
        res.json(req.body)
    }

    public async getRandom(req: Request, res: Response) {

    }

}