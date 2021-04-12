console.log('client side js is loaded.')



const weatherform =document.querySelector('form')
const search = document.querySelector('input')




weatherform.addEventListener('submit',(e)=>
{
    e.preventDefault()

    const location    = search.value
    const url ='http://localhost:3000/weather?address='

    const completeURL = url + location

     fetch( completeURL ).then( (response) =>
     {
         response.json().then((data)=>
         {
             if (data.error)
             {
                 console.log(data.error)
             }
             else {
                 console.log(data.location)
                 console.log(data.forecast)
             }
       
         })
     } )

   
})


const index_para_location = document.querySelector('#index_para_location')
const index_para_forecast = document.querySelector('#index_para_forecast')

 





weatherform.addEventListener('submit',(e)=>
{
    e.preventDefault()

    index_para_location.textContent= 'Loading'
    index_para_forecast.textContent=''

    const location    = search.value
    const url ='http://localhost:3000/weather?address='


    

    const completeURL = url + location

     fetch( completeURL ).then( (response) =>
     {
         response.json().then((data)=>
         {
             if (data.error)
             {
                index_para_location.textContent = data.error
                index_para_forecast.textContent = ''
                
                 console.log(data.error)
             }
             else {
                index_para_location.textContent= data.location
                index_para_forecast.textContent= data.forecast
                 console.log(data.location)
                 console.log(data.forecast)
             }
       
         })
     } )

   
})

