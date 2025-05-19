const path = require('path');
const multer = require('multer');

const diretorio = path.join(__dirname, '..', '..', 'public', 'assets', 'imgPostagem');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, diretorio);
  },
  filename: (req, file, cb) => {
    const extensaoArquivo = file.originalname.split('.').pop();
    const novoNomeArquivo = require('crypto').randomBytes(64).toString('hex');
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  }
});

module.exports = multer({ storage });
