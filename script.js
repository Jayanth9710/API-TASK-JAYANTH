
function getusers(){
    fetch("https://60efffc0f587af00179d3c19.mockapi.io/users")
    .then((data)=>{
      console.log(data);
      return data.json();
    })
    .then( (users)=>loadUsers(users));
    }
    
    
    function loadUsers(users) { 
      const userList = document.createElement("div");
      userList.className = "user-list";
    const chatbox = document.createElement("div");
    
    const userContainer = document.createElement("div");
    const head = document.createElement("h4")
      head.innerText="Chats";
    head.className="heading-chat"
      chatbox.append(head);
    const search = document.createElement("div");
    const seainput = document.createElement("input");
    seainput.type="text";
    seainput.className="searchbar"
    seainput.placeholder="Search chats";
    chatbox.append(seainput);
     chatbox.append(userContainer);
    document.body.append(chatbox);
    users.forEach((user) => {
      const userContainer = document.createElement("div");
      userContainer.className = "user-container";
    
      userContainer.innerHTML = `
        <img class="user-image"  src=${user.avatar}> </img>
        <div>
          <h3 class="user-name">${user.name}</h3>
          <p class="user-time" >${new Date(user.createdAt).toDateString()}</p>
          <button type="button" class="btn btn-secondary btn-sm" onclick="deleteUsers(${user.id})">Delete User</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="updateusers(${user.id})">Update User Details</button>
        </div>
        `;
    
      userList.append(userContainer);
    });
    
    document.body.append(userList);
    }
    
    getusers();
    
    // Function to delete user//
    
    function deleteUsers(id){
        // const mydeleteddata={id:14}
      // console.log("deleting user....",id)
      fetch(`https://60efffc0f587af00179d3c19.mockapi.io/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        // body: JSON.stringify(mydeleteddata)
      })
      .then((data) => {
          console.log(data);
          return data.json();
        })
      
      .then((data) => refreshUsers());
      // deleteUsers(id);
    }
    
    // Function to add user//
    
    function addUsers(){
      // console.log("Adding User....");
      const name = document.querySelector(".name").value;
      const avatar= document.querySelector(".picurl").value;
      const createdAt= new Date();
      const userDetails={
        name: name,
        avatar: avatar,
        createdAt: createdAt
        };
      
      
      
      fetch("https://60efffc0f587af00179d3c19.mockapi.io/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
      })
        .then((data) => {
          console.log(data);
          return data.json();
        })
        .then((users) => refreshUsers());
    
      console.log("Adding User....", userDetails);
    }
    
    // Function to refresh as soon as changes are made.//
    function refreshUsers() {
      // userList
      document.querySelector(".user-list").remove();
      document.querySelector(".heading-chat").remove();
      document.querySelector(".searchbar").remove();
      getusers();
    }
    
    //Function to update user details//
    
    function updateusers(id) {
      let name = prompt("Enter name:");
      let avatar = prompt("Enter your DP URL:");
      
      
      let userDetails= { name,avatar };
      fetch(`https://60efffc0f587af00179d3c19.mockapi.io/users/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(userDetails)
      }) .then((data) => refreshUsers());
    }
    
    