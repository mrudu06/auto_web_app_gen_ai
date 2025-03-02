import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const tempFilePath = path.join('/tmp', 'generated_code.html');
  if (!fs.existsSync(tempFilePath)) {
    return res.status(404).json({ error: 'No generated code available for preview' });
  }

  const htmlContent = fs.readFileSync(tempFilePath, 'utf-8');
  res.status(200).json({ code: htmlContent });
}