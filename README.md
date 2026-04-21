# React TechCase

Mini task gereksinimlerine gore hazirlanmis, `React + TypeScript + Vite` tabanli bir uretici sourcing paneli.

## Neler Var

- Uretici liste ekrani
- Uretici detay sayfasi
- Validasyonlu talep gonder formu
- Loading, basari ve hata durumlari
- Responsive admin-panel yerlesimi
- Mock data ve mock submit API akisi
- Shadcn tabanli sidebar, kart ve form bilesenleriyle modern admin deneyimi

## Ekranlar

### 1. Uretici Liste Ekrani
- Arama, sehir ve kategori filtreleri
- Kart bazli uretici listesi
- MOQ, termin, kapasite, skor ve sertifika gorunumu

### 2. Uretici Detay Sayfasi
- Kapak alani
- Profil/logo alani
- Uretici bilgileri
- Sertifikalar
- Urun gruplari
- Galeri alani
- Talep gonder paneli

### 3. Talep Gonder Formu
- Alan bazli validasyon
- Mock API ile submit
- Loading state
- Basarili gonderim mesaji
- Hata mesaji

## Calistirma

```bash
npm run dev
```

## Diger Komutlar

```bash
npm run build
npm run lint
```

## Teknik Notlar

- Router kutuphanesi eklenmeden hash-based sayfa akisi kuruldu.
- Bilesenler ayrik dosyalarda organize edildi.
- Form akisi kapasite ve MOQ kurallarini dikkate alir.
- UI dili, tech case akisini net gosterecek sekilde sade ve modern bir admin panel yapisina uyarlandi.
- Kullanılan görsel materyallaer "lorem.picsum" kaynağından sağlanmıştır. Görseller temsili ve anlamsızdır.
- `npm run build` ve `npm run lint` komutlari basariyla dogrulandi.
