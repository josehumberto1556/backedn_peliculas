export const Api=async()=>
{
    const resp=await fetch('http://localhost:4000')
    const data=resp.json()
    return data
}