# Rent a Car API in JavaScript

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Mongodb](https://img.shields.io/badge/mongodb-6DA55F?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

The application consists of car rental where given a certain category of selected car and the age of the person renting the vehicle, the program calculates the final price based on the number of days selected.

API was **developed** using a well defined and decoupled architecture, using **TDD** as a working methodology and a little bit **Clean Architecture**  for distribution of responsibilities in layers, and whenever possible using the principles of **SOLID **.

Requirements

- Node
- npm
- Mongodb

Clone the project and run the `npm install` command to install the dependencies.

~~~javascript
npm install
~~~

Bring up the development server using the `npm run dev` command

~~~javascript
npm run dev
~~~

Configure environment variables by creating a `.env` file in the project root, and following the example of the `.env.example` file.


## Teste

#### run all tests

~~~javascript
npm test
~~~

#### Run unit tests

~~~javascript
npm run test:unit
~~~

#### Run integration tests

~~~javascript
npm run test:integration
~~~

#### Run covarage tests

~~~javascript
npm run test:ci
~~~

## Main features
- Transaction of rent a car
- Create car category
- Update car category
- Delete car category
- Find one car category
- Find all car categories
- Create a car
- Load all cars

## Application endpoints

## Rent a car
~~~javascript
[POST] /rent
~~~

## **Request body**
~~~javascript
{
	"customerName": "string",
	"customerAge": "number",
	"carCategoryId": "string",
	"numberOfDays": "number"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
{
	"customer": {
		"name": "string",
		"age": "number"
	},
	"car": {
		"_id": "string",
		"name": "string",
		"releaseYear": "string",
		"available": "boolean",
		"carCategoryId": "string"
	},
	"amount": "string",
	"dueDate": "string"
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

## Create Car
~~~javascript
[POST] /car/create
~~~

## **Request body**
~~~javascript
{
	"name": "string",
	"releaseYear": "string",
	"available": "boolean",
	"carCategoryId": "string"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
{
    "created": "string",
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

## Load all Cars
~~~javascript
[GET] /car/load
~~~


## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
 [
	{
		"_id": "string",
		"name": "string",
		"releaseYear": "string",
		"available": "boolean",
		"carCategoryId": "string"
	}
]
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

## Create Car Category
~~~javascript
[POST] /category/create
~~~

## **Request body**
~~~javascript
{
	"categoryName": "string",
	"price": "string"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/created-201-<COLOR>.svg)

~~~javascript
{
    "created": "string",
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~
## Update Car Category
~~~javascript
[PUT] /category/update/${carCategoryId}
~~~

## **Request body**
~~~javascript
{
	"categoryName": "string",
	"price": "string"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
{
	"_id": "string",
	"categoryName": "string",
	"price": "string"
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

## Delete Car Category
~~~javascript
[DELETE] /category/delete/${carCategoryId}
~~~


## **Responses**
![Generic badge](https://img.shields.io/badge/nocontent-204-<COLOR>.svg)

~~~javascript
{
	"_id": "string",
	"categoryName": "string",
	"price": "string"
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

## Find Car Category by ID
~~~javascript
[GET] /category/findById/${carCategoryId}
~~~


## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
{
	"_id": "string",
	"categoryName": "string",
	"price": "string"
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

## Find all Car Category
~~~javascript
[GET] /category/findAll
~~~


## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
[
	{
		"_id": "string",
		"categoryName": "string",
		"price": "string"
	}
]
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~
