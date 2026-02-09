# 📝 Quiz Backend

> **Современное приложение для создания и совместного прохождения викторин**
>
> Полнофункциональная платформа с безопасной аутентификацией, управлением ролями пользователей и подробной аналитикой результатов.

---

## 📖 Содержание

- [✨ Возможности](#-возможности)
- [🚀 Технологический стек](#-технологический-стек)
- [📁 Структура проекта](#-структура-проекта)
- [🛠️ Установка и настройка](#️-установка-и-настройка)
- [🔑 Переменные окружения](#-переменные-окружения)
- [📡 API документация](#-api-документация)
- [✅ Валидация входных данных](#-валидация-входных-данных)
- [🔐 Управление доступом](#-управление-доступом-rbac)
- [👨‍💻 Разработка](#️-разработка)
- [🎨 Возможности интерфейса](#-возможности-интерфейса)
- [🚀 Развертывание](#-развертывание)
- [🛡️ Обработка ошибок](#️-обработка-ошибок)
- [🔧 Утилиты](#-утилиты)
- [📚 Ресурсы](#-ресурсы)
- [📝 Лицензия](#-лицензия)

---

## ✨ Возможности

### Основные функции

**🔐 Безопасная аутентификация**

Полная система регистрации и входа с использованием JWT токенов и шифрованием паролей через bcrypt. Каждая сессия защищена и безопасна.

**👥 Управление ролями и правами доступа**

Система с двумя типами пользователей — обычные пользователи и администраторы. Администраторы имеют полный доступ ко всему содержимому, в то время как обычные пользователи могут управлять только своим контентом.

**📚 Управление викторинами**

Создавайте, редактируйте и удаляйте викторины с любым количеством вопросов и вариантов ответов. Полная система CRUD операций.

**📊 Отслеживание результатов**

Сохраняйте историю прохождения викторин, отслеживайте баллы и просматривайте детальную статистику по каждой попытке.

**📧 Уведомления по электронной почте**

Автоматические письма при регистрации и смене пароля через интеграцию с SendGrid.

**✅ Валидация данных**

Все входные данные проверяются на корректность перед сохранением. Ошибки возвращаются в понятном формате.

**🛡️ Центральная обработка ошибок**

Все ошибки приложения обрабатываются единолично через глобальный обработчик, что гарантирует консистентность ответов.

**📱 Современный интерфейс**

Адаптивный дизайн, работающий на любых устройствах. Поиск, сортировка, модальные окна и красивые карточки

---

## 🚀 Технологический стек

### 🔙 Backend (Сервер)

Приложение построено на **Node.js** с использованием фреймворка **Express.js** для создания быстрого и масштабируемого API.

**Основные компоненты:**
- **Express 5.x** — веб-фреймворк для создания маршрутов и обработки запросов
- **MongoDB + Mongoose** — база данных и ORM для работы с данными
- **JWT (jsonwebtoken)** — токены для безопасной аутентификации
- **bcryptjs** — хеширование паролей для безопасности
- **express-validator** — валидация входных данных
- **SendGrid API** — отправка электронных писем
- **Nodemon** — автоматическая перезагрузка при разработке

### 🎨 Frontend (Интерфейс)

Клиентская часть написана на чистом JavaScript без фреймворков, что обеспечивает лёгкость и быстроту загрузки.

**Основные технологии:**
- **HTML5** — структура страниц
- **CSS3** — стили и адаптивный дизайн (Grid, Flexbox)
- **Vanilla JavaScript** — интерактивность без зависимостей
- **Fetch API** — запросы к серверу
- **LocalStorage** — сохранение токенов в браузере

---

## 📁 Структура проекта

Проект организован по принципу **модульной архитектуры**, где каждый компонент отвечает за свою функцию.

```
quiz-backend/                           ← Корневая папка проекта

├── 📦 src/                             ← Исходный код сервера
│
│   ├── app.js                          Инициализация Express приложения
│   ├── server.js                       Запуск сервера и создание админа
│
│   ├── 🔌 config/
│   │   ├── db.js                      Подключение к MongoDB
│   │   └── mail.js                    Настройка SendGrid
│
│   ├── 🎮 controllers/                 Логика обработки запросов
│   │   ├── authController.js          Регистрация, вход, админ
│   │   ├── userController.js          Профиль пользователя
│   │   ├── quizController.js          Работа с викторинами
│   │   └── resultController.js        Работа с результатами
│
│   ├── 💾 models/                      Схемы баз данных
│   │   ├── User.js                    Модель пользователя
│   │   ├── Quiz.js                    Модель викторины
│   │   └── Result.js                  Модель результата
│
│   ├── 🛡️ middleware/                  Обработчики запросов
│   │   ├── authMiddleware.js          Проверка токена
│   │   ├── roleMiddleware.js          Проверка прав (админ)
│   │   ├── validationMiddleware.js    Валидация данных
│   │   └── errorHandler.js            Обработка ошибок
│
│   ├── 🛣️ routes/                      Определение маршрутов API
│   │   ├── authRoutes.js              /api/auth/*
│   │   ├── userRoutes.js              /api/users/*
│   │   ├── quizRoutes.js              /api/quizzes/*
│   │   └── resultRoutes.js            /api/results/*
│
│   ├── 📧 services/                    Бизнес-логика
│   │   └── emailService.js            Отправка писем
│
│   ├── ❌ errors/                      Кастомные ошибки
│   │   └── ApiError.js                Класс ошибки API
│
│   └── 🔧 scripts/                     Утилиты и скрипты
│       ├── seedQuiz.js                Создание примеров
│       └── resetAdminPassword.js      Сброс пароля админа
│
├── 🎨 frontend/                        Клиентская часть
│   ├── api.js                         Вспомогательные функции для API
│   ├── styles.css                     Глобальные стили
│   ├── login.html                     Страница входа
│   ├── register.html                  Страница регистрации
│   ├── quizzes.html                   Список викторин
│   ├── edit.html                      Редактор викторин
│   ├── quiz.html                      Прохождение викторины
│   ├── results.html                   Результаты
│   └── user-profile.html              Профиль пользователя
│
├── 📄 package.json                    Зависимости и скрипты
├── 🔐 .env.example                    Шаблон переменных окружения
├── 📖 README.md                       Документация (этот файл)
└── 🚫 .gitignore                      Git настройки
```

---

## 🛠️ Установка и настройка

### Что вам нужно перед началом?

Убедитесь, что у вас установлено:

- ✅ **Node.js** версии 24 и выше (скачать с [nodejs.org](https://nodejs.org))
- ✅ **npm** (идёт в комплекте с Node.js)
- ✅ **MongoDB** (можно установить локально или использовать облачную БД [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- ✅ **SendGrid аккаунт** (опционально, только для функции отправки писем)

### Пошаговая установка

#### Шаг 1️⃣: Скачайте зависимости

Откройте терминал в папке проекта и выполните:

```bash
npm install
```

Ждите, пока npm установит все необходимые библиотеки (это займёт примерно 1-2 минуты).

#### Шаг 2️⃣: Создайте файл конфигурации

Скопируйте файл шаблона переменных окружения:

```bash
cp .env.example .env
```

#### Шаг 3️⃣: Заполните конфигурацию

Откройте файл `.env` в редакторе и заполните следующие значения:

```env
# Порт, на котором будет работать сервер
PORT=5000

# Ссылка на вашу MongoDB
# Для локальной БД: mongodb://localhost:27017/quiz-app
# Для облака: mongodb+srv://username:password@cluster.mongodb.net/quiz-app
MONGO_URI=mongodb://localhost:27017/quiz-app

# Секретный ключ для подписи токенов (используйте сложный набор символов)
JWT_SECRET=ваш-супер-секретный-ключ-из-64-символов

# Ключ SendGrid (если хотите отправлять письма)
SENDGRID_API_KEY=ваш-sendgrid-ключ

# Данные для создания администратора при первом запуске
ADMIN_EMAIL=admin@mail.com
ADMIN_PASSWORD=admin123456
ADMIN_USERNAME=admin

NODE_ENV=development
```

#### Шаг 4️⃣: Запустите сервер

```bash
npm run dev
```

Вы должны увидеть в консоли:
```
Server running on port 5000
Admin user already exists
```

#### Шаг 5️⃣: Откройте приложение в браузере

Перейдите по адресу:

```
http://localhost:5000/frontend/login.html
```

Используйте учетные данные администратора:
- **Email:** admin@mail.com
- **Пароль:** admin123456

Готово! 🎉 Приложение работает на вашем компьютере

---

## 🔑 Переменные окружения

Каждая переменная в файле `.env` отвечает за определённый параметр приложения. Вот полное описание:

| Переменная | Обязательна? | Описание | Пример |
|-----------|:-:|----------|--------|
| **PORT** | ✅ Да | На каком порту запускать приложение | `5000` |
| **MONGO_URI** | ✅ Да | Адрес базы данных MongoDB | `mongodb://localhost:27017/quiz-app` |
| **JWT_SECRET** | ✅ Да | Секретный ключ для подписи токенов — используйте сложный ключ! | `abc123xyz...` |
| **SENDGRID_API_KEY** | ❌ Нет | Ключ API для отправки писем | `SG.xxxxx` |
| **ADMIN_EMAIL** | ✅ Да | Email администратора по умолчанию | `admin@mail.com` |
| **ADMIN_PASSWORD** | ✅ Да | Пароль администратора | `admin123456` |
| **ADMIN_USERNAME** | ✅ Да | Имя администратора | `admin` |
| **NODE_ENV** | ❌ Нет | Режим работы (development или production) | `development` |

### 💡 Совет: как сгенерировать криптографический ключ для JWT_SECRET

Выполните в терминале:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Скопируйте результат и вставьте в `.env` как значение `JWT_SECRET`

---

## 📡 API Документация

### 🔐 Аутентификация

#### 📝 Регистрация нового пользователя

Создайте новую учётную запись в приложении.

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**✅ Успешный ответ (201):**
```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

---

#### 🔑 Вход в систему

Получите JWT токен для дальнейшей работы.

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**✅ Успешный ответ (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

ℹ️ Токен автоматически сохраняется в браузер (localStorage)

---

#### 👨‍💼 Register Admin (One-Time Only)
```http
POST /api/auth/register-admin
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@mail.com",
  "password": "admin123456"
}
```

**✅ Response (201 Created):**
```json
{
  "message": "Admin user created",
  "userId": "507f1f77bcf86cd799439011"
}
```

---

### 📚 Quiz Endpoints

#### ➕ Create Quiz
```http
POST /api/quizzes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "JavaScript Basics",
  "description": "Test your JS knowledge",
  "questions": [
    {
      "text": "What is 2 + 2?",
      "options": ["3", "4", "5"],
      "correctIndex": 1
    },
    {
      "text": "What is a closure?",
      "options": ["A function", "A scope", "A variable"],
      "correctIndex": 1
    }
  ]
}
```

**✅ Response (201 Created):** Quiz object with `_id`

---

#### 📖 Get All Quizzes
```http
GET /api/quizzes
Authorization: Bearer <token>
```

**✅ Response (200 OK):** Array of all quizzes with owner info

---

#### 🔍 Get Single Quiz
```http
GET /api/quizzes/:id
Authorization: Bearer <token>
```

**✅ Response (200 OK):** Single quiz object with full details

---

#### ✏️ Update Quiz
> Only owner or admin can update

```http
PUT /api/quizzes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "questions": [...]
}
```

**✅ Response (200 OK):** Updated quiz object

---

#### 🗑️ Delete Quiz
> Only owner or admin can delete

```http
DELETE /api/quizzes/:id
Authorization: Bearer <token>
```

**✅ Response (200 OK):**
```json
{
  "message": "Quiz deleted"
}
```

---

### 📊 Results Endpoints

#### ➕ Create Result
```http
POST /api/results
Authorization: Bearer <token>
Content-Type: application/json

{
  "quizId": "507f1f77bcf86cd799439011",
  "answers": [1, 0, 2],
  "score": 2,
  "total": 3
}
```

**✅ Response (201 Created):** Result object with timestamp

---

#### 📈 Get Results
```http
GET /api/results
Authorization: Bearer <token>
```

**Response varies by role:**
- **👨‍💼 Admin**: All results from all users with user & quiz info
- **👤 Regular User**: Only their own results

**✅ Response (200 OK):** Array of result objects sorted by date

---

#### 🗑️ Delete Result
> Only result owner or admin can delete

```http
DELETE /api/results/:id
Authorization: Bearer <token>
```

**✅ Response (200 OK):**
```json
{
  "message": "Result deleted successfully"
}
```

---

### 👤 User Endpoints

#### 👤 Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

**✅ Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "role": "user"
}
```

---

#### ✏️ Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "new_username",
  "password": "newpassword123"
}
```

**✅ Response (200 OK):** Updated user object

---

### ⚠️ Error Responses

All errors return structured JSON:

```json
{
  "message": "Error description",
  "errors": [...],      // Optional: validation details
  "details": {...}      // Optional: additional context
}
```

| Status | Meaning | Example |
|--------|---------|---------|
| `400` | Bad Request / Validation Error | Missing email field |
| `401` | Unauthorized | Missing or invalid token |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Quiz doesn't exist |
| `500` | Server Error | Database connection failed |

---

## ✅ Input Validation

All endpoints include **express-validator middleware** ensuring data integrity:

### 🔐 Auth Endpoints
- **Email**: Valid email format required
- **Password**: Minimum 6 characters
- **Username**: Required field

### 📚 Quiz Endpoints
- **Title**: Required, non-empty
- **Questions**: Array with at least 1 item
  - **Question Text**: Required
  - **Options**: Array with minimum 2 options
  - **Correct Index**: Valid integer index

### 📊 Result Endpoints
- **QuizId**: Valid MongoDB ID
- **Answers**: Array of valid option indices
- **Score & Total**: Non-negative integers

### 🚫 Validation Error Response
Invalid requests return **HTTP 400**:
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## 🛡️ Error Handling

All errors are caught and handled globally:

### Error Handler Flow
```
Request → Middleware → Controller → Error Caught
                                        ↓
                            Global Error Handler
                                        ↓
                            Standardized JSON Response
```

### Response Format
```json
{
  "message": "Human-readable error description",
  "errors": [           // Optional: validation details
    {
      "param": "email",
      "msg": "valid email is required"
    }
  ],
  "details": {}         // Optional: additional context
}
```

### HTTP Status Codes

- **400 Bad Request** — Validation errors, malformed input
- **401 Unauthorized** — Missing or invalid JWT token
- **403 Forbidden** — Insufficient permissions (not owner/admin)
- **404 Not Found** — Resource doesn't exist
- **500 Server Error** — Unexpected server error

### ApiError Class

Controllers use custom `ApiError` class:
```javascript
// In controller
if (!quiz) {
  return next(new ApiError(404, 'Quiz not found'));
}
```

This ensures consistent error formatting across the entire API.

---

## 🔐 Role-Based Access Control (RBAC)

### 👤 Regular User Role

| Action | Allowed | Notes |
|--------|---------|-------|
| Register & Login | ✅ Yes | Self-service |
| Create Quiz | ✅ Yes | Becomes owner |
| Take Quiz | ✅ Yes | Any quiz |
| View Own Results | ✅ Yes | Their scores |
| Edit Other Quizzes | ❌ No | Forbidden |

### 👨‍💼 Admin Role

| Action | Allowed | Notes |
| Delete Any Quiz | ✅ Yes | Override |
| View All Results | ✅ Yes | From all users |
| Delete Any Result | ✅ Yes | Override |
| Manage Users | ✅ Yes | Full control |

**Note**: Admin account is created once via `/api/auth/register-admin`

---

## 🔧 Utility Scripts

### Seed Sample Quizzes
```bash
node src/scripts/seedQuiz.js
```
Populates database with sample quizzes for testing

**Output Example:**
```
Quiz 1: JavaScript Basics - 3 questions
Quiz 2: React Fundamentals - 4 questions
Quiz 3: CSS Grid & Flexbox - 2 questions
```
node src/scripts/resetAdminPassword.js
```
```
Admin password reset successfully!

---

## 👨‍💻 Development

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start with Nodemon (auto-reload on changes) |
| `npm start` | Start production server |
| `npm install` | Install/update dependencies |

### Running Utility Scripts

**Seed Sample Quizzes:**
```bash
```bash
node src/scripts/resetAdminPassword.js

### Development Tips

- 🔍 **View Network Requests**: Open browser DevTools → Network tab
  ```
- 💾 **Clear Storage**: Fresh start without logging out:
  ```javascript
  localStorage.clear(); location.reload()
  ```

---

## 🎨 Frontend Features

### Pages & Components

| Page | Features |
|------|----------|
| **🔐 Login** | Email/password authentication, register link |
| **📝 Register** | User signup with validation, auto-login |
| **📚 Quizzes** | Search by title, sort by date/name, card grid layout |
| **✏️ Edit** | Global edit/delete modes, inline question editing |
| **🎯 Quiz Taker** | Radio button selection, progress indicator, review before submit |
| **📊 Results** | Stats cards (total, avg score), sorting, delete modal |
| **👤 Profile** | View/edit username and password |

### UI/UX Features

- ✨ **Responsive Design**: Mobile-first, CSS Grid/Flexbox layouts
---

## 🚀 Deployment

1. **Push Code to GitHub**
   ```bash
   git push origin main
   ```
3. **Create New Web Service**
   - **Name**: quiz-app

4. **Add Environment Variables** in Render dashboard:
   JWT_SECRET=your-secret-key
   SENDGRID_API_KEY=your-sendgrid-key
   NODE_ENV=production

2. Create cluster (free tier available)
3. Get connection string: `MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/quiz-app`

- ✅ Secure passwords for admin account
- ✅ Frontend can access API (CORS enabled)

---

## 📚 Additional Resources

### Useful Links
- 🌐 [Express.js Documentation](https://expressjs.com)
- 🗄️ [MongoDB & Mongoose](https://mongoosejs.com)
- 🔐 [JWT Best Practices](https://jwt.io)
- 📧 [SendGrid API Docs](https://sendgrid.com/docs)
- ✅ [express-validator Guide](https://express-validator.github.io)

### Common Issues

**Q: "Cannot find module 'express-validator'"**
- Run: `npm install` in project root

**Q: "MongoDB connection failed"**
- Check `MONGO_URI` in `.env`
- Ensure MongoDB is running locally or MongoDB Atlas is accessible

**Q: "Token is invalid or expired"**
- Generate new token by logging in again
- Check `JWT_SECRET` hasn't changed

**Q: "Email not sending"**
- Verify `SENDGRID_API_KEY` in `.env`
- Check SendGrid account has sufficient credits

---

## 📝 License

**ISC** — See LICENSE file for details

---

## 🤝 Support & Contribution

Have questions or found a bug?

1. 📖 Check the [API Documentation](#-api-documentation) above
2. 🔍 Review frontend HTML files for usage examples
3. 📧 Review error responses in console
4. ⚙️ Check environment variables in `.env`

---

<div align="center">

### Built with ❤️ using Node.js, Express & MongoDB

**⭐ If you find this helpful, consider giving it a star!**

[↑ Back to top](#-quiz-backend)

</div>
