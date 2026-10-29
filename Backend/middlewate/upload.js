import multer from "multer";
import { storage } from "../config/cloudConfig.js";

const upload = multer({ storage });

export default upload;