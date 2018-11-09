# Review Questions

## What is Node.js?
Node.js allows programmers to use javascript outside of Chrome.

## What is Express?
Express is a framework to build the backend of APIs (similar to how React is for the front end.

## Mention two parts of Express that you learned about this week.
Able to listen to the server on a port.
CRUD methods to reach the endpoints.

## What is Middleware?
Middleware is a way to end step in between. It can be customized or added from a provider

## What is a Resource?
Resources is the data. Endpoints are how we reach the resources.

## What can the API return to help clients know if a request was successful?
res.status(200) or res.status(204) are ways to alert the client that the request was successful. res.status(404) alerts them it wasn't successful. res.status(500) alerts the client that it is a server error, not a client error.

## How can we partition our application into sub-applications?
separate out middleware.

## What is express.json() and why do we need it?
It is a map of what has been added to the application, where it exists, and what to start at the beginning, it also controls if something is part of production or development.