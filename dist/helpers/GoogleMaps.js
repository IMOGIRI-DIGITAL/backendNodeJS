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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const maps_1 = __importDefault(require("@google/maps"));
const dotenv_1 = __importDefault(require("dotenv"));
const env = dotenv_1.default.config().parsed;
const googleMaps = maps_1.default.createClient({
    key: env.GOOGLE_MAPS_API_KEY,
    Promise: Promise
});
exports.findPlaces = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield googleMaps.places({
        query: query,
        language: 'id',
    }).asPromise().then((res) => res.json).catch((err) => {
        console.log(err);
    });
    return results;
});
exports.placePhoto = (photoRef, maxHeight, maxWidth) => __awaiter(void 0, void 0, void 0, function* () {
    var results = googleMaps.placesPhoto({
        maxheight: maxHeight,
        maxwidth: maxWidth,
        photoreference: photoRef
    })
        .asPromise()
        .then((res) => res.json);
    return results;
});
exports.placeDetails = (placeid) => __awaiter(void 0, void 0, void 0, function* () {
    var results = yield googleMaps.place({
        placeid: placeid,
        language: 'id'
    }).asPromise().then((res) => res.json.result);
    // console.log(results)
    return results;
});
var data = () => __awaiter(void 0, void 0, void 0, function* () {
    var res = yield exports.placeDetails('ChIJaygNQ-hQei4RA0lsUtKG3mo');
    console.log(res);
});
var direction = () => __awaiter(void 0, void 0, void 0, function* () {
    var res = yield googleMaps.directions({
        origin: 'bantul',
        destination: 'malioboro'
    }).asPromise().then((res) => res.json);
    var result = [];
    res.routes[0].legs[0].steps.map((data, i) => {
        console.log(data);
        result.push({ lat: data.start_location.lat, lng: data.start_location.lng }, { lat: data.end_location.lat, lng: data.end_location.lng });
    });
    console.log(result);
    console.log(res.routes[0].bounds);
});
