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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount = __importStar(require("./../firestore/edukatrip-firebase-adminsdk.json"));
const credential = serviceAccount;
firebase_admin_1.default.initializeApp({ credential: firebase_admin_1.default.credential.cert(credential) });
exports.firestore = firebase_admin_1.default.firestore();
class Firestore {
    static all() {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield exports.firestore.collection(this.collections).get();
            var data = [];
            result.forEach((doc) => {
                data.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return data;
        });
    }
    static insert(data, key = '') {
        return __awaiter(this, void 0, void 0, function* () {
            var result;
            try {
                if (key == '') // key otomatis di buat jika valuenya kosong
                    result = yield exports.firestore.collection(this.collections).add(data);
                else {
                    result = yield exports.firestore.collection(this.collections).doc(key).set(data);
                    result = yield exports.firestore
                        .collection(this.collections)
                        .doc(key)
                        .get();
                    if (typeof result.data() == 'undefined')
                        result = false;
                    else
                        result = Object.assign({ id: result.id }, result.data());
                }
            }
            catch (error) {
                return false;
            }
            if (result)
                return result.id;
            else
                return false;
        });
    }
    static update(data, key) {
        return __awaiter(this, void 0, void 0, function* () {
            var result;
            result = yield exports.firestore.collection(this.collections).doc(key).update(data);
            if (result)
                return true;
            else
                return false;
        });
    }
    static delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            var result;
            result = yield exports.firestore.collection(this.collections).doc(key).delete();
            if (result)
                return true;
            else
                return false;
        });
    }
    static findOne(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var data;
            ;
            var result;
            if (typeof params == 'string') {
                result = yield exports.firestore
                    .collection(this.collections)
                    .doc(params)
                    .get();
                if (typeof result.data() == 'undefined')
                    data = false;
                else
                    data = Object.assign({ id: result.id }, result.data());
            }
            else if (typeof params == 'object') {
                var lastParams;
                result = yield exports.firestore
                    .collection(this.collections);
                for (lastParams in params)
                    ;
                for (var i in params) {
                    if (lastParams == i)
                        result = yield result.where(i, '=', params[i]).limit(1).get();
                    else
                        result = yield result.where(i, '=', params[i]);
                }
                result.forEach((doc) => {
                    data = Object.assign({ id: doc.id }, doc.data());
                });
            }
            else
                result = null;
            if (typeof data == 'undefined')
                data = false;
            return data;
        });
    }
    static findMore(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = [];
            ;
            var result;
            var lastParams;
            result = yield exports.firestore
                .collection(this.collections);
            for (lastParams in params)
                ;
            for (var i in params) {
                if (lastParams == i)
                    result = yield result.where(i, '=', params[i]).get();
                else
                    result = yield result.where(i, '=', params[i]);
            }
            result.forEach((doc) => {
                data.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return data;
        });
    }
    static textSearch(word) {
        return __awaiter(this, void 0, void 0, function* () {
            word = word.toLowerCase();
            var allData = yield this.all();
            var result = [];
            allData.forEach((data, key) => {
                var keywords = '';
                for (var i in data) {
                    keywords += data[i];
                }
                keywords = keywords.toLowerCase();
                data = Object.assign(Object.assign({}, data), { keywords });
                if (keywords.includes(word))
                    result.push(data);
                allData[key] = data;
            });
            return result;
        });
    }
    static filterRange(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            ;
            var data = [];
            var objectFrom = Object.keys(from)[0];
            var objectTo = Object.keys(to)[0];
            from = { name: objectFrom, value: from[objectFrom] };
            to = { name: objectTo, value: to[objectTo] };
            var result = yield exports.firestore.collection(this.collections)
                .where(from.name, '>=', from.value)
                .where(to.name, '<=', to.value).get();
            result.forEach((doc) => {
                data.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return data;
        });
    }
    static min(document) {
        return __awaiter(this, void 0, void 0, function* () {
            var data;
            var result;
            result = yield exports.firestore.collection(this.collections).orderBy(document, 'asc').limit(1).get();
            result.forEach((doc) => {
                data = Object.assign({ id: doc.id }, doc.data());
            });
            return data;
        });
    }
    static max(document) {
        return __awaiter(this, void 0, void 0, function* () {
            var data;
            var result;
            result = yield exports.firestore.collection(this.collections).orderBy(document, 'desc').limit(1).get();
            result.forEach((doc) => {
                data = Object.assign({ id: doc.id }, doc.data());
            });
            return data;
        });
    }
}
exports.Firestore = Firestore;
Firestore.instance = false;
