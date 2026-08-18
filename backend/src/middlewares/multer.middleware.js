import multer from "multer";
import path from "path";
// Node's path module helps you work with file paths and filenames.
import fs from "fs";
// fs means File System. Node's fs module lets you interact with files and folders on your computer/server. You're using it to make sure the upload directory exists.

// Ensure upload directory exists
const uploadDir = "./public/temp";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 1. Configure Disk Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
    // cb means callback, this statement means destination is ready,
    // null=> iff error occurs return null
    // uploadDir => tell the destination where the file nedds to be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename: fieldname-timestamp-random.ext
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// 2. File Filter for Medical Scans (JPEG, PNG, WebP)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format. Only JPEG, PNG, and WebP medical images are allowed."), false);
  }
};

// 3. Export Multer instance with 15MB file size limit
export const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB max file size
  },
  fileFilter
});

/*
You need a **Multer middleware file** when your Express backend needs to handle **file uploads** — especially things like profile pictures, thumbnails, videos, documents, etc.

Since you're building a video platform, Multer becomes particularly relevant for your **Video Upload** phase.

### 1. The problem: Express doesn't handle files like normal JSON

For a normal request, you might send:

```text
Content-Type: application/json
```

with:

```json
{
  "username": "piyush",
  "email": "piyush@example.com"
}
```

Express can easily access that through:

```js
req.body
```

But when you upload a file, the request is usually:

```text
multipart/form-data
```

For example:

```text
username → Piyush
avatar   → profile.jpg
```

The actual image/video is binary file data.

**Multer's job is to parse that multipart/form-data request and make the uploaded files available to Express.**

---

### 2. What does Multer give you?

Suppose the frontend sends:

```text
video → my-video.mp4
thumbnail → thumbnail.jpg
title → My First Video
```

Multer processes the request and gives you access to things like:

```js
req.file
```

or:

```js
req.files
```

while regular form fields remain accessible through:

```js
req.body
```

Conceptually:

```text
              HTTP Request
                   │
                   ↓
             ┌──────────┐
             │  Multer  │
             └────┬─────┘
                  │
          ┌───────┴────────┐
          ↓                ↓
       req.body         req.file(s)
          │                │
       title            video.mp4
       username         thumbnail.jpg
```

---

### 3. Why create a separate `multer.js` file?

You could configure Multer directly inside your routes, but that quickly becomes messy.

For example:

```js
router.post(
    "/upload",
    upload.single("video"),
    uploadVideo
)
```

Here:

```js
upload.single("video")
```

is Multer middleware.

Instead of configuring `upload` everywhere, you create something like:

```text
src/
├── controllers/
├── routes/
├── middlewares/
│   ├── auth.middleware.js
│   ├── multer.middleware.js
│   └── error.middleware.js
└── models/
```

Then your Multer configuration lives in one place.

---

### 4. A basic Multer middleware

A common setup looks roughly like:

```js
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage
})
```

Now you can use it in your route:

```js
router.post(
    "/upload",
    upload.single("video"),
    uploadVideo
)
```

The flow becomes:

```text
Client
  │
  │ video.mp4
  ↓
Express
  │
  ↓
Multer
  │
  ├── receives file
  ├── processes multipart/form-data
  └── stores file temporarily
  │
  ↓
uploadVideo controller
```

---

### 5. Why is this useful for your video platform?

Your upload process will eventually look something like:

```text
User selects video
       ↓
Frontend sends multipart/form-data
       ↓
Multer receives the video
       ↓
Video temporarily stored
       ↓
Controller gets file information
       ↓
Upload video to cloud storage
       ↓
Save video URL + metadata in database
```

For example, your controller might access:

```js
req.file.path
```

and then upload that file to a service such as Cloudinary or another object-storage provider.

---

### 6. `upload.single()` vs `upload.fields()`

This is another important part you'll encounter.

If you're uploading **one file**:

```js
upload.single("avatar")
```

you get:

```js
req.file
```

If you're uploading multiple files:

```js
upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
])
```

you get:

```js
req.files
```

Something like:

```text
req.files
├── video
│   └── video.mp4
│
└── thumbnail
    └── thumbnail.jpg
```

For your video platform, this second approach can become useful because a video upload may involve both:

```text
video
thumbnail
```

---

### 7. One important distinction

Multer **doesn't upload your video to the cloud by itself**.

Think of the responsibilities like this:

```text
Multer
  ↓
Receive/process the uploaded file
  ↓
Make it available to your backend
```

Then:

```text
Cloudinary / S3 / other storage
  ↓
Actually store the file permanently
```

And:

```text
MongoDB
  ↓
Store metadata
```

For example:

```text
MongoDB
├── title: "My Video"
├── description: "..."
├── videoUrl: "https://..."
├── thumbnailUrl: "https://..."
└── owner: userId
```

So **Multer is the bridge between the incoming file upload and your backend's file-processing/storage logic.**

For your project, I'd think of the three pieces as:

**Multer → handles incoming files**
**Cloud storage → stores the actual video/image**
**MongoDB → stores information about the video/image**

 */