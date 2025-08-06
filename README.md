# CineZone API

CineZone is a RESTful API built with Node.js and Express for managing a collection of movies. It supports basic CRUD operations and connects to a MySQL database.

## Features

- List all movies
- Retrieve a movie by ID
- Add a new movie
- Update an existing movie
- Delete a movie
- Filter movies by limit (e.g., `?limit=2`)

## Tech Stack

- Node.js
- Express
- MySQL (via `mysql2`)
- dotenv for environment variable management
- nodemon for development

## Getting Started

### Prerequisites

- Node.js >= 18
- MySQL Server
- npm

## Project Initialization

### Clone the repository

```bash
git clone https://github.com/B-Ethan07/cineZone.git
cd cineZone
```
```bash
npm install
```
```bash
npm start
```