#AREA

The objective of this project is to create a business application by implementing a software suite.
The authenticated user can create some AREA in order to execute a REAction when an Action is found.

##Configuration

```bash
docker-compose build
```
&
```bash
docker-compose up
```

##Routes Api
###Config address
PUT `/config/address`
#####response

Code:   
- 200 on success if the config address starts with `https://` and ends with `.ngrok.io`
- 400 on error

Content:
- on success : `success`
- on error : the error throws : `invalid address`

###User Register
POST `/auth/register`
#####response

Code:   
- 201 on success
- 400 on error

Content:
- on success : user's Token
- on error : the error throws

###User Login
POST `/auth/login`
#####response

Code:   
- 200 on success
- 400 on error

Content:
- on success : user's Token
- on error : the error throws

###Area action
GET `/area/actions`
#####response

Code: 200

Content: A Json of all **actions** with their **Service's name**, their **name** and all their **parameters**

###Area reaction
GET `/area/reactions`
#####response

Code: 200

Content: A Json of all **reactions** with their **Service's name**, their **name** and all their **parameters**

###Create an Area
POST `/area/new`
#####response

Code:   
- 201 on success
- 400 on error

Content:
- on success : `created`
- on error : the error throws

###Create an Area
POST `/area/new`
#####response

Code: 201

Content: The About.json with every services, actions and reactions

