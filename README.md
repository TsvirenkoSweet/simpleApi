# 🎲 **Test API**

> A simple REST API built with **NestJS**, **TypeORM**, and **PostgreSQL**  
> Implements CRUD operations for **Tables** and **Players**, including a relation between them,  
> plus automatic database seeding and full Docker support.

---
## Quick start

1) Create `.env` file with the following variables:

```env
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=casino
```

2) Start Postgres via Docker

```
docker compose up

...............
This starts:
 - db — PostgreSQL database
 - app — NestJS API server
 
 On first start you should see:
    🎲 Database seeded successfully!
    ✅ Server started on http://localhost:3000
```

📡 API Endpoints

```
🧱 Tables
| Method   | Endpoint              | Description                         |
| -------- | --------------------- | ----------------------------------- |
| `POST`   | `/tables`             | Create a new table                  |
| `GET`    | `/tables`             | Get all tables with players         |
| `GET`    | `/tables/:id`         | Get a specific table by ID          |
| `PATCH`  | `/tables/:id`         | Update table data                   |
| `DELETE` | `/tables/:id`         | Delete a table                      |
| `GET`    | `/tables/:id/players` | Get all players at a specific table |

🧍 Players
| Method   | Endpoint                  | Description                          |
| -------- | ------------------------- | ------------------------------------ |
| `POST`   | `/players`                | Create a new player (table optional) |
| `GET`    | `/players`                | Get all players                      |
| `GET`    | `/players/:id`            | Get player by ID                     |
| `PATCH`  | `/players/:id`            | Update player data                   |
| `DELETE` | `/players/:id`            | Delete a player                      |
| `GET`    | `/players/table/:tableId` | Get players by table ID              |

```

🧩 Migrations

```
yarn migration:create --name=Init
yarn migration:generate --name=SyncSchema
yarn migration:run
yarn migration:revert

```

🌱 Database Seeding

```
On the first run, the app automatically:

Creates 3 tables: Blackjack Table #1, Poker Table #2, Roulette Table #3

Creates 4 players: Alice, Bob, Charlie, Diana

Seeding runs once if the database is empty.
```

⚠️ Error Handling

```
All validation and logic errors are returned as JSON, e.g.:

{
  "statusCode": 404,
  "message": "Table with id 123 not found",
  "error": "Not Found"
}

| Error Type       | Code | Description        |
| ---------------- | ---- | ------------------ |
| Validation error | 400  | Invalid input data |
| Not found        | 404  | Entity not found   |
| Server error     | 500  | Internal error     |

```


✅ Test Task Requirements

```
| Requirement                             | Status |
| --------------------------------------- | ------ |
| CRUD for `table` and `player`           | ✅      |
| List of all players assigned to a table | ✅      |
| Use TypeORM + PostgreSQL                | ✅      |
| Basic error handling                    | ✅      |
| No unit tests required                  | ✅      |
| Docker-based startup                    | ✅      |
| Auto database seeding                   | ✅      |

```


💬 Example Request

```
POST /players
Content-Type: application/json

{
  "name": "Alice",
  "tableId": "1b2c3d4e-5f6g-7h8i-9j0k-l1m2n3o4p5q6"
}

```

Response

```
{
  "id": "bbf80e52-09c2-4b7c-8d9b-4ef29c6a54a7",
  "name": "Alice",
  "table": {
    "id": "1b2c3d4e-5f6g-7h8i-9j0k-l1m2n3o4p5q6",
    "name": "Blackjack Table #1"
  },
  "createdAt": "2025-10-05T20:00:00.000Z"
}

```