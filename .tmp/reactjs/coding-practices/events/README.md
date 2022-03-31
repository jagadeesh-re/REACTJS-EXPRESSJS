In this project, let's build an **Events** app by applying the concepts we have learned till now.

### Refer to the image below:

<br/>
<div style="text-align: center;">
    <img src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1647865975/financepeer/Screenshot_1708_cldjwp.png" alt="events output" style="max-width:70%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12)">
</div>
<br/>

### Design Files

<details>
<summary>Click to view</summary>

- [Large (Size >= 727px) and Extra Large (Size >= 1200px) -Login (https://res.cloudinary.com/dmpepn8dm/image/upload/v1647866144/financepeer/Screenshot_1709_e1jpwl.png)
- [small (Size <=726px) and Extra Large (Size >= 1200px) -Login (https://res.cloudinary.com/dmpepn8dm/image/upload/v1647865975/financepeer/Screenshot_1708_cldjwp.png)

- [Large (Size >=727px) and Extra Large (Size >= 1200px) -Home (https://res.cloudinary.com/dmpepn8dm/image/upload/v1647865500/financepeer/Screenshot_1708_wrotd7.png)
- [small (Size <= 726px) and Extra Large (Size >= 1200px) -Home (https://res.cloudinary.com/dmpepn8dm/image/upload/v1647866401/financepeer/Screenshot_1710_olgcxk.png)

- [Large (Size >=727px) and Extra Large (Size >= 1200px) -Records (https://res.cloudinary.com/dmpepn8dm/image/upload/v1647866712/financepeer/Screenshot_1713_akibrc.png)
- [small (Size <= 726px) and Extra Large (Size >= 1200px) Records (https://res.cloudinary.com/dmpepn8dm/image/upload/v1647866815/financepeer/Screenshot_1715_exiuu8.png)

</details>

### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`
</details>

### API

<details>
<summary>Login Api</summary>
 - Method : POST
 
 <summary>Login Credentials</summary>
 - username : jagadeesh
 - password : jagadeesh@2022

<br/>

- Request API https://financepeer-demo-records.herokuapp.com/login/**
- Response for Valid Credentials is=> {jwtToken:"token"}
- Invalid Credentials Response is => {error_msg:"Invalid Message"}

<summary>Insert Records API</summary>
 - Method : POST

<br/>

- Request API https://financepeer-demo-records.herokuapp.com/book/**
- Response for Valid Data is=> { bookId: last inserted record number }

<summary>Get Data Records</summary>
 - Method : GET

<br/>

- Request API https://financepeer-demo-records.herokuapp.com/getBooks/**
- Response for Valid Data is=> {tweetsResult:[{userId:1,id:1,title:"Hello",body:"this is jhgdjshfgjvcjhdcv"}]}

</details>

### Resources

<details>
<summary>Image URLs</summary>

- [https://res.cloudinary.com/dmpepn8dm/image/upload/v1644135051/miniproject-jagadeesh/Asset_1_1_dithja.png)
- [https://res.cloudinary.com/dmpepn8dm/image/upload/v1647702713/miniproject-jagadeesh/Financepeer_new_logo_nnvmxt.png)

</details>

<details>
<summary>Colors</summary>

<br/>

<div style="background-color: #ffc3be; width: 150px; padding: 10px; color: white">Hex: #ffc3be</div>
<div style="background-color: #c1dbbe; width: 150px; padding: 10px; color: white">Hex: #c1dbbe</div>
<div style="background-color: #b99d9b; width: 150px; padding: 10px; color: white">Hex: #b99d9b</div>
<div style="background-color: #c3e0ff; width: 150px; padding: 10px; color: black">Hex: #c3e0ff</div>
<div style="background-color: #a8947d; width: 150px; padding: 10px; color: white">Hex: #a8947d</div>
<div style="background-color: #ffffff; width: 150px; padding: 10px; color: black">Hex: #ffffff</div>
<div style="background-color: #f7fbff; width: 150px; padding: 10px; color: black">Hex: #f7fbff</div>
<div style="background-color: #a56041; width: 150px; padding: 10px; color: white">Hex: #a56041</div>
<br/>
</details>

<details>
<summary>Font-families</summary>

- Roboto

</details>

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - Don't change the component folder names as those are the files being imported into the tests.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a look at the Cheat Sheets.
