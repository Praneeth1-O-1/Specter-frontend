class ApiManager{
    ApiManager(){
        this.url="http://localhost:5000"
    }

    async getQuery(largeText) {
        try {
            const response = await fetch(`specter-backend-production.up.railway.app/getVun`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: largeText }) // Send large text
            });
    
            const data = await response.json(); // Assuming the server returns JSON
            console.log("Server Response:", data);
            return data;
        } catch (error) {
            console.error("Error:", error);
            // return null;
        }
    }


    
    async getEmail(largeText,query) {
        try {
            const response = await fetch(`specter-backend-production.up.railway.app/getEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: largeText ,query:query}) // Send large text
            });
    
            const data = await response.json(); // Assuming the server returns JSON
            console.log("Server Response:", data);
            return data;
        } catch (error) {
            console.error("Error:", error);
            // return null;
        }
    }





}


export default ApiManager;