window.onload = function(){
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    }

    function validate() {
        const err = document.getElementById("err");
        let title = document.getElementById("title").value;
        const regex_title = /^[a-zA-Z0-9_].{5,50}$/;
        console.log("a");
        let desc = document.getElementById("description").value;
        const regex_desc = /^[a-zA-Z0-9_].{30,500}$/;
        console.log("a");
        let url = document.getElementById("url").value;
        console.log("a");
        let had_err = false;

        if(!regex_title.test(title))
        {
            let myerr = document.createElement("p");
            myerr.innerText="The title is required to be between 5 and 50 alphanumeric characters in lenght, including dashes and underscores.";
            err.appendChild(myerr);
            err.style.visibility = 'visible';
            had_err = true;
        }
        if(!regex_desc.test(desc))
        {
            let myerr = document.createElement("p");
            myerr.innerText="The description is required to be between 30 and 500 alphanumeric characters in lenght, including dashes and underscores.";
            err.appendChild(myerr);
            err.style.visibility = 'visible';
            had_err = true;
        }
        if(!isValidUrl(url))
        {
            let myerr = document.createElement("p");
            myerr.innerText="A valid URL is required.";
            err.appendChild(myerr);
            err.style.visibility = 'visible';
            had_err = true;
        }
        if(!had_err)
        {
            err.innerHTML = '';
            err.style.visibility = "hidden";
        }
    }
    document.getElementById("form_button").addEventListener('mouseover', function(e){
        e.stopPropagation();
        validate();
    })

   /* // pt event
    var textbox = document.getElementById('textboxId');
    var style = window.getComputedStyle(textbox);
    if (style.getPropertyValue('outline') === 'none') {
        console.log('The textbox is not focused');
    } else {
        console.log('The textbox is focused');
    }
*/

}