import axios from "../helpers/axios";

function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
  }
  
  function isObj(val) {
    return typeof val === 'object'
  }
  
   function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val)
    } else {
      return val
    }
  }
  
  function buildForm({ action, params }) {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)
  
    Object.keys(params).forEach(key => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', stringifyValue(params[key]))
      form.appendChild(input)
    })
  
    return form
  }
  

  export const post = (details) => {
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
  }



 export const payUsingPaytm =(data) => {
   
        return fetch(`http://localhost:3000/paymentpaytm`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(response=>response.json()).catch(err=>console.log(err))
      
}