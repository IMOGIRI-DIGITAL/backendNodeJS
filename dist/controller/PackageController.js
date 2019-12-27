"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const collections_1 = require("../firestore/collections");
const helpers_1 = require("../helpers");
const number_format = require('numeral');
class PackageController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield collections_1.Packages.all();
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
            res.json(data);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield collections_1.Packages.findOne(req.params.id);
                if (data) {
                    // data.rating = 0
                    let ratings = 0;
                    let ratings_total = 0;
                    let packagePrice = 0;
                    var packages = yield Promise.all(yield data.packagePlaces.map((data) => __awaiter(this, void 0, void 0, function* () {
                        var ref;
                        ref = yield collections_1.Places.findOne(data._path.segments[1]);
                        const { place_id } = ref.google_maps;
                        let { formatted_address, rating, user_ratings_total, name } = yield helpers_1.placeDetails(place_id);
                        rating = (typeof rating == 'undefined') ? 0 : rating;
                        user_ratings_total = (typeof user_ratings_total == 'undefined') ? 0 : user_ratings_total;
                        var placeDetail = {
                            name, address: formatted_address, rating, ratings_total: user_ratings_total
                        };
                        packagePrice += ref.placePrice;
                        ratings += rating;
                        ratings_total += user_ratings_total;
                        return Object.assign(Object.assign({}, ref), { google_maps: Object.assign({}, placeDetail) });
                    }))).then(val => val);
                    data.packagePlaces = packages;
                    data.rating = ratings;
                    data.ratings_total = ratings_total;
                    data.totalPrice = packagePrice;
                    data.totalPriceFormat = number_format(packagePrice).format('0,0');
                    // console.log(data)
                    return res.json(data);
                }
                else {
                    return res.status(404).json({
                        status: false,
                        message: "Package not found"
                    });
                }
            }
            catch (error) {
                return res.status(404).json({
                    status: false,
                    message: "Package not found"
                });
            }
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var packages = req.body;
            console.log(collections_1.Packages.save(packages));
            res.json(req.body);
        });
    }
    getRandom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.PackageController = PackageController;
