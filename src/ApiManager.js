class ApiManager {
    constructor() {
        this.url = "https://specter-backend-production.up.railway.app";
    }

    async getQuery(largeText) {
        try {
            const response = await fetch(`https://specter-backend-production.up.railway.app/getVun`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: largeText }) // ✅ Use 'query' instead of 'text'
            });


            const data = await response.json();
            console.log("Server Response:", data);
            return data;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async getEmail(largeText, query) {
        try {
            const response = await fetch(`${this.url}/getEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: largeText, query: query })
            });

            const data = await response.json();
            console.log("Server Response:", data);
            return data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

export default ApiManager;
