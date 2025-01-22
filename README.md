# Проект: Система Аутентификации с Капчей

## Описание

Данный проект представляет собой систему аутентификации, включающую:

-   Генерацию и верификацию капчи.
-   Аутентификацию пользователей с использованием JWT токенов (access и refresh).
-   Валидацию данных и безопасное управление сессиями.

Проект состоит из двух частей:

1. **Frontend** (Vue.js с использованием Ant Design).
2. **Backend** (NestJS с использованием TypeORM).

---

## Стек технологий

### Frontend

-   **Framework:** Vue.js
-   **UI-библиотека:** Ant Design
-   **Менеджмент состояния:** Vuex
-   **HTTP-клиент:** Axios
-   **Хуки для запросов:** Хуки оборачивающие Axios для упрощения работы с API.

### Backend

-   **Framework:** NestJS
-   **База данных:** MySQL через TypeORM
-   **Аутентификация:** JWT
-   **Капча:** svg-captcha
-   **Конфигурация:** @nestjs/config

---

## Установка и запуск

### Клонирование репозитория

```bash
git clone https://github.com/Stas-Z/Auth-service.git
cd Auth-service
```

### Backend

1. Перейдите в директорию `server`:
    ```bash
    cd server
    ```
2. Установите зависимости:
    ```bash
    npm install
    ```
3. Настройте файл `.development.env`:
    ```env
    NODE_ENV=development
    PORT=3000
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=your_password
    DB_DATABASE=your_database
    JWT_SECRET=your_jwt_secret
    JWT_REFRESH_SECRET=your_refresh_secret
    JWT_EXPIRATION=60000
    JWT_REFRESH_EXPIRATION=86400000
    ```
4. Запустите сервер:
    ```bash
    npm run start:dev
    ```

### Frontend

1. Перейдите в директорию `client`:
    ```bash
    cd client
    ```
2. Установите зависимости:
    ```bash
    npm install
    ```
3. Настройте файл `.env`:
    ```env
    VUE_APP_API_URL=http://localhost:3000
    ```
4. Запустите клиент:
    ```bash
    npm run serve
    ```

---

## Основные функции

### Backend

1. **Генерация капчи:**
    - Метод для создания SVG капчи и отправки её клиенту.
2. **Верификация капчи:**
    - Проверка пользовательского ввода с использованием JWT.
3. **Аутентификация:**
    - Генерация access и refresh токенов.
    - Обновление токенов через refresh токен.
4. **Валидация данных:**
    - Проверка email и пароля.
5. **Защищённые маршруты:**
    - Доступ к защищённым маршрутам только для авторизованных пользователей.

### Frontend

1. **Форма входа:**
    - Поля для email, пароля и капчи.
    - Отображение капчи, полученной с сервера.
2. **Обновление токенов:**
    - Автоматическое обновление access токена.
3. **Хуки для запросов:**
    - Хуки для взаимодействия с API (`useSubmit`, `useCaptcha` и т.д.).

---

## Архитектура проекта

### Backend

-   **Modules:**
    -   AuthModule
    -   CaptchaModule
    -   UsersModule
-   **Guards:**
    -   JwtCaptchaGuard
    -   JwtAuthGuard
    -   JwtRefreshAuthGuard
-   **Strategies:**
    -   LocalStrategy
    -   JwtStrategy
    -   JwtRefreshStrategy
-   **Interceptors:**
    -   CheckEmailExistInterceptor

### Frontend

-   **Страницы:**
    -   Login (вход в систему).
-   **Компоненты:**
    -   Captcha (компонент для отображения капчи).
-   **Хуки:**
    -   useSubmit (хук для отправки данных авторизации).
    -   useInit (хук для обновления токенов).
    -   useCaptcha (хук для запроса капчи).

---

## Как это работает

1. **Генерация капчи:**
    - Клиент отправляет запрос на сервер, чтобы получить капчу.
    - Сервер создаёт SVG капчу, шифрует текст капчи в JWT и отправляет клиенту SVG и токен.
2. **Вход в систему:**
    - Клиент вводит email, пароль и капчу.
    - Сервер проверяет введённые данные и капчу, генерирует access и refresh токены.
3. **Обновление токенов:**
    - Клиент использует refresh токен для получения нового access токена.
