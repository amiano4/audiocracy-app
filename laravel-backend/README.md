# Audiocracy API - Laravel Backend

## 🚀 Installation & Setup

### **1️⃣ Prerequisites**

-   **PHP 8.2+**
-   **Composer**
-   **MySQL or PostgreSQL** (or any database you prefer)
-   **Laravel CLI** (Optional)

---

### **2️⃣ Install Dependencies**

```sh
cd laravel-backend
composer install
```

---

### **3️⃣ Configure Environment Variables**

1. Copy the `.env.example` file to `.env`:
    ```sh
    cp .env.example .env
    ```
2. Open `.env` and configure your database connection:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=audiocracy
    DB_USERNAME=root
    DB_PASSWORD=
    ```

---

### **4️⃣ Generate Application Key**

```sh
php artisan key:generate
```

---

### **5️⃣ Run Database Migrations & Seed Data**

```sh
php artisan migrate --seed
```

---

### **6️⃣ Serve the Application**

```sh
php artisan serve
```

Your API will be available at **http://127.0.0.1:8000**
