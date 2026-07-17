# Tugas 10  Aplikasi Todo Frontend dengan Backend NestJS

Project ini terhubung dengan file backend Tugas 9 dan hanya menambahkan CORS 

## Struktur Folder
```
tugas10/
├── CORS_SETUP.md           
└── frontend-todo/          
    ├── .env                
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── config.js
        ├── api/
        │   └── axiosInstance.js      
        ├── components/
        │   ├── TodoForm.jsx         
        │   ├── TodoItem.jsx          
        │   └── TodoFilter.jsx        
        └── pages/
            └── TodoList.jsx          
```

## Struktur Data Todonya Mengikuti Entitas Dari Tugas 9
### Contoh
```json
{
  "title": "Sepatu Sneakers Compass Vintage",
  "description": "Ukuran 42, warna hitam putih, bahan kanvas premium untuk gaya kasual.",
  "priority": "high",
  "dueDate": "2026-07-20"
}
```

## Struktur Endpoint Pada API diambil dari backend Tugas 9
| Method | Endpoint                         | Deskripsi                          |
|--------|----------------------------------|-------------------------------------|
| GET    | /api/v1/todos                    | Semua todo                          |
| GET    | /api/v1/todos?completed=true     | Filter todo selesai                 |
| GET    | /api/v1/todos?completed=false    | Filter todo aktif                   |
| GET    | /api/v1/todos/:id                | Detail 1 todo                       |
| POST   | /api/v1/todos                    | Tambah todo baru                    |
| PUT    | /api/v1/todos/:id                | Update todo                         |
| DELETE | /api/v1/todos/:id                | Hapus todo (balikan 204 No Content) |

## Cara Menjalankan
### 1. Buka file tugas 9 yang berisi backend 
```bash
download file tugas 9
terus ekstrak filenya
selanjutnya ke file tugas 9 dengan syntax cd Tugas-9 diterminal           
Terus tambahkan app.enableCors ke main.ts 
npm install
npm run start:dev
```
Backend berjalan di `http://localhost:3000/api/v1`.

### 2. Selanjutnya Ke Frontend Tugas 10
```bash
cd frontend-todo
npm install
npm install axios
npm run dev
```
Frontend akan berjalan di `http://localhost:5173`.
Pastikan file .envnya berisi `VITE_API_URL=http://localhost:3000`
