let url = `https://65111d14829fa0248e3f850c.mockapi.io/users`;

let itemList = document.getElementById("itemList");
// TABLES
function createTableRow(value1, value2, id) {
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  td1.setAttribute("id", `name${id}`);
  td1.innerHTML = value1;

  var td2 = document.createElement("td");
  td2.setAttribute("id", `email${id}`);
  td2.innerHTML = value2;

  var td3 = document.createElement("td");
  td3.innerHTML = `
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=#exampleModal${id} id='edit${id}' 
    onClick="getEditById('${value1}','${value2}','${id}')"
    >
    Edit
  </button>
    
  <button type="button" class="btn btn-danger" id='delete${id}'
  onClick='deleteUserData(${id})'
  >Delete</button>    
    `;

  tr.append(td1, td2, td3);
  itemList.append(tr);
}

//Read

async function getUsersData() {
  let data = await fetch(url);
  let res = await data.json();
  console.log(res);
  res.map((element) => {
    const { name, email, id } = element; //destructing
    console.log(name, email, id);
    createTableRow(name, email, id);
  });
}


async function getUserSpecificData(id){
    let data=await fetch(url+"/"+id)
    let res=await data.json()
    console.log(res)
    createTableRow(res.name,res.email,res.id)
    }

//create the user


async function createUsersData() {
  var nameInput = document.getElementById("nameInput");
  let nameValue = nameInput.value;

  var emailInput = document.getElementById("emailInput");
  let emailValue = emailInput.value;
  if (nameValue != "" && emailValue != "") {
    //not empty
    console.log(nameValue, emailValue);

    let newUser = {
      name: nameValue,
      email: emailValue,
    };

    let data = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newUser),
    });
    let res=await data.json();
    console.log(res)
    
    getUserSpecificData(res.id)
  } else {
    alert("Enter the details");
  }
}

//Delete:
async function deleteUserData(id){
    alert("Do you want to Delete?")
    console.log(id)
    let data=await fetch(url+"/"+id,{method:"DELETE"})
    let res=await data.json()
    console.log(res)
    itemList.innerHTML=""
    getUsersData()

}

getUsersData();

// EDIT 

const getEditById=(value1,value2,id)=>{

let modal=document.createElement('span')
modal.innerHTML=`
<div class="modal fade" id=exampleModal${id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
            <div class="form-group">
              <label for="alertName${id}" class="col-form-label">Name:</label>
             <input type="text" class="form-control" id="alertName${id}" value=${value1}>
            </div>

            <div class="form-group">
              <label for="alertEmail${id}" class="col-form-label">Email:</label>
             <input type="email" class="form-control" id="alertEmail${id}" value=${value2}>
            </div>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary"
      onClick='updateUserData(${id})'
      
      >Save changes</button>
    </div>
  </div>
</div>
</div>

`
document.body.append(modal)


}

async function updateUserData(id){
    var modalName=document.getElementById('alertName'+id).value
    var modalEmail=document.getElementById('alertEmail'+id).value

    let newUser = {
        name: modalName,
        email: modalEmail,
      };

      let data = await fetch(url+"/"+id, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      let res=await data.json();
      console.log(res)
      
    //   getUserSpecificData(res.id)
    document.getElementById('name'+id).innerText=res.name;
    document.getElementById('email'+id).innerText=res.email;

}
