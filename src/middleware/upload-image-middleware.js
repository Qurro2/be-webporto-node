import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Menggunakan path relatif jika file middleware berada di direktori yang sama dengan 'public/images'
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    // Gunakan format tanggal untuk menghindari nama file yang sama
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const fileUploadMiddleware = upload.fields([
  { name: "nama" },
  { name: "logo", maxCount: 1 },
  {
    name: "photo",
    maxCount: 1,
  },
  { name: "role" },
  { name: "ulasan" },
  { name: "divisi" },
  { name: "tentang" },
  { name: "cv", maxCount: 1 },
]);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // Fungsi middleware untuk menangani pengunggahan file
// const createFileUploadMiddleware = () => {
//   const fields = [{ name: "nama" }, { name: "logo", maxCount: 1 }];

//   const uploadMiddleware = upload.fields(fields);

//   return (req, res, next) => {
//     // Menangani upload file hanya jika request memiliki bidang file yang sesuai
//     // dengan daftar bidang yang diinginkan di dalam array 'fields'
//     if (fields.some((field) => req.files && req.files[field.name])) {
//       uploadMiddleware(req, res, (error) => {
//         if (error) {
//           return res.status(400).json({ errors: "Error uploading files." });
//         }
//         next();
//       });
//     } else {
//       next();
//     }
//   };
// };
export default fileUploadMiddleware;
