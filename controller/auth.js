
const fetch = require('node-fetch-commonjs');
const client_id = '96dd4551a23a484e9879d0846b9e0e0b';
const redirect_uri = 'http://localhost:3000/';
const client_secret = "15bc25cc9fa740a2933c939d5b2015b9"



const code = (req,res) => {
  
  const scope = "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state"
  
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`);


}
const login = async(req,res) => {

  const form = {
    grant_type: 'authorization_code',
    client_id,
    client_secret,
    code: req.body.code,
    redirect_uri,
    }

  let formBody = [];

  for (let property in form) {
  const encodedKey = encodeURIComponent(property);
  const encodedValue = encodeURIComponent(form[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");


const payload =`${client_id}:${client_secret}`;
const encodedPayload = Buffer.from(payload).toString("base64");

  try {
      const response = await fetch(`https://accounts.spotify.com/api/token`,{
        method:"POST",
        headers:{
          "Authorization":`Basic ${encodedPayload}`,
        "Content-Type":"application/x-www-form-urlencoded",
        },
        body:formBody,
      });

      const data = await response.json();

 

      return res.status(200).send({
        accessToken:data.access_token,
        refreshToken:data.refresh_token,
        expires_in:data.expires_in
      })

      
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message:"erorr en el servidor"})
    }



}



module.exports ={
    login,
    code
}