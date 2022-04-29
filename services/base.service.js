import fs from 'fs';

const pagination = (total, limit) => {
  return Math.ceil(total / limit);
};

const deleteFile = (filename, fileId) => {
  //   if (fileId) driveHelper.deleteFile(fileId);
  if (filename && filename != 'avata-default.png') {
    fs.unlink(`./public/images/${filename}`, (err) => {
      if (err) console.log(err);
      console.log(`successfully deleted ${filename}`);
    });
  }
};

const listStringImage = (files) => {
  return files.map((file) => file.filename);
};

export { pagination, deleteFile, listStringImage };
