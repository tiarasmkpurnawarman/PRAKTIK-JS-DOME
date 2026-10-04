console.log("Bismillah Praktikum Dimulai");

// aktivitas 1 DOM SELECTION / Seleksi elemen
// Kenapa kita harus seleksi karna "menangkap" atau mengambil id/class
// Mengambil elemen html tersebut lalu disimpan di variabel javascript

// 1. mengambil elemen judul utama & sub judul 
// document.getElementById("...") mengambil berdasarkan atribut id.

const judulUtama = document.getElementById("judul-utama"); //menangkap: <h1 id="judul-utama">

// document.querySelector("#...")
// tanda # artinnya ID

const subjudul = document.querySelector("#sub-judul") // menangkap: <p id="sub-judul">

// 2. Mengambil elemen pada kartu 1 (Kartu Manipulasi Teks & Style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. menambil elemen tombol - tombol aksi pada kartu 1
const BtnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. Mengambil elemen pada kartu 2 (Fitur catatan dinamis / To Do List sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");

const totalTugas = document.getElementById("total-tugas");
const tugasSelesai = document.getElementById("tugas-selesai");
const tugasBelumSelesai = document.getElementById("tugas-belum-selesai");

// Aktivitas ke 2 manipulasi teks & style (card 1)
// addEventListener("click", function() {...}) artinya adalah tolong dengarkan dulu / tunggu
// sampai di klik user. jika di klik jalankan perintah dalam function

// A. mengubah teks & warna secara langsung

BtnUbahTeks.addEventListener("click", function() {
    // . innertext = mengganti atau mengisi secara  langsung teks yang ada didalam html
    teksPreview.innerText = "Hebat! Teks ini berhasil diubah pake DOM!";

    // style.color = mengubah warna teks secara langsung (Inline style)
    teksPreview.style.color = "#4138ee";

    // console.log = mencetak pesan di console style
    console.log("[DOM] Teks preview telah diperbaharui!");
});

// B. Manipulasi Class Css menggunakan clastlist.toggle()
btnToggleWarna.addEventListener("click", function() {
    // .classlist.toggle("nama-class") = fitur saklar otomatis (ON/OFF)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Berhasil di Switch!");
});

// C. Mengembalikan (reset) Teks ke kondisi semula
btnReset.addEventListener("click", function() {
    // 1. Kembalikan Teks semula teks asli
    teksPreview.innerText = "Halo! Teks ini siap diubah oleh Javascript";

    // 2. Kosongkan Warna agar kembali ke warna css bawaan
    teksPreview.style.color = "";

    // 3. Hapus class khusus untuk mengembalikan .classlight.remove("")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilan di reset");
});

// Aktivitas 3 & 4 : Elemen dinamis & event handling (To Do List Sederhana)
// Di aktivitas ini jika kita belajar elemen HTML baru (<li>) secara otomatis dalam javascript
// Mengisi Teksnya, memberi tombol hapus, lalu menempelkan ke layar (<li>)

// Langkah 1: Membuat Variabel penampung angka jumlah catatan
// "let" digunakan untuk nilai variabel yang akan berubah ubah bisa bertambah bisa berkurang (counting)
let totalCatatan = 0;

// Langkah 2: Fungsi Update angka counter & pesan status
function perbaruiJumlah() {
    // Masukan angka total caatan terbaru kedalam tag <span id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;

    // conditional statement berupa apakah catatannya itu kosong / 0?
    if (totalCatatan === 0) {
        // jika 0: Hapus class "hidden" supaya teks "belum ada catatan" muncul ke layar
        pesanKosong.classList.remove("hidden");
    } else {
        // Jika > 0: tambahkan class "hidden" agar teks "belum ada catatan" tersembunyi
        pesanKosong.classList.add("hidden");
    }

    const semuaTugas = document.querySelectorAll(".note-item");
    const tugasYangSelesai = document.querySelectorAll(".note-item.completed");

    totalTugas.innerText = semuaTugas.length;
    tugasSelesai.innerText = tugasYangSelesai.length;
    tugasBelumSelesai.innerText = semuaTugas.length - tugasYangSelesai.length;
}

// Langkah 3: Fungsi Utama Logika Tambah Catatan Baru
function tambahCatatan() {
    // 3.1 inputCatatan.value fungsinnya untuk mengambil teks yang diketik oleh user
    // .trim() = menghapus spasi diawal dan diakhir
    const isiTeks = inputCatatan.value.trim();

    // 3.2 Validasi Input: Jika isi teks kosong maka tampilkan alert
    if (isiTeks === "") {
        alert("Catatan kamu tidak boleh kosong!");
        return;
    }

    // 3.3 document.createElement("li") -> membuat memori di javascript secara dinamis
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; //menampilkan pada tag li

    // 3.4 .innerHTML = mengisi struktur didalam <li> dengan teks catatan dan tombol hapus
    // Tanda backtick (')
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-selesai">Selesai</button> <button class="btn-hapus">Hapus</button>`;

    // 3.5 menambahkan telinga / event listener untuk tombol hapus pada catatan dinamis
    // liBaru.querySelector(".btn-hapus") = mengambil tombol ber class "btn-hapus" khusus yang ada di li
    const btnSelesai = liBaru.querySelector(".btn-selesai");
        btnSelesai.addEventListener("click", function() {
        liBaru.classList.toggle("completed");
    perbaruiJumlah();
});

    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function() {
        liBaru.remove(); // menghapus element list dari layar HTML
        totalCatatan--; // totalCatatan dikurangi sebanyak 1x
        perbaruiJumlah(); // panggil fungsi perbaruan jumlah untuk update angka di layar
        console.log('Dom Catatan "${isiText}" dihapus.' );
    });

    // 3.6 appendChild = memasukan element li kedalam wadah <ul id="daftar-catatan">
    daftarCatatan.appendChild(liBaru);

    // 3.7 mengosongkan kembali isi kolom input (inputCatatan.value = "") supaya bisa diketik lagi
    inputCatatan.value = "";

    // 3.8 totalCatatan++ artinya tambah nilai total catatan sebanyal 1, lalu update angka ke layar 
    totalCatatan++;
    perbaruiJumlah();

    console.log(`Dom Catatan baru ditambahkan: ${isiTeks}`);
}

// Langkah 4: Event Listener Klik Tombol + "Tambah"
// ketika tombol "+ Tambah" di klik oleh user, maka jalankan fungsi tambah catatan()
btnTambah.addEventListener("click", function() {
    tambahCatatan();
});

// Langkah 5: Event Listener keyboard "Enter" pada kolom input
// Ketika user mengetik dikolom input dan melepas tombol keyboard ('Event keyup');
inputCatatan.addEventListener("keyup", function(event) {
    // periksa apakah tombol keyboard yang ditekan user adalah enter?
    if (event.key === "Enter") {
        tambahCatatan(); //jika ya, jalankan fungsi tambahCatatan();
    }
});
