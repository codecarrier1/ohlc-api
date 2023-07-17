# OHLC API

This is a RESTful API that provides the moving changes of OHLC (Open-High-Low-Close) data.

## Tech stacks

Node.js, Express.js, TypeScript, MongoDB, Mongoose, Swagger

## Usage

To get the average value, simple send a GET request to one of the following endpoints.

https://localhost:3000/api/average?window=last_5_items

https://localhost:3000/api/average?window=last_24_hours

To insert record, send a POST request to the following endpoint:

https://localhost:3000/api/insert

## API Docs

You can find the Swagger docs here.

https://localhost:3000/api-docs
