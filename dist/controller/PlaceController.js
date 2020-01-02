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
const Places_1 = require("../firestore/collections/Places");
const helpers_1 = require("../helpers");
class PlaceController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield Places_1.Places.all();
            const response = yield data.map((data) => __awaiter(this, void 0, void 0, function* () {
                const { place_id } = data.google_maps;
                let { formatted_address, rating, user_ratings_total, name } = yield helpers_1.placeDetails(place_id);
                rating = (typeof rating == 'undefined') ? 0 : rating;
                user_ratings_total = (typeof user_ratings_total == 'undefined') ? 0 : user_ratings_total;
                var placeDetail = {
                    name, address: formatted_address, rating, ratings_total: user_ratings_total
                };
                return Object.assign(Object.assign({}, data), { google_maps: Object.assign({}, placeDetail) });
            }));
            res.json(yield Promise.all(response));
        });
    }
    byID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Places_1.Places.findOne(req.params.id);
            if (!data)
                return res.status(404).json({
                    status: false,
                    message: "place do not match"
                });
            const { place_id } = data.google_maps;
            let { formatted_address, rating, user_ratings_total, name } = yield helpers_1.placeDetails(place_id);
            rating = (typeof rating == 'undefined') ? 0 : rating;
            user_ratings_total = (typeof user_ratings_total == 'undefined') ? 0 : user_ratings_total;
            var placeDetail = {
                name, address: formatted_address, rating, ratings_total: user_ratings_total
            };
            var result = Object.assign(Object.assign({}, data), { google_maps: Object.assign({}, placeDetail) });
            console.log(result);
            return res.json(result);
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Places_1.Places.search(req.params.q);
            const response = yield data.map((data) => __awaiter(this, void 0, void 0, function* () {
                const { place_id } = data.google_maps;
                let { formatted_address, rating, user_ratings_total, name } = yield helpers_1.placeDetails(place_id);
                rating = (typeof rating == 'undefined') ? 0 : rating;
                user_ratings_total = (typeof user_ratings_total == 'undefined') ? 0 : user_ratings_total;
                var placeDetail = {
                    name, address: formatted_address, rating, ratings_total: user_ratings_total
                };
                return Object.assign(Object.assign({}, data), { google_maps: Object.assign({}, placeDetail) });
            }));
            res.json(yield Promise.all(response).then(value => value));
            // res.json(req.params)
        });
    }
    getPlaceDetails() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.PlaceController = PlaceController;
