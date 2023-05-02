


 import * as dotenv from 'dotenv';
 dotenv.config();
export const configuration = {
  port: parseInt(process.env.PORT, 10) || 5000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017
  }, 
  awsAccesskeyID:  process.env.awsAccesskeyID,
  awsSecretAccessKey:process.env.awsSecretAccessKey, 
  awsRegion: process.env.awsRegion,
  EMAIL_PASS:process.env.EMAIL_PASS,
  EMAIL_ID:process.env.EMAIL_ID,
  LINK_Font: process.env.TEST_LINK 
}
