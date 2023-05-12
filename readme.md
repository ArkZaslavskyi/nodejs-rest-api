## Based on GoIT Node.js Course Template Homework

Для кожного ДЗ створена своя гілка:

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для чергового ДЗ робилася з гілка `master`.

Після закінчення кожного ДЗ у поточній гілці PR перевірено ментором, заапрувлено та змерджено у майстер.

- для форматування використовується Prettier

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

### API:

## users

Signup new user  
POST /users/signup

Body: { "email": e-mail, "password": password }

Response: { "token": token, "user": { "email": e-mail, "password": password } }

Get current user by token

GET /users/current

Auth: Bearer token

## contacts
