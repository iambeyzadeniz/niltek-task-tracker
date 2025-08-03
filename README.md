# Task Tracker - Görev Takip Sistemi

Bu proje, kullanıcının görev ekleme, düzenleme, tamamlama ve silme işlemlerini yapabildiği React uygulamasıdır.

## Özellikler

### Temel Fonksiyonaliteler

- **Görev Listeleme**: Tüm görevleri tablo formatında görüntüleme
- **Görev Ekleme**: Modal form üzerinden yeni görev oluşturma
- **Görev Düzenleme**: Tablo üzerinde inline başlık düzenleme
- **Durum Değiştirme**: Görevleri tamamlandı/tamamlanmadı olarak işaretleme
- **Görev Silme**: Context menu veya işlemler butonundan silme
- **Loading Gösterimleri**: Tüm API işlemleri için loading states (Loading gösterimi için, her request işlemi sırasında 2.5 saniye delay eklenmiştir.)

### Teknik Özellikler

- **Modern React**: Functional components ve hooks
- **MUI DataGrid**: Profesyonel tablo bileşeni
- **Context API**: Merkezi state yönetimi
- **Form Validation**: Yup schema ile doğrulama
- **API İletişimi**: Axios ile RESTful API entegrasyonu
- **Responsive Design**: Mobil uyumlu arayüz
- **Toast Notifications**: Kullanıcı bildirimleri

## Teknoloji Stack'i

### Frontend

- **React 19** - Kullanıcı arayüzü
- **Material-UI (MUI)** - Component library
- **MUI DataGrid** - Tablo bileşeni
- **React Hook Form** - Form yönetimi
- **Yup** - Form validation
- **React Toastify** - Bildirimler
- **Axios** - HTTP istekleri

### Backend

- **JSON Server** - Fake REST API
- **db.json** - Veri depolama

## Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

### Kurulum Adımları

```bash
# Repository'i klonlayın
git clone <repository-url>
cd niltek-yazilim-teknolojileri-task-tracker

# Bağımlılıkları yükleyin
npm install

# JSON Server'ı global olarak yükleyin (eğer yoksa)
npm install -g json-server

# JSON Server'ı başlatın (Port 3001)
json-server --watch db.json --port 3001

# Yeni terminal açın ve React uygulamasını başlatın
npm run dev
```

### Erişim

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001

## Proje Yapısı

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── PageLayout.jsx
│   ├── TaskGrid/
│   │   └── TaskGrid.jsx
│   ├── TaskModal/
│   │   ├── TaskModal.jsx
│   │   └── TaskForm.jsx
│   └── Loading/
│       └── LoadingSpinner.jsx
├── contexts/
│   └── TaskContext.jsx
├── pages/
│   └── TasksPage.jsx
├── api/
│   ├── apiClient.js
│   └── tasksApi.js
├── utils/
│   ├── constants.js
│   └── validationSchemas.js
├── styles/
│   └── theme.js
├── App.jsx
├── index.css
└── main.jsx
```

## Kullanım

### Görev Ekleme

1. "Yeni Görev" butonuna tıklayın
2. Modal formda başlık ve açıklama girin
3. "Oluştur" butonuna tıklayın

### Görev Düzenleme

1. Görev başlığına çift tıklayın
2. Metni düzenleyin
3. Enter'a basın veya başka yere tıklayın

### Görev Tamamlama

1. İşlemler butonundan menüyü açın
2. "Tamamlandı İşaretle" seçeneğini seçin

### Görev Silme

1. işlemler butonundan menüyü açın
2. "Sil" seçeneğini seçin

## API Endpoints

### Görevler

- `GET /tasks` - Tüm görevleri listele
- `POST /tasks` - Yeni görev oluştur
- `PUT /tasks/:id` - Görev güncelle
- `PATCH /tasks/:id` - Kısmi güncelleme (başlık)
- `DELETE /tasks/:id` - Görev sil

### Veri Modeli

```json
{
  "id": 1,
  "title": "Görev başlığı",
  "description": "Görev açıklaması",
  "isCompleted": false,
  "createdAt": "2025-08-03T16:19:03.047Z",
  "updatedAt": "2025-08-03T20:21:45.066Z"
}
```

## Öne Çıkan Özellikler

### State Yönetimi

- Context API ile merkezi state (Geniş state yönetimi gerektiren bir proje olması durumunda redux kullanılacaktı)
- Reducer kullanımı
- Loading ve error state'leri

### Form Yönetimi

- React Hook Form entegrasyonu
- Yup schema validation

### DataGrid Özellikleri

- Inline editing
- Context menu
- Pagination
- Sorting
- Row selection

### Loading States

- Global loading spinner
- Row-level loading indicators
- Button loading states
- API request loading

### Error Handling

- Axios interceptors
- Toast notifications
- User-friendly error messages
- Network error handling

### Performance

- Callback optimizasyonları (useCallback)
- Memoization (useMemo)
