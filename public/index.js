document.addEventListener("DOMContentLoaded", main)
console.log('all ok');

function main(){

    fetch("/userSubmit").then(response=>response.json()).then(result => {
        console.log(result);

        result.foreach(element => {
            const nameElement = document.createElement("p");
            const emailElement = document.createElement("p");
            const commentElement = document.createElement("h6");

            nameElement.innerText = "Namn: " + element.name;
            emailElement.innerText = "Email: " + element.name;
            commentElement.innerHTML = "Comment: " + element.name;

            contentComments.append(nameElement, emailElement, commentElement, document.createElement("hr"));
        });
    }
    )};

    function oNsubmit(event){
        console.log(event.target);

        const userName = document.getElementById("userName");
        const userEmail = document.getElementById("userEmail");
        const userComment = document.getElementById("userComment");

        let messages = []

        if (userName.value === '' || inputName.value == null){
            alert("Name must be entered")
        } 
        if (userEmail.value === '' || inputName.value == null){
            alert("Email was entered incorrectly")
        } else if (!userEmail.value.match(/^\S+@\S+/))
        if (userComment.value === '' || inputName.value == null){
            alert("Comment must be entered") 
        }

        if (alert.length == 0){
            const data = new FormData(event.target);
            fetch("/commentSubmited", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(Object.fromEntries(data))}).then(response => response.json()).then(element => {

                // Skapar inlägget direkt temporärt utan att uppdatera sidan.
    
                let contentComments = document.getElementById("commentsHtml");  
    
                const nameElement = document.createElement("p");
                const emailElement = document.createElement("p");
                const commentElement = document.createElement("p");
                const counterElement = document.createElement("span");
            
                
                nameElement.innerText = "Namn: " + element.name;
                emailElement.innerText = "Email: " + element.email;
                commentElement.innerHTML = "Kommentar: " + element.comment; 
                counterElement.innerText = "Likes: " + element.likes + " ";
    
                contentComments.append(nameElement, emailElement, commentElement, counterElement, likeButtonElement, dislikeButtonElement, document.createElement("hr"));
            })  // Går till /commentSubmited, med metoden "post". Och då skickar den med json data.
    
        }
    
        errorMessage.innerText = messages.join(", \n");
    
        event.preventDefault();
    };
