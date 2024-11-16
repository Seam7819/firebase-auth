import app from "../../firebase/firebase.init";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";



const LogInForm = () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const [user, setUser] = useState({})

    const handleLogIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                setUser(null)
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>

            {
                user ?<button onClick={handleSignOut}>SignOut</button>  :
                <button onClick={handleLogIn}>Google</button>
            }


            {user && <div>
                <h1>user: {user.displayName}</h1>
                <h2>Email : {user.email}</h2>
                <img src={user.photoURL} alt="" />
            </div>
            }

        </div>
    );
};

export default LogInForm;