import multer from "multer";
import path from "path"; // Impor modul path

// Konfigurasi penyimpanan file
const storage = multer.memoryStorage(); // Simpan file di memori

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		// Hanya menerima file gambar
		const filetypes = /jpeg|jpg|png|gif/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase() // Memeriksa ekstensi file
		);

		if (mimetype && extname) {
			return cb(null, true);
		}
		cb(new Error("File type not allowed"));
	},
});

export default upload;
