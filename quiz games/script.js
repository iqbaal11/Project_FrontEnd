// pengambilan elemen DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
// const = mendeklarasikan variabel = tidak bisa diubah
// document.getElementById("") mengambil elemen HTML dengan id tertentu dan menyimpannya ke variabel
// setelah disimpan, script bisa mengubah teks, menambah/menghapus CSS, mengubah style, dan memasukan elemen baru
// contoh : startCscreen.classList.remove("active")akan menyembunyikan layar start
// jika CSS .screen.active membuatnya tampil
// ambil elemen HTML yang memiliki id bernama "start-screen", lalu simpan ke dalam variabel bernama startScreen agar bisa digunakan di JavaScript
// JavaScript sedang mengambil elemen HTML yang memiliki id tersebut

// Bagian data pertanyaan

const quizQuestions = [
  // buat variabel bernama quizQuestion = array = kumpulan data dalam pertanyaan kuis
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  // [] = menandakan tipe data aray
  // {} = mendandakan onjek, yaitu kumpulan pasangan kunci-nilai
  // 
  // 
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// membuat Variabel status Kuis
let currentQuestionIndex = 0;
// membuat variabel bernama currentQuestionIndex agar pertanyaan mulai dari 0
let score = 0;
// membuat variabel dengan nama score berisi 0
let answersDisabled = false;
// let = mendeklarasikan variabel = bisa ubah
// artinya jawaban saat ini belum dinonaktifkan = bisa dijawab
// buat sebuah variabel bernama answerDisabeld dan isi dengan nilai false = tidak aktif
// answersDisabled = flag mencegah user menekan jawaban berkali-kali sebelum pidah soal

totalQuestionsSpan.textContent = quizQuestions.length;
// "ambil jumlah pertanyaan dari quizquestion, lalu tampilkan jumlah itu di elemen HTML totalQuestionsSpan"
// quizQuestion berisi data array
// quizQuestions.length untuk menghitung berapa banyak isi array itu

maxScoreSpan.textContent = quizQuestions.length;
// "ambil jumlah pertanyaan yang sama, lalu tampilkan di elemen HTML maxScoreSpan"
// totalQuestionsSpan dan maxScoreSpan adalah variabel yang menyimpan elemen HTML
// totalQuestionsSpan menampilkan bagian di halaman yang menampilkan jumlah pertanyaan
// maxScoreSpan menampilkan bagian di halaman yang menampilkan skor maksimal
// textContent = fitur dari elemen HTML yang digunakan untuk mengubah atau menampilkan teks di elemen tersebut
// .length menghitung berapa banyak isi di dalam array atau teks

// event listeners = bagaimana interaksi dimulai
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
// startButton dan restartButton adalah variabel yang menyimpan elemen tomvol dari halaman HTML
// .addEventListener() = untuk memeasang "pendengar" (listener) pada elemen HTML,
// agar js bisa mengetahui dan merespons ketika pengguna melakukan aksi seperti
// "click" = klik mouse
// "keydown" = tekan tombol keyboard
// "mouseover" = arahkan krusor
// "scroll" = gulir layar
// startQuiz dan restartQuiz = nama function yang akan dijalankan ketika tombol diklik

// fungsi untuk memulai kuis
function startQuiz() {
  // mendefinisikan sebuah fungsi di js, sebuah perintah otomatis yang berisi serangkaian langkah
  currentQuestionIndex = 0;
  // mengatur posisi pertanyaan saat ini ke pertanyaan pertama
  // currentQuestionIndex = variabel yang menyimpan nomor pertanyaan yang sedang aktif
  // nilai 0 berarti pertanyaan pertama
  score = 0;
  // mengatur nilai skor poin pemain kembali ke 0
  scoreSpan.textContent = 0;
  // menampilkan skor awal (0) ditampilan web
  // scoreSpan = menyimpan elemen HTML tempat skor ditampilkan 
  // .textContent = 0 ganti isi teks dalam elemen itu menjadi angka 0

  startScreen.classList.remove("active");
  // startScreen = elemen HTML yang berisi tampilan awal kuis
  // menyembunyikan halaman awal (startscreen)
  // .classList.remove("active") = artinya hapus kelas CSS bernama "active" dari elemen itu
  // di file CSS kelas "active" mengatur elemen supaya terlihat di layar
  // jika kelas itu dihapus, tampilan "Start screen" akan menghilang/tersembunyi
  quizScreen.classList.add("active");
  // quizScreen = emelemen HTML yang berisi pertanyaan kuis
  // .classList.add("active") = menambahkan kelas CSS "active" suoata kuis muncul di layar

  showQuestion();
  // memanggil fungsi showQusestion yang akan didefinisikan di bawah ini
}

function showQuestion() {
  // mendefinisikan function showQuestion yang sudah dipanggil di atas ketika menjalankan function startQuiz
  answersDisabled = false;
  // mengizinkan pengguna menjawab pertanyaan
  // jawaban belum dikunci, pengguna boleh memilih jawaban

  const currentQuestion = quizQuestions[currentQuestionIndex];
  // const = mendeklarasikan variabel currentQuestion berisi
  // quizQuestions = array berisi semua pertanyaan kuis
  // currentQuestionIndex = nomor urutan pertanyaan yang sedang ditampilkan
  // "ambil pertanyaan yang sedang aktif dari semua pertanyaan"

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  // currentQuestionSpan = elemen HTML yang digunakan untuk menampilkan nomor petanyaan
  // .textContent = untuk mengubah isi teks elemen tersebut
  // currentQuestionIndex + 1 = karena agar tampil 1

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  // mendeklarasikan variabel progressPercent yang berisi = 
  // pertanyaan saat ini dibagi total pertanyaan di kali 100

  progressBar.style.width = progressPercent + "%";
  // progressBar = elemen HTML untuk menampilkan progres pertanyaan
  // .style.width digunakan untuk mengubah lebar tampilan elemen tersebut lewat JavaScript
  // progressPercent adalah variabel yang berisi angka 
  // kode + "%" menambahkan simbol persen agar CSS-nya tahu bahwa nilai dalam bentuk persen bukan angka
  // Artinya = "ubah lebar widht dari elemen bernama ProgressBar sesuai dengan
  // nilai ProgresPercent dalam satuan persen (%)"
  
  questionText.textContent = currentQuestion.question;
  // questionText = elemen HTML tempat menampilkan teks pertanyaan
  // .textContent = mengubah isi teks di dalam elemen HTML tersebut
  // "tampilkan teks dari (currentQuestion.question) pertanyaan ke dalam elemen HTML yang bernama question Text"

  answersContainer.innerHTML = "";
  // answersContainer = elemen HTML tempat menampilkan jawaban
  // Artinya ="hapus semua isi yang ada di dalam elemen answersContainer"

  currentQuestion.answers.forEach((answer) => {
  // membuat looping terhadap setiap item (isi) yang ada di dalam (aray) currentQuestion.answers
  // .forEach() = mengulangi semua item array (answers) untuk setiap item
  // Artinya ="untuk setiap answers yang ada didalam currentQuestion.answers lakukan perintah berikut"

    const button = document.createElement("button");
    // .createElement = membuat elemen HTML dengan nama button
    // dan di disimpan di variabel button
    // "buatlah elemen HTML baru dengan nama button, menggunakan js dan simpan hasilnya ke dalam variabel bernama button"
    
    button.textContent = answer.text;
    // mengisi variabel button dengan answer.text

    button.classList.add("answer-btn");
    // .classList = memberi akses ke daftar Class CSS
    // buatkan clas CSS dengan nama answer-btn dalam elemen button

    button.dataset.correct = answer.correct;
    // button = elemen HTML 
    // .dataset = fitur khusus javascript untuk menyimpan dan membaca data tambahan di dalam elemen HTML
    // jadi dataset adalah objek yang menampung semua data milik elemen tersebut
    // .correct = nama data yang disimpan
    // answer.correct = nilai yang 
    // maka = "simpan informasi tambahan bernama corrext ke dalam tombol (Button) dan isinya diambil dari answer.correct"
    
    button.addEventListener("click", selectAnswer);
    // button = element HTML
    // .addEventListener = untuk "pendengar" pada elemen HTML, agar js bisa mengetahui dan merespons ketika pengguna melakukan aksi
    // "click" = beri respon jika ada yang click di button
    // selectAnswer = function yang dijalankan ketika button mendapakan click
    // "jika tombol ada yang click, jalankan fungsi selectAnswer"

    answersContainer.appendChild(button);
    // memasukan elemen button ke dalam elemen HTML answerContainer
    // answersContainer = variabel mewakili sebuah elemen HTML
    // appenChild = untuk menambahkan sebuah elemen akan ke elemen induk
    // elemen button yang sudah di buat terlebih dahulu di js
  });
}

// logika ketika jawaban dipilih
function selectAnswer(event) {
  // function = sekumpulan perintah
  // selectAnswer dijalankan ketika menekan tombol
  // event = parameter function = objek berisi informasi, "kotak" yang berisi fungsi terima ketika dipanggil
  
  if (answersDisabled) return;
  // untuk mencegah function berjalan ketika jawaban dikunci (answerDisabled = true)
  // return menghentikan function di situ
  // jika answersDisabeld (dikunci), hentikan function

  answersDisabled = true;
  // begitu pemain memilih jawaban, kunci dulu soalnya lagi proses penilaian jawaban
  // akan berganti (false) = dibuka ketika berpindah ke pertanyaan berikutnya

  const selectedButton = event.target;
  // buat variabel bernama selectedButton dengan isi elemen HTML yang diklik oleh pengguna (event.target)
  // jika pemain klik button, maka selectedButton berisi button mana yang diklik
  // varibel selectdButton untuk memeriksa jawaban salah/benar, memberi warna hijau/merah
  // event.target menunjuk HTML yang di klik oleh pemain

  const isCorrect = selectedButton.dataset.correct === "true";
  // buat variabel bernama isCorrect, lalu isi dengan hasil pemeriksaan apakah tombol yang diklik (selectedButton) punya tanda data-correct = "true" di HTML
  // kode ini dipakah untuk mengetahui apakah jawaban yang diklik benar atau salah
  // selectedButton = button yang diklik oleh pengguna
  // .dataset.correct = mengambil nilai dari atribut data-correct di HTML
  // === "true" melihat apakah nilainya sama persis dengan teks "true"
  // dataset adalah cara JS membaca atau mengakses atribut data khusus yang ada di elemen HTML

  // untuk cek semua button jawaban yang ada
  // if button = benar maka dengan warna hijau (pakai class CSS bernama "correct")
  // if button = salah maka dengan warna merah (pakai class CSS "incorect")
  Array.from(answersContainer.children).forEach((button) => {
  // answerContainer = elemen HTML berisi semua button
  // answersContainer.children = mengambil semua elemen anak di dalamnya, 4 button
  // Array.form() untuk mengubah NodeList menjadi array, agar bisa perulangan menggunakan .forEach()
  // .forEach () = lakukan seesuatu {} untuk setiap item aray yaitu button
  // {} akan dijalankan untuk setiap tombol

    if (button.dataset.correct === "true") {
    // mengambil nilai dari atribut data pada HTML
    // jika pada data set button = benar, maka tambah CSS class correct pada button, akan berwarna ijo
      button.classList.add("correct");
    } else if (button === selectedButton) {
      // jika button ini bukan jawaban benar, tapi tombol ini adalah yang diklik, maka
      // button = variabel mewakili tombol jawaban tertentu saat perulangan (forEach)
      // selectedButton tombol yg di klik dari selectedButton = event.target
      button.classList.add("incorrect");
      // maka tambah CSS clas incorrect pada button
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  // jika (isCorrect=true(pada variabel boolean)) terpenuhi 
  // maka tambahkan 1 poin ke variabel score (score++) = cara singkat menambah sore sebesar 1
  // dan tampilkan nilai skor terbaru di layar (scoreSpan.textContent = score)
  // scoreSpan = elemen HTML
  // .textContent = properti untuk mengatur isi teks di dalam elemen HTML
  // berarti perbarui teks di layar supaya menunjukan score yang baru

  // "jeda 1 detik, lalu naikkan angka penunjuk soal saat ini (currentQuestionIndex) kalau masuk ada soal berikutnya
  // tampilkan soal berikutnya, jika tidak ada lagi tampilkan hasil akhir quis"
  setTimeout(() => {
  // setTimeout = perintah untuk menunda sesuatu
  // 1000 ms = second
  // () => {} (arrow function) = cara singkat menulis fungsi di JS
  // jadi = setelah satu detik, jalankan intruksi di dalam {}

    currentQuestionIndex++;
    // menaikkan penanda soal saat ini sebanyak 1

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
    // jika pertanyaan saat ini kurang dari total pertanyaan maka panggil function showQuestion()
      showQuestion();
    } else {
      // jika tidak jalankan function showResult
      showResults();
    }
  }, 1000);
}

function showResults() {
// mendeklarasikan function showResult
  quizScreen.classList.remove("active");
  // menghilangkan class CSS bernama active pada quizscreen
  resultScreen.classList.add("active");
  // menambahkan clas CSS bernama active pada resultScreen

  finalScoreSpan.textContent = score;
  // tampilkan variabel score yang terbaru pada elemen HTML bernama finalScoreSpan
  // finalScoreSpan = elemen HTML 
  // .textContent = properti untuk mengatur isi teks di dalam elemen HTML
  // score = variabel 

  const percentage = (score / quizQuestions.length) * 100;
  // buat variabel bernama percentage berisi (variabel score dibagi jumlah pertanyaan) dikali 100

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
