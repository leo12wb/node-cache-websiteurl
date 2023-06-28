import { Caches } from '../cache/cache.service';
//import { Request, Response } from 'express';

const request = require('supertest');
const app = require('../server')
{   
   const acesso_micro = process.env.TOKEN
   const auth = process.env.AUTHTESTE
   const url = process.env.URLTEST

   describe('CacheService', () => {

      it('Verificar Criação de Cache em Url com autorização', async () => {
         const response = await request(app).get('/')
         .set('Content-type', 'application/json')
         //authorization não é obrigatorio para urls que nao possuam autorização. 
         .set('Authorization',auth)
         .set('Token', acesso_micro)
         .send({url: url})
         
         // console.log(response);
         expect(response.statusCode).toEqual(200);
         //expect(response.body).toHaveProperty('data');
      })


      it('Verificar Criação de Cache em Url sem autorização', async () => {
         const response = await request(app).get('/')
         .set('Content-type', 'application/json')
         .set('Token', acesso_micro)
         .send({url: url})
         
         //console.log(response);
         expect(response.statusCode).toEqual(200);
         //expect(response.body).toHaveProperty('data');
      })

      it('Verificar token Verdadeiro', async () => {
         const cache = new Caches();
         expect(cache.requiredToken(acesso_micro)).toBe(false);
      })

      it('Verificar token Falso', async () => {
         const cache = new Caches();
         expect(cache.requiredToken('token-falso')).toBe(true);
      })

      it('Verificar Atualização retorno True', async () => {
         const cache = new Caches();
         expect(cache.updateCache(1)).toBe(true);
      })
      it('Verificar Atualização retorno False', async () => {
         const cache = new Caches();
         expect(cache.updateCache(0)).toBe(false);
      })

       
   })
}
