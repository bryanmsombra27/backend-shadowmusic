
const fetch = require('node-fetch-commonjs');

const code = (req,res) => {
  
  const scope = "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state"
  
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&response_type=code&scope=${scope}`);


}
const login = async(req,res) => {

  const form = {
    grant_type: 'authorization_code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret:process.env.SPOTIFY_CLIENT_SECRET,
    code: req.body.code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }

  let formBody = [];

  for (let property in form) {
  const encodedKey = encodeURIComponent(property);
  const encodedValue = encodeURIComponent(form[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");


const payload =`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
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