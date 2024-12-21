import { useEffect } from "react"

export const useTokenExpiration = () => {
    useEffect(() => {
        if (localStorage.getItem('exp') && localStorage.getItem('jwt_token')) {
            const checkExpiration = () => {
                const exp = parseInt(localStorage.getItem('exp'));

                const currentTime = Math.floor(Date.now() / 1000);
                
                const timeLeft = exp - currentTime;

                // thời gian hiển thị H-m-s
                const hours = Math.floor(timeLeft / 3600); 
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;

                const formattedTimeLeft = `${hours}:${minutes}:${seconds}`;
                const expirationTime = new Date(parseInt(exp) * 1000).toLocaleDateString();
                console.log('Checking expiration...');
                console.log('Expiration time:', expirationTime);
                console.log('Count time left: ', formattedTimeLeft);
    
                if (timeLeft <= 0) {
                    console.log('Token expired!');
                    localStorage.clear();
                    window.location.reload();
                }
            };
    
            checkExpiration();
    
            const interval = setInterval(checkExpiration, 2000);
            
            return () => {
                console.log('Cleaning up interval:', interval);
                clearInterval(interval);
            };
        }
    }, []);
}