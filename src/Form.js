import React, { useReducer } from "react";

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
};

const reducer = (state, action) => {
    switch (action.type) {
        case "set_name":
            return { ...state, name: action.payload };
        case "set_email":
            return { ...state, email: action.payload };
        case "set_password":
            return { ...state, password: action.payload };
        case "set_confirm_password":
            return { ...state, confirmPassword: action.payload };
        case "set_errors":
            return { ...state, errors: action.payload };
        default:
            return state;
    }
};

const SignupForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, email, password, confirmPassword, errors } = state;

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validation logic
        let errors = {};
        if (!name) {
            errors.name = "Please enter your name";
        }
        if (!email) {
            errors.email = "Please enter your email";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Please enter a valid email";
        }
        if (!password) {
            errors.password = "Please enter a password";
        } else if (password.length < 6) {
            errors.password = "Password should be at least 6 characters long";
        }
        if (!confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        dispatch({ type: "set_errors", payload: errors });

        // If there are no errors, submit the form
        if (Object.keys(errors).length === 0) {
            console.log("Submitting form...");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <h1>Registeration Form</h1>
            <div className="form-group">
                <input
                    className="input"
                    type="text"
                    id="name"
                    value={name}
                    placeholder="Enter your Name"
                    onChange={(e) => dispatch({ type: "set_name", payload: e.target.value })}
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
                <input
                    className="input"
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Enter your Email"
                    onChange={(e) => dispatch({ type: "set_email", payload: e.target.value })}
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <input
                    className="input"
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Enter your Password"
                    onChange={(e) => dispatch({ type: "set_password", payload: e.target.value })}
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-group">
                <input
                    className="input"
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => dispatch({ type: "set_confirm_password", payload: e.target.value })}
                />
                {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                )}
            </div>
            <button type="submit" className="submit-button">Sign Up</button>

        </form>
    )
}

export default SignupForm