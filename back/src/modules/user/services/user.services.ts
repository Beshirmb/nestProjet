import { Injectable, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  send_insecription_email,
  send_invatation_email,
  send_forgetpassword,
  send_firstPasswordChange
} from '../../../template/index';
import * as multer from 'multer';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpasswordDto } from '../dtos/update-password.dto';
import { addorganisationDto } from '../../organization/dto/create-organisation.dto';
import { HashPassowrdProviderService } from './hashPasswordProvider.service';
import { MailerService } from '@nestjs-modules/mailer';
import { configuration } from '../../../config/configuration'


const inMemoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,

    private hashPasswordProviderService: HashPassowrdProviderService,
  ) { }

  upload = multer({
    storage: inMemoryStorage,
  }).single('file')

  public async create_first_user(data: addorganisationDto, organisation) {

    const password = "123456"
    const createadmin = new this.userModel({
      nameUser: data.name,
      isadmin: data.isadmin,
      email: data.email,
      organisation: organisation,
      password: await this.hashPasswordProviderService.hashPasswordAsync(
        password,
      ),
    });
    const userexist = await this.userModel.find({ email: data.email }).exec();
    if (userexist.length > 0) return { succes: false, message: 'email exist' }

    else {
      const adminuser = await createadmin.save();
      if (adminuser) {

        const sendmail = await this.sendMailtoUser(
          adminuser.email,
          organisation.name,
          adminuser._id,
          'Nouveau compte a été crée',
          'template',
          configuration.LINK_Font,
        );

        return {
          success: true, message: {
            fr:
              'compte a été crée avec succeé',
            ar: 'تم إنشاء الحساب بنجاح',
            en: 'account created with success'
          }
        };
      }
    }
  }
  public async create(data: CreateUserDto) {
    const createdUser = new this.userModel({
      name: data.name,
      email: data.email,
      organisation: data.organisation,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      password: await this.hashPasswordProviderService.hashPasswordAsync(
        data.password,
      ),
    });
    const userexist = await this.userModel.find({ email: data.email }).exec();

    if (userexist.length > 0) return {
      success: false, message: {
        fr: 'email existe',
        ar: 'البريد الإلكتروني موجود',
        an: 'email exist'
      }
    };
    else {
      const usersaved = await createdUser.save();
      const sendmail = await this.sendinvitation(
        configuration.LINK_Font,
        usersaved.email,
        usersaved.name,
        usersaved.lastName,
        'nouveau compte a été crée',
        usersaved.organisation,
        data.password,
      );
      return {
        success: true, message: {
          ar: 'تم تسجيل المستخدم بنجاح',
          fr: 'utilisateur créer',
          en: 'user create'
        }
      };
    }
  }
  public async forgetpass(email: string) {
    const userexist = await this.userModel.findOne({ email: email });
    let str2 = Math.floor(Math.random() * 10000);
    const charset = 'abcdefghijklmnopqrstuvwxyz';
    let str1 = '';
    for (let i = 0, n = charset.length; i < 4; ++i) {
      str1 += charset.charAt(Math.floor(Math.random() * n));
    }
    const password = str1.concat(str2.toString());
    const pass = await this.hashPasswordProviderService.hashPasswordAsync(password
    );
    if (userexist) {
      const userupdate = await this.userModel.findByIdAndUpdate(userexist._id, {
        password: pass,
      });
      const sendmail = await this.forgetpasswprd(
        configuration.LINK_Font,
        userexist.email,
        userexist.organisation,
        'oublier mot de passe',
        password,
      );
      return {
        success: true, message: {
          ar: 'تم إرسال البريد الإلكتروني تحقق من صندوق الوارد الخاص بك',
          fr: 'e-mail envoyé vérifier votre boîte de réception',
          en: 'email sent check your inbox'
        }
      };
    } else return {
      success: false, message: {
        ar: 'هذا البريد الإلكتروني غير موجود',
        fr: 'cet e-mail n`existe pas',
        en: 'this email  is not existe'
      }
    };
  }
  public async findAll() {
    const listuser = await this.userModel.find().exec();
    let newliste = []
    if (listuser.length > 0) {
      listuser.map(el => {
        const subobject = el.toObject();
        delete subobject.password
        newliste.push(subobject)
      })
      return newliste

    }
  }
  public async findByEmail(email: string): Promise<UserDocument> {
    const userAlreadyExists = await this.userModel.findOne({ email }).exec();

    return userAlreadyExists;
  }

  public async findById(_id: string) {
    const userExists = await this.userModel.findOne({ _id }).exec();

    return userExists ?? undefined;
  }
  public async findorganisation(_id: string) {
    const userExists = await this.userModel.findOne({ _id }).exec();
    if (userExists) {
      const suborganisation = userExists.organisation;
      const text = await this.returnorganisation(suborganisation)



      return text
    }

  }

  async uplodephoto(
    @Req() request: Request,
    @Res() res: Response
  ) {
    this.upload(request, res, async function (error) {
      if (error) {

        return res.json({
          success: false, message: {
            an: `Failed to upload image file: ${error}`,
            fr: `Impossible de télécharger le fichier image: ${error} `,
            ar: `فشل تحميل ملف الصورة ${error}`
          }
        });
      }
      else {

        return res.json(request.file)
      }
    })
  }
  async updateUser(id: string, updateUserDto: any) {
    const finduser = await this.userModel.findByIdAndUpdate(id, updateUserDto
    );
    if (finduser) return {
      success: true, message: {
        ar: 'تحديث المستخدم بنجاح',
        fr: 'mise a jour utilisateur avec success',
        en: 'user update success '
      }
    };
    else return {
      success: false, message: {
        ar: 'لم يتم العثور على المستخدم',
        fr: 'utilisateur non trouvé',
        en: 'user not found'
      }
    };
  }
  async updatepassworduser(id, pass: UpasswordDto) {
    const password = await this.hashPasswordProviderService.hashPasswordAsync(
      pass.password,
    );
    const userupdate = await this.userModel.findByIdAndUpdate(id, {
      password: password,
    });
    if (userupdate) {
      const email = await this.firstChangePassword(configuration.LINK_Font, userupdate.email, pass.password)
      if (email.response)
        return {
          success: true, message: {
            ar: 'نجح تحديث كلمة المرور',
            fr: 'mise à jour du mot de passe réussie',
            en: 'update password succeed'
          }
        }

    }
    else return {
      success: false, message: {
        ar: 'لم يتم العثور على المستخدم',
        fr: 'utilisateur non trouvé',
        en: 'user not found'
      }
    };
  }
  async deleteUser(id: any): Promise<UserDocument | object> {
    const finduser = await this.userModel.findByIdAndDelete(id);
    if (finduser) return {
      success: true, message: {
        ar: 'حذف المستخدم بنجاح',
        fr: 'delete  utilisateur avec success',
        en: 'delete user with success '
      }
    };
    else return {
      success: false, message: {
        ar: 'لم يتم العثور على المستخدم',
        fr: 'utilisateur non trouvé',
        en: 'user not found'
      }
    };
  }

  // send registe email
  public async sendMailtoUser(
    useremail: string,
    lname: string,
    id: any,
    subject: string,
    text: string,
    url: string
  ) {
    const result = await this.mailerService
      .sendMail({
        to: useremail, // List of receivers email address
        from: configuration.EMAIL_ID, // Senders email address
        subject: subject, // Subject line
        text: text, // plaintext body
        html: send_insecription_email(lname, id, url), // HTML body content
      })

    return result
  }

  // send invitation  email
  public async sendinvitation(
    url: string,
    useremail: string,
    lname: string,
    fname: string,
    subject: string,
    organisation: any,
    password: string,
  ) {
    const result = await this.mailerService
      .sendMail({
        to: useremail, // List of receivers email address
        from: configuration.EMAIL_ID, // Senders email address
        subject: subject, // Subject line
        text: 'Send invitation',
        html: send_invatation_email(url,
          lname,
          fname,
          organisation.nameSubOrganization,
          password,
        ),
      })
    return result

  }

  // send forget password

  public async forgetpasswprd(
    url: string,
    useremail,
    organisation: any,
    subject: string,
    password: string,
  ) {
    const result = await this.mailerService
      .sendMail({
        to: useremail, // List of receivers email address
        from: configuration.EMAIL_ID, // Senders email address
        subject: subject, // Subject line
        text: 'Forget password',
        html: send_forgetpassword(url, organisation.nameSubOrganization, password),
      })
    return result

  }

  //send first change password 
  public async firstChangePassword(
    url: string,
    useremail,
    password: string,
  ): Promise<any> {
    const result = await this.mailerService
      .sendMail({
        to: useremail, // List of receivers email address
        from: configuration.EMAIL_ID, // Senders email address
        subject: "Mot de passe Compte", // Subject line
        text: 'change password',
        html: send_firstPasswordChange(url, password),

      })
    return result
  }

  public returnorganisation(suborganisation) {
    return suborganisation.idorganisation
  }
}
