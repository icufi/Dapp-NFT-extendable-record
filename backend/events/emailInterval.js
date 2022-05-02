const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const Email = require('../models/email');
const Record = require('../models/record');
const emailTemplate = require('../assets/email/emailTemplate').default;

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// emailInterval sends a user generated email from db at timed interval if both a prtoken and mrrtoken have been minted.
exports.emailInterval = async () => {
  setInterval(async () => {
    console.log('email interval fired');

    // get emails in db by pending status true
    let emails;
    try {
      emails = await Email.find({ emailPending: true });
    } catch (err) {
      throw new Error('Could not get pending emails from db.', err);
    }

    console.log('email array:', emails);
    console.log('number of pending emails:', emails.length);

    // if no pending true emails, return
    if (!emails || emails.length === 0) {
      console.log('No pending emails in db.');
      return;
    }

    // loop through pending emails. send if valid.
    // eslint-disable-next-line no-restricted-syntax
    for (const email of emails) {
      // slow down loop because deals with several network calls
      sleep(2000);

      // if email pending longer than 24 hours, set pending to false, timeout to true
      const currentTime = Date.now();
      if (email.createTime - currentTime > 86400000) {
        try {
          email.emailPending = false;
          email.timeOut = true;
          await email.save();
          continue;
        } catch (err) {
          console.log('Email timed out.');
          continue;
        }
      }

      // call record from db by email dna
      let dbRecord;
      if (!email.mrrTokenId) {
        try {
          dbRecord = await Record.find({ dna: email.dna });
        } catch (err) {
          console.log('Failed to retrieve matching record from email dna.');
          continue;
        }
      }

      // if record by email dna does not return a single record, continue
      if (!dbRecord || dbRecord.length !== 1) {
        console.log(
          'Record is not unique by email dna or dna does not exist in records db.'
        );
        continue;
      }

      // extract first array object, there should be only one
      dbRecord = [dbRecord];

      // if no prTokenId then record was never fully minted, continue
      if (!dbRecord.prTokenId) {
        console.log('prTokenId is not in db.');
        continue;
      }

      // if not mrrTokenId then record was not full minted, continue
      if (!dbRecord.mrrTokenId) {
        console.log('mrrTokenId has not been minted.');
        continue;
      }

      // if prTokenId does not match mrrTokenId then mint of record was corrupt
      if (dbRecord.mrrTokenId !== dbRecord.prTokenId) {
        console.log('Tokens do not match at record database.');
        continue;
      }

      // if checks passed, go to send email

      // email transporter object

      const options = {
        auth: {
          api_key: process.env.EMAIL_API,
        },
      };

      const mailer = nodemailer.createTransport(sgTransport(options));

      const { image, nftTokenType, nftTokenId, message, replyAddress } = email;

      // send mail
      try {
        mailer.sendMail(
          {
            from: `${email.emailFrom}@publicrecord.cc`,
            to: email.emailTo,
            subject: email.subject,
            html: emailTemplate(
              image,
              nftTokenType,
              nftTokenId,
              message,
              replyAddress
            ),
          },
          async (err, res) => {
            if (err) {
              console.log('Email send failed.', err);
              return;
            }
            console.log(res);
            try {
              // update email status and mrrTokenId, save to db
              email.emailPending = false;
              email.emailCompleteTime = Date.now();
              email.mrrTokenId = dbRecord.mrrTokenId;
              await email.save();
            } catch (error) {
              console.log(
                'Failed to update email complete and pending status to db.',
                error
              );
            }
          }
        );
      } catch (err) {
        console.log('Resolving pending email failed at transporter.', err);
        continue;
      }
    }
  }, 600000);
};
