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
const cache_service_1 = require("../cache/cache.service");
const request = require('supertest');
const app = require('../server');
{
    const acesso_micro = process.env.TOKEN;
    const auth = process.env.AUTHTESTE;
    const url = process.env.URLTEST;
    describe('CacheService', () => {
        it('Verificar Criação de Cache em Url com autorização', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app).get('/')
                .set('Content-type', 'application/json')
                .set('Authorization', auth)
                .set('Token', acesso_micro)
                .send({ url: url });
            expect(response.statusCode).toEqual(200);
        }));
        it('Verificar Criação de Cache em Url sem autorização', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app).get('/')
                .set('Content-type', 'application/json')
                .set('Token', acesso_micro)
                .send({ url: url });
            expect(response.statusCode).toEqual(200);
        }));
        it('Verificar token Verdadeiro', () => __awaiter(void 0, void 0, void 0, function* () {
            const cache = new cache_service_1.Caches();
            expect(cache.requiredToken(acesso_micro)).toBe(false);
        }));
        it('Verificar token Falso', () => __awaiter(void 0, void 0, void 0, function* () {
            const cache = new cache_service_1.Caches();
            expect(cache.requiredToken('token-falso')).toBe(true);
        }));
        it('Verificar Atualização retorno True', () => __awaiter(void 0, void 0, void 0, function* () {
            const cache = new cache_service_1.Caches();
            expect(cache.updateCache(1)).toBe(true);
        }));
        it('Verificar Atualização retorno False', () => __awaiter(void 0, void 0, void 0, function* () {
            const cache = new cache_service_1.Caches();
            expect(cache.updateCache(0)).toBe(false);
        }));
    });
}
//# sourceMappingURL=cache.spec.js.map