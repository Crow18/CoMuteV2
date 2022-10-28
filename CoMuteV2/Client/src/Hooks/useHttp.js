import { useState } from "react"; 

export default function useHttp()
{
    const [loading, setLoading] = useState(false);

   const doRequest = async (EndPoint, RequestType, RequestBody, Token) => {
    const Auth = Token? Token : null;
    const Body = RequestBody? RequestBody : null;
    const result = {data: {}, error: {}};

        try{
            setLoading(true)
            const response = await fetch(process.env.REACT_APP_API_URL_BASE+EndPoint, {
                method: RequestType,
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json',
                    'Authorization': 'bearer '+ Auth
                },
                body: Body
                
            });

            let res = await response.json();           
        
            if(!response.ok){
                return {...result, error: res};
            }
            return {...result, data: res}

        }catch(err){
            return {...result, error: err};
        }finally{
            setLoading(false)
        }
   }
   return [doRequest, loading];
}