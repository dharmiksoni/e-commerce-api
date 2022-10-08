# Hybr1d

Instructions on `how to run project on local` 

```sh
create database in local mongodb : hybr1d
```
```sh
import 2 default collections (auth_role, auth_permission)
```
```sh
create or use given .env file
```
```sh
npm i
```
```sh
npm run start
```

```sh
.env sample (usable)

MONGO_URI=mongodb://localhost:27017/hybr1d
HOST=localhost
PORT=3001
MONGODB_ENCRYPTION_SECRET=hybr1d
MONGODB_ENCRYPTION_SALT=9dc92f87026d98e0b7aaefc4ecc89f7d
ENV=local
JWT_TOKEN_SECRET=XLkopAmoEbeG9N0esV4O3hp9QWUZBc7c
```


## Access server through following route 
```sh
http://localhost:3001/status
```

## Access swagger through following route 
```sh
http://localhost:3001/docs
```

## Small DB setup
Download existing DB with permission [google drive link](https://drive.google.com/drive/folders/1P2fD6MD6KovkZeKdHPOrfNT1QkKm5mhf?usp=sharing)
```sh
Two options to do

Option 1. Download folder from google drive and run below command Link above, which will import existing database in your system
            :- mongorestore -d hybr1d your_directory
    OR
Option 2. create 2 collection after creating database manually and insert following documents
    1. auth_role
        {
            "name" : "Basic",
            "role" : "BASIC",
            "level" : "PRODUCT",
            "meta" : {
                "info" : "basic is viewing history"
            },
            "permissions" : [ 
                ObjectId("63419a227954680d003ac88f"), 
                ObjectId("63419a437954680d003ac89b"), 
                ObjectId("63419a6b7954680d003ac8b3"), 
                ObjectId("63419a8a7954680d003ac8bf"), 
                ObjectId("63419add7954680d003ac8da")
            ]
        }
        {
            "name" : "seller",
            "role" : "SELLER",
            "level" : "PRODUCT",
            "meta" : {
                "info" : "basic is viewing history"
            },
            "permissions" : [ 
                ObjectId("63419a8a7954680d003ac8bf"), 
                ObjectId("63419add7954680d003ac8da")
            ]
        }
        {
            "_id" : ObjectId("634199987954680d003ac85d"),
            "name" : "buyer",
            "role" : "BUYER",
            "level" : "PRODUCT",
            "meta" : {
                "info" : "basic is viewing history"
            },
            "permissions" : [ 
                ObjectId("63419a227954680d003ac88f"), 
                ObjectId("63419a437954680d003ac89b"), 
                ObjectId("63419a6b7954680d003ac8b3")
            ]
        }
    2. auth_permission
        {
            "name" : "Get seller",
            "permission" : "buyer.get.seller",
            "meta" : {
                "info" : "account admin is viewing history"
            }
        }
        {
            "name" : "Catalog",
            "permission" : "buyer.get.catalog",
            "meta" : {
                "info" : "account admin is viewing history"
            }
        }
        {
            "name" : "Create order",
            "permission" : "buyer.create.order",
            "meta" : {
                "info" : "account admin is viewing history"
            }
        }
        {
            "name" : "Create catalog",
            "permission" : "seller.create.catalog",
            "meta" : {
                "info" : "account admin is viewing history"
            }
        }
        {
            "name" : "seller orders",
            "permission" : "seller.get.orders",
            "meta" : {
                "info" : "account admin is viewing history"
            }
        }
```

## Postman collection link
You can find [Postman collection](https://www.postman.com/collections/96fb0b3be52d55d50e10).

## Note
1. Send request through swagger
2. Add authorize token generated on login in every request
3. if user is seller (login with seller account, token will be generated use that in further request for seller requests)
4. Request examples are mentioned in the swagger docs

