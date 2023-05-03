
export const isLogin = () => {
  let token = localStorage.getItem("jwt")
  if(token){
    let dateNow = new Date();
    const jwtData = token.split('.')[1]
    const decodedJwtJsonData = window.atob(jwtData)
    const stringdate =  dateNow.getTime().toString()
  
    if(JSON.parse(decodedJwtJsonData).exp > stringdate.slice(0,stringdate.length-3)){
      return true 
    }
    else 
    return false
  }
   
    else return false;
  };
export  const decodetoken = () => {
  let token = localStorage.getItem("jwt")
  if (token) {
  const jwtData = token.split('.')[1]
  const decodedJwtJsonData = window.atob(jwtData)
  let dateNow = new Date();
  const stringdate =  dateNow.getTime().toString()
  if(JSON.parse(decodedJwtJsonData).exp < stringdate.slice(0,stringdate.length-3))
  return {isExpired: true};
  else
return JSON.parse(decodedJwtJsonData)
  }
  else return undefined
}

const A4_PAPER_DIMENSIONS = {
  width: 210,
  height: 297,
};

const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;

export const imageDimensionsOnA4 = (dimensions) => {
  const isLandscapeImage = dimensions.width >= dimensions.height;

  if (isLandscapeImage) {
    return {
      width: A4_PAPER_DIMENSIONS.width,
      height:
        A4_PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
    };
  }

  const imageRatio = dimensions.width / dimensions.height;
  if (imageRatio > A4_PAPER_RATIO) {
    const imageScaleFactor =
      (A4_PAPER_RATIO * dimensions.height) / dimensions.width;

    const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;

    return {
      height: scaledImageHeight,
      width: scaledImageHeight * imageRatio,
    };
  }

  return {
    width: A4_PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
    height: A4_PAPER_DIMENSIONS.height,
  };
};

export const fileToImageURL = (file) => {
    let image = file.mimeType.split("/")[1]


    image.src = URL.createObjectURL(file);
  };


