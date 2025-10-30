const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

// transaction = berisi array
// transactions = nama key= local Stroage

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
// buat variabel baru bernama transaction untuk menyimpan daftar transaksi
// localStorage = tempat penyimpanan di browser
// getItem("transactions") = ambil data dari penyimpanan (localStorage) yang namanya transactions
// karena localStorage hanya bisa menyimpan teks
// menjadikan data JS asli (like array/objek) harus mengubah kembali dari teks ke bentuk aslinya
// JSON.parse() = ubah teks(string) yang berbentuk JSON menjadi data JavaScript asli
// jadi data bukan teks, tapi array berisi objek JavaScript yang bisa dimanipulasi oleh JavaScript
// ambil data transaksi dari penyimpanan browser (localStorage)
// || = operator "atau", [] = array kosong, agar tidak error
// kalau data "transactions" ada di localStorage, maka ambil dan ubah ke bentuk JavaScript
// kalau belum ada, maka buat array kosong [] agar tidak eror

transactionFormEl.addEventListener("submit", addTransaction);
// jika ada yang "submit" pada elemen HTML "transactionFormEl" maka jalankan function "addTransaction"

function addTransaction(e) {
// buat function bernama addTransaction dengan parameter bernama e
// e = parameter = nilai tambah supaya bisa bekerja dengan data yang berbeda-beda
// parameter = "tempat penampung sementara" untuk nilai yang dikirim ke fungsi
// e = mewakili objek event

  e.preventDefault();
  // e = objek menyimpan "event", if fungsi dipanggil saat form dikirim, e berisi tentang event tersubmit
  // preventDefault() = metode memberitahu browser "jangan lakukan tindakan default untuk event ini"
  // tindakan default seperti mengirim data ke server atau reload atau membuka alamat di href
  // jadi kita bisa menangani data sendiri lewat JavaScript (ex: menimpan di localStorage, memvalidasi, menampilkan pesan)
  
  // get form values
  const description = descriptionEl.value.trim();
  // .value = isi dari input di HTML = "ambil isi teks yang diketik oleh pengguna di dalam kotak input itu"
  // .trim() = fungsi bawaan JavaScript untuk menghapus spasi berlebihan di awal dan akhir teks
  // buat variabel bernama description, 
  // isi variabel tersebut dengan teks yang diketik oleh pengguna di kolom input dengan id="description"
  // sebelum disimpan, bersihkan dulu spasi di awal dan akhir teksnya

  const amount = parseFloat(amountEl.value);
  // buat variabel bernama amount,
  // isi variabel tersebut dengan angka yang di input oleh user di elemen HTML amountEl
  // praseFloat() = fungsi bawaan JavaScript untuk mengubah teks menjadi angka desimal(bilangan pecahan)

  transactions.push({
  // menambahkan array baru dalam variabel transactions
  // berisi : id, description, dan amount
  // .push() = metode untuk menambahkan item baru ke akhir array
    id: Date.now(),
    // Date.now() = ID sederhana dan unik untuk berdasarkan waktu sekarang
    description,
    amount,
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
  // localStorage = tempat penyimpanan di browser
  // .setItem(key, value) = metode untuk menyimpan sesuatu ke localStorage
  // key = nama label untuk data di sini = "transactions"
  // value = isi datanya harus berupa string
  // JSON.stringify() = mengubah tipe data dari variabel transaction berupa array menjadi string teks dalam format JSON agar bisa disimpan di localStorage
  // simpan daftar transactions ke penimpanan browser localStorage dengan mengubahnya dulu menjadi teks (format JSON)
  // jadi data tetap ada walau halaman ditutup, dan bisa dibaca lagi nanti
  
  updateTransactionList();
  // jalankan function updateTransactionList
  updateSummary();
  // jalankan function updateSummary

  transactionFormEl.reset();
  // .reset() fungsi milik elemen <form> untuk kembalikan form ke kondisi awal
  // hapus semua isi input dalam form HTML agar kembali kosong seperi semula
  // agar setelah klik button submit form kembali kosong
}

function updateTransactionList() {
// membuat function bernama updateTransactionList
  transactionListEl.innerHTML = "";
  // transactionListEl elemen HTML berisi data transaksi
  // .innerHTML = properti bawaan JavaScript mewakili isi konten HTML di dalam suatu elemen, dapat melihat, mengambil, mengubah
  // "=" berarti mengganti nilainya
  // tanda "" berarti hapus semua isi di elemen ini

  const sortedTransactions = [...transactions].reverse();
  // buat variabel bernama sortedTransactions isi dengan,
  // salinan dari variabel transactions, lalu balik urutannya (reverse)
  // [...] disebut spread operator = untuk membuat salinan baru
  // .reverse() = adalah metode bawaan array di JavaScript = untuk membalik uruan elemen di dalam array
  // reserve() mengubah array aslinya (bukan membuat baru)
  // ditulis [...transactions] agar yang dibalik salinan array buka array aslinya (transactions)
   
  sortedTransactions.forEach((transaction) => {
  // lakukan sesuatu untuk setiap transaksi di sortedTransactions
  // .forEach() = metode bawaan array untuk mengulangi (iterate) semua elemen di array
  // transaction = variabel mewakili satu item pada tiap perulangan

    const transactionEl = createTransactionElement(transaction);
    // buat variabel bernama transactionEl isi dengan,
    // memanggil function createTransactionElement, 
    // dan simpan hasilnya ke dalam variabel bernama transactionEl
    // (transaction) = parameter yang dikirim ke fungsi itu
    // (transaction) = data satu transaksi, biasanya dalam bentuk objek

    transactionListEl.appendChild(transactionEl);
    // menaruh variabel transactionEl ke dalam elemen HTML transactionListEl
    // transactionListEl = elemen HTML kontainer
    // .appendChild() = tambahkan child ke akhir daftar anak-anak elemen ini / tarus esuatu di dalam kotak itu, di posisi paling bawah/akhir
    // jadi = "ambil transactionEl dan masukan ke dalam transactionListEl sebagai anak terakhir"
  });
}

function createTransactionElement(transaction) {
// definisi fungsi createTransactionElement
// function ini menerima satu input bernama "transaction" (sebuah objek yang mewakili satu transaksi)
// parameter = tempat fungsi menerima data dari luar

  const li = document.createElement("li");
  // buat variabel bernama li dan isi dengan,
  // isi dengan sebuah elemen HTML baru bernama <li>
  // document = objek utama di JavaScript yg mewakili seluruh dokumen HTML 
  // .createElement() = method dari objek dokumen untuk membuay HTML baru secara dinamis melalui kode, bukan langsung ditulis di HTML file
  // .createElement() = membuat elemen secara dinamis lewat JavaScript
  // ("li") = tag HTML akan menjadi <li></li)

  li.classList.add("transaction");
  // menambahkan CSS class bernama "transaction" ke dalam elemen HTML yang disimpan di variabel li
  li.classList.add(transaction.amount > 0 ? "income" : "expense");
  // untuk menambahkan CSS class "income" / "expense" berdasarkan apakah transaction.amount > 0 ?
  // .classList = properti DOM untuk mengelola class pada elemen
  // .add = untuk menambahkan 1 atau beberapa kelas ke elemen
  // format penulisan = kondisi ? nilaijikabenar : nilaijikasalah

  // ganti seluruh isi elemen HTML li dengan = 
  // (`..`) = backticks = template literal = memudahkan membuat string multi-baris dan menyisipkan nilai variabel
  // seletah baris diesekusi, browser mengurai string itu jadi elemen DOM
  // (`..`) = backticks = memungkinkan menulis string multi-baris dan menyisipkan variabel/fungsi denngan ${...}
  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>
    ${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </span>
  `;
  // ${transaction.description} = sisipkan teks deskripsi transaksi
  // ${formatCurrency(transaction.amount)} = sisipkan hasil function yang mengubah angka jadi teks format uang
  // ${transaction.id} = sisipkan id transaksi

  // oneclick="..." = atribut HTML untuk handler event click
  // jika user click akan menjalankan function removeTransaction
  // onclick="removeTransaction(${transaction.id})"
  // artinya : kalau button di klik, jalankan function removeTransaction dan kirim id transaksi ini ke function tersebut

  return li;
  // function berhenti dan nilai li ditampilkan
  // kembalikan nilai li dari fungsi ini 
  // return itu perintah dalam JavaScript untuk mengitimkan hasil keluar dari sebuah fungsi
}

function updateSummary() {
  // mendefinisikan function updateSummary
  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  // buat variabel baru bernama balance isi dengan,
  // untuk setiap "transaction" (array) di "transactions" (localStorage), ambil nilai transaction.amount dan tambahkan ke acc
  // nilai acc dari 0
  // acc = accumulator = menyimpan hasil sementara atas penjumlahan seluruh income dan expense
  // "hitung balance dengan menjumlahkan semua nilai amaount dari koleksi transactions, mulai dari 0"
  const income = transactions
  // buat variabel bernama income berisi transactions (localStorage)
    .filter((transaction) => transaction.amount > 0)
    // ambil hanya elemen dari array yang punya amaount > 0
    .reduce((acc, transaction) => acc + transaction.amount, 0);
    // jalanin semua item di transaction (array) satu per satu, tambahkan nilai amount
    // dari tiap transaksi ke sebuah penyimanan sementara (acc), mulai dari 0
    // hasil akhirnya adalah jumlah total semua amount

    // .filter() = metode pada array di JS = untuk membuat array baru berisi subset elemen dari array asal, berdasarkan kondisi tertentu
    // .reduce() = metode array di JS untuk mengakumulasi seluruh elemen array menjadi satu hasil akhir
    // acc = fungsi callback .reduce()
    // ((transaction) => transaction.amount > 0) = jika hasil transaction.amount > 0 = true, maka akan disertakan dalam array hasil

  const expenses = transactions
  // buat variabel bernama expenses berisi transactions (localStorage)
    .filter((transaction) => transaction.amount < 0)
    // ambil hanya elemen dari array yang punya amoung < 0
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // update ui => todo: fix the formatting
  balanceEl.textContent = formatCurrency(balance);
  // ubah isi elemen HTML balanceEl dengan menjalankan funciton formatCurrency berdasarkan (balance)
  incomeAmountEl.textContent = formatCurrency(income);
  // ubah isi elemen HTML incomeAmountEl dengan menjalankan function formatCurrency berdasarkan (income)
  expenseAmountEl.textContent = formatCurrency(expenses);
  // ubah isi elemen HTML expenseAmountEl dengan menjalankan fungsi formatCurrency berdasarkan (expenses)
}

function formatCurrency(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
  // function ini menerima sebuah angka (number) lalu mengubahnya menjadi string
  // yang diformat sebagai uang dalam format bahasa en-us
  // Intl.NumberFormat = API bawaan JS untuk memformat angka sesuai aturan
  // parameter pertama = "en-US" = parameter menentukan lokasi
  // style = "currency" = memberihatu bahwa tujuan adalah menampilkan uang
  // currency = "USD" = menentukan kode mata uang ISO = menentukan simbol $ 
  // .format(number) = mengubah angka menjadi string terformat sesuai pengaturan
  // jadi formatCurrency(1234.56) = mengembalikan "$1,234.56"
}

function removeTransaction(id) {
  // ini adalah fungsi yang bertugas menghapus transaction (array) tertentu dari transactions (localstorage) berdasarkan ID-nya
  transactions = transactions.filter((transaction) => transaction.id !== id);
  // ambil hanya elemen dari array yang punya id sama dengan id yang dikirim dari button delete
  // .filter(...) = membuat array baru yg hanya elemen yg lolos uji kondisi apakah id transaksi sama dengan id yang dari button menghapus data
  // transactions = menimpa array lama dengan array baru hasil filter
  // data transaction lama yang punya ID sama dengan ID dari button akan hilang

  localStorage.setItem("transcations", JSON.stringify(transactions));
  // "simpan data transcation ke penyimpanan browser (localStorage) supaya data tetap ada, wapi sebelumnya ubah ke dalam string"
  // localStorage berbentuk key-value, dimana key-value harus string
  // JSON.stringify() mengubah array/objek menjadi string JSON yg bisa disimpan di localStorage

  updateTransactionList();
  updateSummary();
}

// initial render
updateTransactionList();
updateSummary();
