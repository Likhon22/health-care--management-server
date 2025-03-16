import fs from "fs";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import config from "../config";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), "uploads");
    console.log(file);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    console.log(process.cwd());

    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const sendImageToCloudinary = async (file: {
  path: string;
  originalname: string;
}) => {
  cloudinary.config({
    cloud_name: "dcfmfuihb",
    api_key: "796993972171377",
    api_secret: "pRSXKHnv3Jy_-13gN4lYiNWGmg0",
  });

  const uniquePublicId = `${file.originalname}-${Date.now()}`;

  try {
    // Step 1: Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: uniquePublicId,
    });

    // Step 2: Delete the local file after successful upload
    fs.unlinkSync(file.path);
    console.log("Temporary file deleted successfully");

    return {
      uploadResult,
    };
  } catch (error) {
    console.error("Error during image upload or processing:", error);
    throw new Error("Image upload or transformation failed");
  }
};

const upload = multer({ storage: storage });

export { upload, sendImageToCloudinary };
