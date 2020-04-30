const nodemailer = require('nodemailer');

const mail = receiver => {
  let sender = smtpUsername = 'maximevanderwegen@disroot.org';
  let tempReceiverName = receiver.name.split(',');

  let smtpPass = 'Legrosestmon@mi';

  let htmlMsg = '';

  // Plain text message
  let msg = [`Ceci est un message automatique vous informant que votre demande de prêt interbibliothèque pour le livre intitulé "${receiver.request}" est en cours de traitement. Vous recevrez une confirmation de notre part dès que le document sera disponible à la bibliothèque.`, 'Bonne journée,', 'Bien à vous,', `L'équipe du Grimoire d'Éole`];

  if (receiver.gender.match('f')) {
    msg.unshift(`Bonjour Madame ${tempReceiverName[0].trim()},`);
  } else {
    msg.unshift(`Bonjour Monsieur ${tempReceiverName[0].trim()},`);
  }

  // Convert the message to the HTML format
  for (const sentence of msg) {
    htmlMsg += `<p>${sentence}</p>`;
  }

  const sendMail = () => {
    // Create and send the mail
    let mail = nodemailer.createTransport({
      host: 'disroot.org',
      port: 587,
      secure: false,
      auth: {
        user: smtpUsername,
        pass: smtpPass
      }
    });

    let options = {
      from: `Max <${sender}>`,
      to: receiver.mail,
      subject: "PIB",
      text: msg.join('\n\n'),
      html: `<article>${htmlMsg}</article>`
    };

    mail.sendMail(options).catch(console.error);
    console.log(`Mail envoyé à l'adresse ${receiver.mail} le ${new Date()}`);
  }
  sendMail();
}

module.exports = mail;
