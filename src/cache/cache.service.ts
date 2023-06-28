const axios = require('axios')
const NodeCache = require('node-cache')
const cache = new NodeCache()
require('dotenv').config()
import { Request, Response } from 'express';

export class Caches{
    actionCache(req:Request,res:Response) {

        const reqtoken = this.requiredToken(req.headers["token"]);
        if(reqtoken){
          res.status(401).json('Unauthorized request');
        }

        this.verifyAutorization(req.headers["authorization"]);

        const key = req.body.url;
        const cachedData = cache.get(key);
        
        //duração do cache 
        const duration = req.body.duration ? req.body.duration * 1000 : 100

        //atualizar
        if(req.body.atualizar){
          let at = this.updateCache(req.body.atualizar);
          if(at){
            cache.del(key)
            this.requestUrl(req)
            .then(response => {
                if(response.data.status == 'Authorization Token not found' ){
                    res.status(401).json(response.data);
                    return false;
                }
                cache.set(key, response.data, duration);
                res.status(200).json({"data": response.data});
            })
            .catch(error => {
                if(error.response.status){
                    res.status(error.response.status).json({"erro":error.response.status, "data": error.message});
                }else{
                    res.status(422).json({"erro":error, "data": 'Ocorreu um Erro!'});
                }
            });
          }
        }

        // verifica se não possui cache
        if (!cachedData) {
            this.requestUrl(req)
            .then(response => {
                if(response.data.status == 'Authorization Token not found' ){
                    res.status(401).json(response.data);
                    return false;
                }
                cache.set(key, response.data, duration);
                res.status(200).json({"data": response.data});
            })
            .catch(error => {
                if(error.response.status){
                    res.status(error.response.status).json({"erro":error.response.status, "data": error.message});
                }else{
                    res.status(422).json({"erro":error, "data": 'Ocorreu um Erro!'});
                }
            });
        }else{
            // resposta em cache 
            res.json(cachedData)
        }
    }

    requiredToken(token){
        const acesso_micro = process.env.TOKEN
        if(token !== acesso_micro){
            return true
        }
        return false
    }

    verifyAutorization(auth){
      //verifica se possui token JWT
      if(auth){
        return axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth;
      }
    }

    updateCache(atualizar){
      if(atualizar == 1){
        return true
      }
      return false
    }

    requestUrl(req){
        // buscar url
        return axios.get(req.body.url)
    }
}