import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);

        // reset error
        setRegisterError('');
        // reset success
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should contain at least one uppercase character');
            return;
        }
        else if (!accepted){
            setRegisterError('Please accept our Terms & Conditions!');
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Created Successfully!')

                // update profile:
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then( () => console.log('Profile Updated'))
                .catch(error =>{
                    console.log(error);
                })


                // send verification email:
                sendEmailVerification(result.user)
                .then( () =>{
                    alert('A verification mail has been sent to your email. Please verify...');
                })
                

            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })
    }

    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-6">Please Register</h2>
                <form onSubmit={handleRegister} >
                    <input className="border mb-4 w-full py-2 px-4" type="text" placeholder="Your Name" name="name" required />
                    <br />
                    <input className="border mb-4 w-full py-2 px-4" type="email" placeholder="Email address" name="email" required />
                    <br />
                    <div className="relative  mb-2 border">
                        <input className="border w-full py-2 px-4 "
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            name="password"
                            required />
                        <span className="absolute top-3 right-3" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> :
                                    <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <br />
                    <div className="">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept our <a href="">Terms & Conditions</a></label>
                    </div>
                    <br />
                    <input className="btn btn-secondary mb-4 w-full" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-700">{registerError}</p>
                }
                {
                    success && <p className="text-green-600">{success}</p>
                }
                <p>Have an account? <Link className="text-blue-600 hover:underline" to='/login'>Log in</Link> here</p>
            </div>
        </div>
    );
};

export default Register;