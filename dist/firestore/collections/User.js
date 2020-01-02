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
const Firestore_1 = require("../Firestore");
class User extends Firestore_1.Firestore {
    static getInstance() {
        Firestore_1.Firestore.collections = this.collection;
    }
    static all() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getInstance();
            return yield Firestore_1.Firestore.all();
        });
    }
    static save(data, key = '') {
        return __awaiter(this, void 0, void 0, function* () {
            this.getInstance();
            try {
                var saved = yield Firestore_1.Firestore.insert(data, key);
                console.log(saved);
            }
            catch (error) {
                console.log(error);
                return false;
            }
            if (saved) {
                var users = yield Firestore_1.Firestore.findOne(saved);
                return users;
            }
            else {
                return false;
            }
        });
    }
    static update(data, key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.getInstance();
            var updated = yield Firestore_1.Firestore.update(data, key);
            if (updated)
                return true;
            return false;
        });
    }
    static findOne(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = [];
            this.getInstance();
            var result = yield Firestore_1.Firestore.findOne(params);
            return result;
        });
    }
}
exports.User = User;
User.collection = 'users';
