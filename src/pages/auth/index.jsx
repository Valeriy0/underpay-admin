import react from "react";
import { LoginButton } from "@telegram-auth/react";

export const AuthPage = () => {
    return (
        <div className="flex items-center justify-center">
             <LoginButton
                botUsername={'Underpaylogin_bot'}
                onAuthCallback={(data) => {
                    console.log(data);
                    // call your backend here to validate the data and sign in the user
                }}
            />
        </div>
    )
}