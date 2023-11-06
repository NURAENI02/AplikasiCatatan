/*Deklarasi dan Inisialisasi*/
const addBtn = document.getElementById('add'); 
const notes = JSON.parse(localStorage.getItem('notes'));

/*Memuat Catatan Sebelumnya:*/ 
if (notes) {
    notes.forEach(note => addNewNote(note.text, note.timestamp));
}

/* tombol "Tambah", kemudian addNewNoteakan dipanggil */
addBtn.addEventListener('click', () => addNewNote());


/* fungsi ketika tambah catatan */
function addNewNote(text = '', timestamp = '') { /* membuat catatan baru yang akan ditambah dengan tgl & waktu */
    const note = document.createElement('div');
    note.classList.add('note');

    const currentDate = timestamp ? new Date(timestamp) : new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    /*berfungsi menampilkan fitur di setiap catatan baru */
    note.innerHTML = `
    <div class="tools"> 
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    
    <div class="timestamp">${formattedDate}</div>
    
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}">${text}</textarea>
    `;

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    /*untuk mengatur nilai awal dari elemen textarea & main */
    textArea.value = text;
    main.innerHTML = marked(text); /** MARKEDuntuk mengubah teks ( text) menjadi HTML  */

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    /*Menangkap masukan yang diberkan */
    textArea.addEventListener('input', (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);
        updateLS();
    });

    document.body.appendChild(note);
}

/*Fungsi ini mengambil semua yang ada di textarea. */
function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = []; /*Membuat array notes */
    
    notesText.forEach(note => {
        const timestamp = new Date().toISOString(); // Timestamp saat ini
        notes.push({ text: note.value, timestamp });
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}
