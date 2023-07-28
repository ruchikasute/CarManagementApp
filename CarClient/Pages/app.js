//SELECT QUERY
function displayCars(){
    let tablecon = document.getElementById("tableid");
    tablecon.style.display = "table";
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const carsData = JSON.parse(this.responseText);
            createTable(carsData);
        }else{
            console.log("No Such resourse avail"+ this.status);
        }
        
    }
    request.open("GET","http://localhost:8084/api/cars",true);
    request.send();
    }
    function createTable(carsData) {
        const tableBody = document.getElementById("carList");
        
        // Clear existing rows in the table
        while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
        }
        
        carsData.forEach(function(car) {
        const row = tableBody.insertRow();
        Object.values(car).forEach(function(value) {
        const cell = row.insertCell();
        cell.textContent = value;
        });
        });
    }

 //INSERT QUERY
 function createCar() {
    const id = document.getElementById('carid').value;
    const model = document.getElementById('model').value;
    const color = document.getElementById('color').value;
    const price = document.getElementById('price').value;

    if (id === "") {
        // Display an error message when the id is blank
        document.getElementById('message').innerHTML = 'Please enter a Car ID.';;
        document.getElementById('message').style.color = 'red';
        setTimeout(function(){
            // Remove error after 3s
            document.getElementById('message').innerHTML = '';
       }, 3000);
        return; // Exit the function if there's an error
    }
    else if (!isNaN(parseInt(color))) {
        // console.log("Color value must be a non-numeric value.");
        document.getElementById("message").innerHTML = "Error: Color value must be a non-numeric value.";
        document.getElementById("message").style.color = "red";
        return; // Stop the function from proceeding further
        setTimeout(function(){
            //Remove error after 3s
            document.getElementById('message').innerHTML = '';
       }, 3000);
    }
    const newCar = {
        "id": id,
        "model": model,
        "color": color,
        "price": price
    };
        fetch('http://localhost:8084/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        })
        
        .then(response => response.json())
                .then(data => {
                    console.log('New car created:', data);
                    // Refresh the table to display the updated car list
                    // Show success message
                   document.getElementById('donemessage').innerHTML = 'Car inserted successfully!';
                   document.getElementById('donemessage').style.color = 'green';
                   setTimeout(function(){
                    // Remove error after 3s
                    document.getElementById('donemessage').innerHTML = '';
               }, 3000);
    
                    // Clear input fields after successful insertion
                    document.getElementById('carid').value = '';
                    document.getElementById('model').value = '';
                    document.getElementById('color').value = '';
                    document.getElementById('price').value = '';
                    // displayCars();
                })
                .catch(error => console.error('Error creating car:', error));
                
            }
   
    function deleteCar(){
        var id = document.getElementById("idcar").value;
        let request =  new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(this.readyState == 4 && this.status ==200){
                console.log("Car deleted");
                document.getElementById("messagedelete").innerHTML = "Car deleted successfully!";
                document.getElementById("messagedelete").style.color="green";
                setTimeout(function(){
                    // Display an error message when the id is blank
                    document.getElementById('messagedelete').innerHTML = '';
               }, 3000);
                // displayCars();
            }
            else{
                console.log("Error Deleting car");
            }
        };

        request.open("DELETE","http://localhost:8084/api/cars/"  + id,true);
        request.send();
    }

function displayForm(){
    var updateid = document.getElementById("updateid").value;
    if (updateid === ""){
        document.getElementById('messageupdate').innerHTML = 'Please enter a Car ID.';
        document.getElementById('messageupdate').style.color = 'red'; 
        setTimeout(function(){
            // Remove error after 3s
            document.getElementById('messageupdate').innerHTML = '';
       }, 3000);
    }
    else{
        $('#updateForm').toggle(500);
    }
  
}
    function updateCar(){
        let updateid = document.getElementById("updateid").value;
        const model = document.getElementById('updatemodel').value;
        const color = document.getElementById('updatecolor').value;
        const price = document.getElementById('updateprice').value;


        if (!isNaN(parseInt(color))) {
            // console.log("Color value must be a non-numeric value.");
            document.getElementById("colormessage").innerHTML = "Error: Color value must be a non-numeric value.";
            document.getElementById("colormessage").style.color = "red";
            return; // Stop the function from proceeding further
            setTimeout(function(){
                // Remove error after 3s
                document.getElementById('messageupdate').innerHTML = '';
           }, 3000);
        }

        const updateCarData = {
            "id": updateid,
            "model": model,
            "color": color,
            "price": price
        };
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log("car updated");
                document.getElementById("messageupdate").innerHTML="Car gets updated!";
                document.getElementById("messageupdate").style.color = "Green";
                setTimeout(function(){
                    // Remove error after 3s
                    document.getElementById('messageupdate').innerHTML = '';
               }, 3000);
            }
            else{
                console.log("Error Updating Car");
            }
        }
        request.open("PUT","http://localhost:8084/api/cars/"  + updateid,true);
        request.setRequestHeader('Content-Type','application/json');
        request.send(JSON.stringify(updateCarData));

    }