import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import for redirection
import './register.css';
import facebookLogo from '../../pages/login/facebook-logo.png';
import googleLogo from '../../pages/login/google-logo.png';
import twitterLogo from '../../pages/login/twitter-logo.png';

const Register = () => {
    const navigate = useNavigate(); // ✅ Hook for navigation

    const [gender, setGender] = useState('');
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
        dob: '',
        gender: ''
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle register button click
    const handleRegister = async (event) => {
        event.preventDefault(); // Prevents page refresh

        // Ensure all required fields are filled
        if (!formData.fullname || !formData.email || !formData.username || !formData.password || !formData.dob || !gender) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        // Ensure gender is included in form data
        const finalData = { ...formData, gender };

        try {
            const response = await fetch("http://localhost:3100/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData)
            });

            const data = await response.json();
            if (response.ok) {  
                alert("User registered successfully!");
                navigate('/login');  // ✅ Redirect to login page
            } else {
                alert(data.message || "Registration failed!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div>
            <div className="container_reg">
                <form className='form-container_reg' onSubmit={handleRegister}>
                    {/* Full Name Field */}
                    <div>
                        <label htmlFor="fullname">Full Name: </label>
                        <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} required />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    {/* Username Field */}
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>

                    {/* Age Field */}
                    <div>
                        <label htmlFor="dob" className='specialLabel'>Age: </label>
                        <input type="text" id="dob" name="dob" className='specialInput' value={formData.dob} onChange={handleChange} required />
                    </div>

                    {/* Gender Field */}
                    <div>
                        <label>Gender: </label>
                        <div className='gender'>
                            <button
                                type="button"
                                className={`gender-btn ${gender === "male" ? "active" : ""}`}
                                onClick={() => setGender("male")}
                            >
                                Male
                            </button>
                            <button
                                type="button"
                                className={`gender-btn ${gender === "female" ? "active" : ""}`}
                                onClick={() => setGender("female")}
                            >
                                Female
                            </button>
                        </div>
                    </div>

                    {/* Register Button */}
                    <button type="submit" className='registerButton'>Register</button>
                </form>

                {/* Social Media Login */}
                <div className="social-login">
                    <p>Or signup with</p>
                    <div className="social-buttons">
                        <button className="social-btn facebook">
                            <img src={facebookLogo} alt="Facebook Logo" className="social-logo" />
                        </button>
                        <button className="social-btn twitter">
                            <img src={twitterLogo} alt="Twitter Logo" className="social-logo" />
                        </button>
                        <button className="social-btn google">
                            <img src={googleLogo} alt="Google Logo" className="social-logo" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;



// import { useState } from 'react';
// import './register.css';
// import facebookLogo from '../../pages/login/facebook-logo.png';
// import googleLogo from '../../pages/login/google-logo.png';
// import twitterLogo from '../../pages/login/twitter-logo.png';

// const Register = () => {
//     const [gender, setGender] = useState('');
//     const [formData, setFormData] = useState({
//         fullname: '',
//         email: '',
//         username: '',
//         password: '',
//         dob: '',
//         gender: ''
//     });

//     // Handle input change
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle register button click
//     const handleRegister = async (event) => {
//         event.preventDefault(); // Prevents page refresh

//          // Ensure all required fields are filled
//     if (!formData.email || !formData.username || !formData.password || !formData.dob || !gender) {
//         alert("Please fill in all fields before submitting.");
//         return;
//     }

//         // Ensure gender is included in form data
//         const finalData = { ...formData, gender };

//         try {
//                 const response = await fetch("http://localhost:3100/api/users/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(finalData)
//             });

//             const data = await response.json();
//             if (data.success) {
//                 alert("User registered successfully!");
//             } else {
//                 alert(data.message || "Registration failed!");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Something went wrong!");
//         }
//     };

//     return (
//         <div>
//             <div className="container_reg">
//                 <form className='form-container_reg' onSubmit={handleRegister}>
//                     {/* Full Name Field */}
//                     <div>
//                         <label htmlFor="fullname">Full Name: </label>
//                          <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} required />
//                     </div>

            
//                     {/* Email Field */}
//                     <div>
//                         <label htmlFor="email">Email: </label>
//                         <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
//                     </div>

//                     {/* Username Field */}
//                     <div>
//                         <label htmlFor="username">Username: </label>
//                         <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
//                     </div>

//                     {/* Password Field */}
//                     <div>
//                         <label htmlFor="password">Password: </label>
//                         <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
//                     </div>

//                     {/* Age Field */}
//                     <div>
//                         <label htmlFor="age" className='specialLabel'>Age: </label>
//                         <input type="text" id="dob" name="dob" className='specialInput' value={formData.dob} onChange={handleChange} required />
//                     </div>

//                     {/* Gender Field */}
//                     <div>
//                         <label>Gender: </label>
//                         <div className='gender'>
//                             <button
//                                 type="button"
//                                 className={`gender-btn ${gender === "male" ? "active" : ""}`}
//                                 onClick={() => setGender("male")}
//                             >
//                                 Male
//                             </button>
//                             <button
//                                 type="button"
//                                 className={`gender-btn ${gender === "female" ? "active" : ""}`}
//                                 onClick={() => setGender("female")}
//                             >
//                                 Female
//                             </button>
//                         </div>
//                     </div>

//                     {/* Register Button */}
//                     <button type="submit" className='registerButton'>Register</button>
//                 </form>

//                 {/* Social Media Login */}
//                 <div className="social-login">
//                     <p>Or signup with</p>
//                     <div className="social-buttons">
//                         <button className="social-btn facebook">
//                             <img src={facebookLogo} alt="Facebook Logo" className="social-logo" />
//                         </button>
//                         <button className="social-btn twitter">
//                             <img src={twitterLogo} alt="Twitter Logo" className="social-logo" />
//                         </button>
//                         <button className="social-btn google">
//                             <img src={googleLogo} alt="Google Logo" className="social-logo" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Register;


