import react from "react";
import { LoginButton } from "@telegram-auth/react";

export const AuthPage = () => {
    return (
        <div className="flex items-center justify-center">
             <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="payTestUnder_bot" data-size="large" data-userpic="false" data-auth-url="/" data-request-access="write"></script>
             <LoginButton
                botUsername={'payTestUnder_bot'}
                onAuthCallback={(data) => {
                    console.log(data);
                    // call your backend here to validate the data and sign in the user
                }}
            />
        </div>
    )
}