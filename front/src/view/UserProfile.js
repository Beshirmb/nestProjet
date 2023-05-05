import React,{useState,useEffect} from 'react'
import {BiPencil} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'
import {FiMinus} from 'react-icons/fi'
import { BsArrowLeft } from "react-icons/bs";
import {getuserconnected , updateprofil,updatepassword,addimagefile} from '../api/profilapi'
import { useTranslation } from 'react-i18next'
import {decodetoken } from '../utile/index'
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

export default function UserProfile() {

      
  const { t, i18n } = useTranslation()
  const schema = yup.object().shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber:yup.number().min(8).required()
  }); 
  const [statelangage, setstatelangage] = useState('')
    const [drower,setdrower] = useState(false)
    const [dwaerprofile,setdrowerprofile] = useState(false)
    const [password , setPassword] = useState('')

    const [confirmepassword , setConfirmePassword] = useState('')
    const [errorpassword,seterrorpassword] = useState({'password':'', 'confirmepass':''})
   const [showpass, setShowpass] = useState(false)
   const  [userinfo , setUserinfo] = useState({})
   const [file, setfile] = useState("") 
   const [filetosend, setfiletosend] = useState("")
   const [showconfimrpass, setConfirmepass] = useState(false)
  const handleFileChange = ({target: {files}}) =>  {
    setfiletosend(files)
    setfile(URL.createObjectURL(files[0]))
  }

  const { register, handleSubmit,reset , formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
  defaultValues: { _id: "", phoneNumber: "" ,name:"", lastName:"" },
  });
  useEffect(() => {
    const token = decodetoken()
    setstatelangage(i18n.language)
    if(token)
  getuserconnected(token._id)
  .then(res =>{setUserinfo(res.data) ;
    reset(res.data) }
  
   )
  .catch(err => console.log(err))
}, [reset , i18n.language])

  const updateuserinfo = (data) => {
      if(file){
     
      const datas = new FormData()
        datas.append('file', filetosend[0])
      addimagefile(datas)
     .then (res => {Object.assign(data,{image: res.data.key})
   updateprofil(data)
      })
    }
      else
      updateprofil(data)
      .then(res => {toast.success(t('UserProfile.resultaSuccessChangeProfil'))})
      .catch(err => {toast.error(t('UserProfile.Resultaerreur'))})
  }

  const updatepasswords = async (e) => {
    const token =await decodetoken()
    e.preventDefault();
    seterrorpassword({password:'', confirmepass:''})
    if(password==="" && confirmepassword==="" ){
    seterrorpassword({password:t('UserProfile.erreurpassword'), confirmepass:t('UserProfile.erreurconfirmepassword')})
    }
    else if(password !==confirmepassword ){
  
    seterrorpassword({confirmepass:t('UserProfile.erreurpasswordNotMache')})
    }
    else if ((password ===confirmepassword) && token ){
     let  monid =token._id
     updatepassword({password : password , id:monid } )
     .then(res=> {if(res.data.success)
      toast.success(t('UserProfile.resultaSuccessChangePass'))
    })
    }

    }

    const closedrower = () => {
        setdrower(false)
    }
    const deletefile = () => {
      setfile('') ;
      setfiletosend('')
    }
    const resetformprofil = ()=> {
      setdrowerprofile(false)
      reset()
   
    }
    const resetpasswordform =() =>{
      setdrower(false)
      seterrorpassword({'password':'', 'confirmepass':''})
      setConfirmePassword('')
      setPassword('')
    }
    return (
        <>
            <div className={statelangage==="ar" ?"m-auto profillayout col-md-6 pt-4 " : "pt-4 profillayout col-md-6 offset-md-3"}>
                <div className="mb-3" dir="ltr"> <Link className="btn btncolor mr-3" to="/dashbord"><BsArrowLeft className="icon-arrow"/></Link><span className="boldtitel title-organisation">{t('UserProfile.titelProfil')}</span></div>
             <div className="profilcard ">
                <div className="row pt-3 padding-3">
                    <div className="col-md-12 col-lg-11 row ">
                        <img src={userinfo.image?`${process.env.REACT_APP_imagelocation }/${userinfo.image}` : "/faces/face.jpg"} width="100px" height="100px"  className="rounded-circle  col-sm-4 col-md-4 "  alt="avatar"/>
                        <div className="p-2 col-md-8"> 
                            <h4 className="boldtitel">{userinfo?.name || 'Nom'}{" "} {userinfo?.lastName || "et Prenom"} </h4>
                            <p className="labelProfil"> {userinfo?.email || "contact@exemple.com"}</p>
                            <p className="labelProfil">{userinfo?.phoneNumber ||"xx xxx xxx"}</p>

                        </div>
                    </div>
                    <button className="btn col-md-4 col-lg-1  mb-3 w-25" onClick={()=>setdrowerprofile(true)}><BiPencil  className="text-primary icon-edit "/></button>
                </div>
                <hr></hr>
                <div className="row mt-2 padding-3">
                <div className="col-md-12 col-lg-6 ">
                    <label className="labelProfil">{t('UserProfile.Sexe')}</label>
                    <p className="border-0 formcontrolelprofil">{userinfo?.sexe || t('UserProfile.champsvide')}</p>
                </div>
                    <div className="col-md-12 col-lg-6">
                        <label className="labelProfil">{t('UserProfile.labelDatenaissance')}</label>
                        <p  className="border-0 formcontrolelprofil">{userinfo?.datenaissance || t('UserProfile.champsvide')}</p>
                    </div>

                </div>
                <div className="row padding-3 ">
                <div className="col-md-12 col-lg-6">
                    <label className="labelProfil">{t('UserProfile.labelEmail')} </label>
                    <p  className="border-0 formcontrolelprofil">{userinfo?.email}</p>
                </div>
                    <div className="col-md-12 col-lg-6">
                        <label className="labelProfil">{t('UserProfile.labelAdressefacture')}</label>
                        <p  className="border-0 formcontrolelprofil">{userinfo?.adresse}</p>
                    </div>
                </div>
                <hr></hr>
                <p type="button" className="padding-3  mt-2 changerpass" onClick={() =>setdrower(true)}>
                <u>{t('UserProfile.changermotdepasse')}</u>
		</p>
                
            </div>
            </div>
 
	
            {dwaerprofile && <>
       <div className="drwerstyle" onClick={() =>setdrowerprofile(false) }></div>
	<div className={dwaerprofile?"right fade drawer show" : "right drawer fade"} dir="ltr">
		<div className={statelangage==="ar" ?"ardrawer-dialog":"drawer-dialog"} role="document">
			<div className="modal-content">

				<div>
	            <div className="w100 mt-2">
               
					<h5 className="modal-title text-center" >{t('UserProfile.ModifierProfilTitre')}</h5>
                    <form>
                        {file.length > 0 ?
          <div  style={{margin: "10px 140px"}}>
            
              <img
                alt="Preview"
               src={file}
               width="132px"
               height="132px"
              
               className=" rounded-circle"
                
              />
            <FiMinus style={{color:'red',cursor:'pointer'}} onClick={deletefile} />
          </div>:

                    <label className="labelfile myLabel" for="namefile"><AiOutlinePlus/>
                    <input name="namefile" id="namefile"  type="file" hidden onChange={handleFileChange} />
                   </label>
                     }
                     </form>
                    </div>
          
                  
				</div>

				<form className="drawer-body" onSubmit={handleSubmit(updateuserinfo)}   >
                
                    <div className="form-group">
                <label className="boldtitelmodl">{t('UserProfile.labelNom')} </label> 
                <input type="text" className={`form-controlmodal  ${errors.name ? "is-invalid" : "is-valide"}`}  name="name"  {...register("name")} ></input> 
                <p className="invalid-feedback-drawer">{errors.name && t("UserProfile.formNameRequired")}</p>
                </div>
                <div className="form-group">
                    <label className="boldtitelmodl"  >{t('UserProfile.labelPrenom')} </label>
                    <input type="text"   name="lastName"  className={`form-controlmodal ${errors.lastName ? "is-invalid" : "is-valide"}`} {...register("lastName")} ></input>
                    <p className="invalid-feedback-drawer">{errors.lastName && t("UserProfile.formLastNameRequired")}</p>
                </div> 
                <div className="form-group">
                    <label className="boldtitelmodl" >{t('UserProfile.labelEmail')} </label> 
                    <input type="text"  email="email" defaultValue={userinfo.email} readOnly="readonly" className="form-controlmodal is-valide"></input>
                
                    </div>
                    <div className="form-group">
                    <label className="boldtitelmodl">{t('UserProfile.labelNumtelf')}</label> 
                    <input type="text"   name="phoneNumber" className={`form-controlmodal ${errors.lastName ? "is-invalid" : "is-valide"}`}    {...register("phoneNumber")}></input>
                    <p className="invalid-feedback-drawer">{errors.phoneNumber && t("UserProfile.formPhoneNumberRequired")}</p>
                    </div>
                    <div className="form-group">
                    <label className="boldtitelmodl">{t('UserProfile.labelrole')} </label>
                    <input type="text" name="role" readOnly="readonly" className="form-controlmodal is-valide"></input>
                    </div>
                    <div className=" d-flex justify-content-around">
                    <button type="reset" onClick={resetformprofil} className="btn  custom-btn-cancel">{t('UserProfile.Btnannuller')}</button>
                    <button type="submit" className="btn btn-primary custom-btn-save">{t('UserProfile.BtnEnregistrer')}</button>
                    </div>
				</form>

			</div>
		</div>{/*drower-dialog */}
	</div>{/*end drower */}
        </>   
         }
    {drower &&
    <>
    <div className="drwerstyle" onClick={closedrower}></div>
    <div className={drower?"right fade drawer  show" : "right drawer fade"}>
		<div className={statelangage==="ar" ?"ardrawer-dialog" : "drawer-dialog"} role="document">
			<div className="modal-content">


	            <div className="w100 mt-2 mb-4 pt-1">
					<h5 className="modal-title text-center" >{t('UserProfile.changermotdepasse')}</h5>
                    
                    </div>
          
                  
	

				<form className="drawer-body" onSubmit={updatepasswords} >
                
                    <div className="form-group">
                <label className="boldtitelmodl">{t('UserProfile.Modifierchangerpassword')}</label>
                <div className="input-group borderchangepass">
                <input type={showpass?"text":"password"}
                 className={`form-controlchangepass ${errorpassword.password ? "is-invalid" : "is-valide"}`} onChange={(event) =>setPassword(event.target.value)}></input> 
               <span className="btn"  onClick={()=>setShowpass(!showpass) }>{showpass ?<i className="fa fa-eye-slash fontsizeicon" aria-hidden="true"></i>

                 : <i className="fa fa-eye fontsizeicon" aria-hidden="true"></i> }
                 </span>
                </div> 
                <p className="invalid-feedback-drawer">{errorpassword.password} </p>
                </div>
                <div className="form-group">
                    <label className="boldtitelmodl">{t('UserProfile.Modifierconfirmepassword')} </label>
                    <div className="input-group borderchangepass">
                    <input type={showconfimrpass?"text" : "password"} name="confime"  onChange={(event) =>setConfirmePassword(event.target.value)} className={`form-controlchangepass ${errorpassword.confirmepass ? "is-invalid" : "is-valide"}`}></input>
                   <span className="btn" onClick={()=>setConfirmepass(!showconfimrpass) }>{showconfimrpass? <i className="fa fa-eye-slash fontsizeicon" aria-hidden="true"></i>
                     :  <i className="fa fa-eye fontsizeicon" aria-hidden="true"></i> }
                     </span> 
                   </div>
                   <p className="invalid-feedback-drawer">{errorpassword.confirmepass} </p>
                </div> 
              
                 
                   
                    <div className=" d-flex justify-content-around">
                    <button type="reset"  onClick={resetpasswordform} className="btn btn-light custom-btn-cancel">{t('UserProfile.Btnannuller')}</button>
                    <button   className="btn btn-primary custom-btn-save">{t('UserProfile.BtnEnregistrer')} </button>
                    </div>
				</form>

			</div>
		</div>
	</div>
    </>
        }
        </>
        
        
    )
}
