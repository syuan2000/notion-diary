import React,{useState} from 'react';

export default function Practice(){
    const defaultForm ={
        name:"",
        password:"",
        email:""
    }

    const credential=[{
        name:"eva", password:"syuan", email:"evali@gmail.com"
    },
    {
        name:"joy", password:"wiga", email:"joyli@gmail.com"
    }
    ]
    const [form, setForm] = useState(defaultForm);
    const [user, setUser] = useState();
    const [error, setError] = useState(false)

    const changeHandler = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
        
    }
    const submit = (e) =>{
        e.preventDefault();
        if (form && credential.some(c => c.name === form.name && c.password === form.password && c.email === form.email)){
            setUser(form);
            setError(false);
        }else{
            setError(true);
        }
    }
    const logout = (e) =>{
        e.preventDefault();
        setUser(null);
        setForm(defaultForm);
    }

    return(
        <div>
            {!user && 
                <form>
                    <div>
                        <label> Username: 
                            <input type="text" name="name" onChange={changeHandler} />
                        </label>
                    </div>
                    <div>
                        <label> Password: 
                            <input type="text" name="password" onChange={changeHandler} />
                        </label>
                    </div>
                    <div>
                        <label> Email: 
                            <input type="text" name="email" onChange={changeHandler} />
                        </label>
                    </div>
                    {error && <p>Credential is invalid. Please submit again. </p>}
                    <button type="submit" onClick={submit}>Submit</button>
                </form>
            }
            
            {user && 
            <div>
                <h2>Welcome to this page, {user.name}</h2>
                <button type="submit" onClick={logout}>Logout</button>
            </div>
        }

        </div>
    )
}