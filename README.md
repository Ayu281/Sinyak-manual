# Signal Updater

Aplikasi sederhana untuk update sinyal trading dengan Node.js + Express + EJS.

## Cara Install

1. Clone repo ini ke Termux/komputer:
    ```
    git clone https://github.com/USERNAME/REPO.git
    cd REPO
    ```

2. Install dependensi:
    ```
    npm install
    ```

3. Jalankan server:
    ```
    node app.js
    ```

4. Buka browser ke `http://localhost:3000`

## Fitur
- Dropdown pair, aksi BUY/SELL, input harga, tombol enter.
- Data sinyal terbaru tampil di bawah form.
- Data tersimpan di file `signals.json`.

---

> **Catatan:**  
> Jika ingin di-host ke GitHub, upload semua file di atas ke repo baru.  
> Untuk deploy online bisa pakai [Railway](https://railway.app/), [Render](https://render.com/), atau [Vercel](https://vercel.com/) (modifikasi sedikit untuk serverless).
