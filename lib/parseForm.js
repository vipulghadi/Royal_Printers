// lib/parseForm.js
import formidable from "formidable";

export const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false }); // single file
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};