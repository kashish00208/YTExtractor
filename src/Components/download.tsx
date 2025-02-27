import {useState} from 'react'

const download = () => {
  const [url,seturl] = useState("");
  const [message,SetMessage] = useState("");
  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    if(!url){
      SetMessage("PRovide a URL");
    }
    SetMessage("");
    try{
      const responce = await fetch('/api/download',{
        method:"POST",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({url})
      })
      const data = await responce.json()
      if(data.success){
        SetMessage(`Downloaded successfully : ${data.message}`)
      }else{
        SetMessage(`Error : ${data.message}`)
      }
    }catch(error){
      SetMessage("Error while downloading the video");
      console.log(`Error : ${error}`)
    }
  }
  return (
    <>
      <div>
        <form  onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter the youtube URL' value={url} onChange={(e)=>seturl(e.target.value)}/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default download
