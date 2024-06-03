function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

const button = document.getElementById("form_button");
const title = document.getElementById("title");
const desc = document.getElementById("description");
const url = document.getElementById("url");

function validate_save() {
    const err = document.getElementById("err");
    const regex_title = /^[a-zA-Z0-9_].{5,50}$/;
    const regex_desc = /^[a-zA-Z0-9_].{30,500}$/;
    let had_err = false;

    localStorage.setItem("title", title.value);
    localStorage.setItem("desc", desc.value);
    localStorage.setItem("url", url.value);

    function treat_err(myerr)
    {
        err.appendChild(myerr);
        err.style.visibility = 'visible';
        had_err = true;
        button.disabled = true;
    }

    if(!regex_title.test(title.value))
    {
        let myerr = document.createElement("p");
        myerr.innerText="The title is required to be between 5 and 50 alphanumeric characters in lenght, including dashes and underscores.";
        treat_err(myerr);
    }
    if(!regex_desc.test(desc.value))
    {
        let myerr = document.createElement("p");
        myerr.innerText="The description is required to be between 30 and 500 alphanumeric characters in lenght, including dashes and underscores.";
        treat_err(myerr)
    }
    if(!isValidUrl(url.value))
    {
        let myerr = document.createElement("p");
        myerr.innerText="A valid URL is required.";
        treat_err(myerr);
    }
    if(!had_err)
    {
        err.innerHTML = '';
        err.style.visibility = 'hidden';
        button.disabled = false;
    }
}

window.onload = function(){

    if(localStorage.getItem("title"))
    {
        title.value = localStorage.getItem("title");
    }
    if(localStorage.getItem("desc"))
    {
        desc.value = localStorage.getItem("desc");
    }
    if(localStorage.getItem("url"))
    {
        url.value = localStorage.getItem("url");
    }

    const articles = fetch('articles.json');
    articles.then(response =>
    {
        if (!response.ok)
        {
            throw Error('Failed to load articles.');
        }
        else return response.json();
    }).then(articles =>
    {
        const select = document.getElementById("category");
        for (const category of articles.categories)
        {
            let option = document.createElement("option");
            option.value = category.name;
            option.innerText = category.name;
            select.appendChild(option);
        }
    })
    button.addEventListener('mouseover', function(e){
        e.stopPropagation();
        validate_save();
    })
}