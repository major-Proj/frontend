import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

function ForgetPasswordOTPPage() {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const encodedEmail = searchParams.get('email');
        const decodedEmail = decodeURIComponent(encodedEmail);
        setEmail(decodedEmail);
      }, [location.search]);
      
    const handleOTPChange = (event) => {
        setOTP(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, otp: otp, new_password: password }), // Send email in the request body
            });

            const res = await response.json();

            if (res.message !== 'User password changed successfully') {
                alert('Failed to change password');
            }

            else {
                alert('password changed succufully')
                navigate('/login');
            }

        } catch (error) {
            console.error('Error:', error.message);
            // Handle error, show error message to the user, etc.
        }
    navigate('/login');
};

return (
    <div>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="otp">Enter OTP:</label>
                <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={handleOTPChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Enter new password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <button type="submit">Reset Password</button>
        </form>
    </div>
);
}
export default ForgetPasswordOTPPage;
