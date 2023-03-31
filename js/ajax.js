//funcion anonima autoejecutable / encapsular codigo

//XMLHttpRequest
(()=>{
//1. instancia
  const xhr = new XMLHttpRequest(),
  $xhr = document.getElementById("xhr"),
  $fragment = document.createDocumentFragment();

//2. asignacion de eventos
  xhr.addEventListener("readystatechange",(e)=>{
    
    if(xhr.readyState !==4){
        return;
    }

    if(xhr.status >= 200 && xhr.status < 300){

    //console.log(xhr);
        console.log("exito");
        console.log(xhr.responseText);
    // $xhr.innerHTML=xhr.responseText;
        let json = JSON.parse(xhr.responseText)
        console.log(json)
    
    json.forEach(el => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
    });

    $xhr.appendChild($fragment);

    }else{
        console.log("error");
        let message = xhr.statusText || "Ocurrio un error";
        $xhr.innerHTML = `Error: ${xhr.status}:${message}`;
    }
  });
//3. abrir la peticion y la url
  //consumo de api externo
  xhr.open("GET","https://jsonplaceholder.typicode.com/users");
  //local
  //xhr.open("GET","json/users.json");
//4. enviar  
  xhr.send()
})();

//fetch
(()=>{
    $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();
    //fetch("https://jsonplaceholder.typicode.com/users")
    fetch("json/users.json")

    .then((res)=>{
        console.log(res);
        return res.ok ?res.json() :Promise.reject(res);
    })
    .then((json)=>{
        console.log(json);
        //$fetch.innerHTML = json;
        json.forEach(el => {
            const $li = document.createElement("li");
            $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
            $fragment.appendChild($li);
        });
        $fetch.appendChild($fragment);
    })
    
    .catch((err)=>{
        console.log(err);
        let message = err.statusText || "Ocurrio un error";
        $fetch.innerHTML = `Error: ${err.status}:${message}`;
    })
    .finally(()=>{
        console.log("Esto se ejecutara independientemente de resultado de la promesa Fetch");
    });

})();

//fecth + Async-Await
(()=>{
    $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

    async function getData(){
        try {
            let rpta = await fetch("https://jsonplaceholder.typicode.com/users"),
            json = await rpta.json();
            console.log(rpta,json);

            // if(!rpta.ok){
            //     throw new Error("Ocurrio un error al solicitar los datos")
            // }
            if(!rpta.ok) throw{status:rpta.status,statusText:rpta.statusText}

            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });
            $fetchAsync.appendChild($fragment);
        } catch (err) {
            let message = err.statusText || "Ocurrio un error";
            $fetchAsync.innerHTML = `Error: ${err.status}:${message}`;
        }
        
        finally{
            console.log("esto se ejecutara independientemente de try...catch")
        }
    }
    getData();
    
 

})();

//Axios
(() => {
    const $axios = document.getElementById("axios"),
      $fragment = document.createDocumentFragment();
  
    axios
      //.get("assets/users.json")
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        //console.log(res);
        let json = res.data;
  
        json.forEach((el) => {
          const $li = document.createElement("li");
          $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
          $fragment.appendChild($li);
        });
  
        $axios.appendChild($fragment);
      })
      .catch((err) => {
        //console.log(err.response);
        let message = err.response.statusText || "Ocurrió un error";
        $axios.innerHTML = `Error ${err.response.status}: ${message}`;
      })
      .finally(() => {
        //console.log("Esto se ejecutará independientemente del resultado Axios");
      });
})();

//Axios + Async-Await
(()=>{
    const $axiosAsync = document.getElementById("axios-async"),
      $fragment = document.createDocumentFragment();
  
    async function getData() {
      try {
        //"https://jsonplaceholder.typicode.com/users"
        let res = await axios.get("json/users.json"),
          json = await res.data;
  
        //console.log(res, json);
  
        json.forEach((el) => {
          const $li = document.createElement("li");
          $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
          $fragment.appendChild($li);
        });
  
        $axiosAsync.appendChild($fragment);
      } catch (err) {
        //console.log(err.response);
        let message = err.response.statusText || "Ocurrió un error";
        $axiosAsync.innerHTML = `Error ${err.response.status}: ${message}`;
      } finally {
        //console.log("Esto se ejecutará independientemente del try... catch");
      }
    }
  
    getData();
})();