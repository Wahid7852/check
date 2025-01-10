import React from 'react';
import styles from './Register.module.css';

// function randomText(){
//     let text = "अआइईउऊएऐओऔअंअःऋॠकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहक्षत्रज्ञ";    
//     const letter = text[Math.floor(Math.random() * text.length)];
//     return letter;
//   }

//   //hacking animation
//   function rain(){
//     let e = document.createElement('div');
//     let left = Math.floor(Math.random() * 100);
//     let size = Math.random() * 1.8;
//     let duration = Math.random() * 2;
    
//       e.classList.add('text');
//       e.innerText = randomText();
//       document.body.appendChild(e);
    
//     e.style.left = left + '%';
//     e.style.fontSize = 0.3 + size + 'em';
//     e.style.animationDuration = 1 + duration  + 'px';
   
//       //remove
//     setTimeout(function(){
//       document.body.removeChild(e)
//     },4050)
//   }  
//   setInterval(function(){
//     rain()
//   },20);
  
const Register = () => {
    return (
        <div>
            <div className={styles.container}>
                <form className={styles.formContainer}>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div>
                        <label htmlFor="age" className={styles.specialLabel}>Age: </label>
                        <input type="number" id="age" name="age" className={styles.specialInput} />
                    </div>
                    <div>
                        <label htmlFor="gender">Gender: </label>
                        <div className={styles.gender}>
                            <input type="radio" id="male" name="gender" />
                            <span className={styles.male}>Male</span>
                            <input type="radio" id="female" name="gender" />
                            <span>Female</span>
                        </div>
                    </div>
                    <button className={styles.registerButton}>Register</button>     
                </form>
            </div>
            <div className={styles.secret}>
                <input type='text' className={styles.secretInput} />
            </div>
        </div>
    )
}

export default Register;

