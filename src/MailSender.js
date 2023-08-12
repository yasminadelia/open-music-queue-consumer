const nodemailer = require('nodemailer');
 
class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Music Apps',
      to: targetEmail,
      subject: 'Ekspor Lagu Pada Playlist',
      text: 'Terlampir hasil dari ekspor lagu pada playlist',
      attachments: [
        {
          filename: 'playlist-songs.json',
          content,
        },
      ],
    };

    // sendMail mengembalikan promise yg membawa status pengiriman email
    return this._transporter.sendMail(message);
    
  }
}

module.exports = MailSender;