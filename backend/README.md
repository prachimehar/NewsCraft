# NewsCraft Spring Boot Backend

This backend replaces the old Node/Express NewsAPI pass-through with a Spring Boot API that normalizes article data before React receives it.

## NewsAPI Endpoint Use

- `/v2/top-headlines` is used for country/category headlines. NewsCraft passes `country`, `category`, `page`, `pageSize`, and optional `q`.
- `/v2/everything` is used for free-text search when no country or category is requested.
- `/v2/top-headlines/sources` is not called for every article. NewsAPI article payloads already include the source name, and country/category in NewsCraft come from the request context. Calling source metadata per article would create an external N+1 API pattern.

## Default Behavior

If no country is provided for `/api/news`, NewsCraft defaults to India (`in`). This avoids the previous ambiguous behavior where top headlines could appear UK-heavy without the frontend explicitly requesting `gb`.

## Environment

Required:

- `NEWS_API_KEY`
- `FRONTEND_URL`

Optional:

- `DB_URL` (include the database name, for example `mongodb+srv://username:password@cluster.example.mongodb.net/newsCraft`)
- `DB_USERNAME`
- `DB_PASSWORD`
- `NEWS_API_BASE_URL`
- `NEWS_API_TIMEOUT`
