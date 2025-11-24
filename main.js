// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyBMSsNz6Dgss5vr8vlPbDdKgwOIn3dMBik",
  authDomain: "insancemerlang2025.firebaseapp.com",
  projectId: "insancemerlang2025",
  storageBucket: "insancemerlang2025.firebasestorage.app",
  messagingSenderId: "900746896855",
  appId: "1:900746896855:web:20cfd37822398ef034d792"
}


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const siswaCollection = collection(db,"siswa")

// fungsi untuk menampilkan daftar siswa
export async function tampilkanDaftar() {
  // ambil snapshot data dari koleksi siswa
  const snapshot= await getDocs(siswaCollection)
  
  // ambil elemen tabel data
  const tabel =document.getElementById('tabelData')
  
  // kosongkan isi tabel nya 
  tabel.innerHTML = ""
  
  // loop setiap dokumen dalam snapshot 
  snapshot.forEach((doc) =>{
    // variabel untuk menyimpan data
    const data = doc.data()
    const id = doc.id
    
    // buat elemen baris baru
    const baris= document.createElement("tr")
    
    // buat elemen kolom untuk NIS
    const kolomNIS = document.createElement("td")
    kolomNIS.textContent =data.nis
    
    // buat elemen untuk kolom nama 
    const kolomNama = document.createElement("td")
    kolomNama.textContent = data.nama
    
    // buat elemen kolom untuk kelas
    const kolomKelas = document.createElement('td')
    kolomKelas.textContent= data.kelas
    
    // buat elemen kolom untuk aksi 
    const kolomAksi = document.createElement('td')
    
    // tombol edit
    const tombolEdit = document.createElement('button')
    tombolEdit.textContent= 'Edit'
    tombolEdit.href = 'edit.html?id='+ id
    tombolEdit.className ='button edit'
    
    // tombol hapus
    const tombolHapus = document.createElement('button')
    tombolHapus.textContent = 'Hapus'
    tombolHapus.className = 'button delete'
    tombolHapus.onclick = async () => {
      await hapusSiswa(id)
    }
    
    // tambahkan elemen ke dalam kolom aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)
    
    // tambahkan kolom ke dalam baris 
    baris.appendChild(kolomNIS)
    baris.appendChild(kolomNama)
    baris.appendChild(kolomKelas)
    baris.appendChild(kolomAksi)
    
    // tambahkan baris ke aalam tabel
    tabel.appendChild(baris)
    
  })
}
// fungsi untuk menambahkan data siswa
export async function tambahDataSiswa() {
  const nis = document.getElementById('nis').value;
  const nama = document.getElementById('nama').value;
  const kelas = document.getElementById('kelas').value;

  await addDoc(siswaCollection, {
    nis: nis,
    nama: nama,
    kelas: kelas
  });

  window.location.href = "daftar.html";
}

// fungsi untuk menghapus data siswa
export async function hapusSiswa(id) {
  // menghapus dokumen siswa berdasarkan id
  await deleteDoc(doc(db,'siswa',id))
  
  // refresh daftar siswa
  await tampilkanDaftar()
}