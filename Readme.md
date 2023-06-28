### Microserviço Cache Nodejs 

utilizando Typscript , node-cache

## Uso do Microserviço

Uso do cache é necessario passar um Json no body:
 
  - exemplo:
    {
      "url": "https://api-site.com.gov.br/api/v1/whoiam",     //onde vai buscar a informação
      "duration": 100                                                    //duração do cache
    }

  caso onde ele vai usar o cache precise de autorização passe no Header exemplo:

   - Authorization: 'Bearer ' + req.headers["authorization"]

  para atualizar o cache passar no json body: 
   - exemplo:
    {
      "atualizar" : 1
    }
    

```bash
# Rodar dev
npm run dev

# Rodar dev
npm run serve
```

```bash
# Gerar arquivo produção 
npm run build
```

```bash
# Test
npm test
```


```bash
# Simular produção
npm run start
```

