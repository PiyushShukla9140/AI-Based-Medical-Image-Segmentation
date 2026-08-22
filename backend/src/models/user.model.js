import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    // field declaration here
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true

    },
    fullName:{
        type:String,
        required:[true,"FullName is required"],
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ["doctor", "radiologist", "student", "admin"],
        default: "doctor"
    },
    specialization:{
        type:String,
        default:"radiology"
    },
    profileImage:{
        type:String,
    },
    refreshToken:{
        type:String
    }
},{timestamps:{createdAt:true , updatedAt:true}})

// if you want to write some functions associated with this schema you can write here
userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10);
})// earlier i was using arrow funciton syntax here and it was gvivng error because arrow function 
/*In JavaScript, arrow functions do not bind their own this. In Mongoose pre-save middleware, this refers to the document being saved. Because an arrow function was used, this is undefined, causing this.isModified to crash. */


// Compare password method
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// access token is not stored in database

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)

// explanation of these methods

/*
1) Frist method: it is used to store the password in hash form in the database, we cannot store the password as it is in database

2) Second Method: this method is used to check aur authenticate the password

What is jwt and what are these tokens?

JWT stands for JSON Web Token. It is a way for your backend to identify and authenticate a user after they log in.

Since you're building a backend with Express, MongoDB, authentication, etc., JWT will be an important concept.

1. The problem JWT solves

Imagine a user logs into your application:

Email: piyush@gmail.com
Password: ********

Your backend verifies the credentials.

Now the user wants to do something that requires authentication:

Upload video
Change profile
Delete video
View private data

The backend needs to know:

"Is this request coming from a logged-in user?"

The user shouldn't have to send their password with every request.

That's where JWT comes in.

2. What is a JWT token?

A JWT is basically a signed piece of information that the server gives to the user after successful authentication.

For example, after login:

User
 │
 │ email + password
 ↓
Backend
 │
 │ credentials valid
 ↓
JWT generated
 │
 ↓
User receives token

The token might look something like:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

It looks like random text, but it contains structured information.

3. What is inside a JWT?

A JWT has three parts:

HEADER.PAYLOAD.SIGNATURE

For example:

xxxxx.yyyyy.zzzzz
Part 1 — Header

The header contains information about the token.

Something like:

{
  "alg": "HS256",
  "typ": "JWT"
}

Meaning roughly:

alg → algorithm used for signing
typ → token type
Part 2 — Payload

The payload contains information, called claims.

For example:

{
  "_id": "12345",
  "username": "piyush",
  "email": "piyush@gmail.com"
}

This allows your backend to know:

"This token belongs to user 12345."

You might also have:

{
  "_id": "12345",
  "role": "user",
  "iat": 1755520000,
  "exp": 1755606400
}

where:

iat = issued at
exp = expiration time
Part 3 — Signature

This is the security-critical part.

The server uses a secret key to sign the token.

Conceptually:

Header + Payload
       ↓
   Secret Key
       ↓
   Signature

If someone modifies the payload:

{
  "_id": "12345",
  "role": "admin"
}

the signature won't match anymore.

The backend can therefore detect:

"This token has been tampered with."

4. The complete login flow

Suppose you have:

Piyush

logging into your application.

Step 1 — Login request

Frontend sends:

POST /login


email
password
Step 2 — Backend verifies

Your backend checks MongoDB:

Does this user exist?
       ↓
Is the password correct?

If yes:

Authentication successful
Step 3 — Backend creates JWT

The backend generates:

JWT

containing something like:

{
    "_id": "user123",
    "username": "piyush"
}
Step 4 — Token goes to the client

The client stores the token, commonly in an HTTP-only cookie for browser apps.

Now the user is authenticated.




Frontend
   ↓
Request + JWT
   ↓
Auth Middleware
   ↓
Verify JWT
   ↓
User identified
   ↓
Controller

 */

