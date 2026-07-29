// Basic API client for SewDigital backend
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1";

async function fetcher(endpoint: string, options: RequestInit = {}) {
    let token = null;
    let orgId = null;
    
    if (typeof window !== "undefined") {
        token = localStorage.getItem("accessToken");
        const activeWorkspaceStr = localStorage.getItem("activeWorkspace");
        if (activeWorkspaceStr && activeWorkspaceStr !== "undefined") {
            try {
                const activeWorkspace = JSON.parse(activeWorkspaceStr);
                orgId = activeWorkspace._id || activeWorkspace.id;
            } catch (e) {}
        }
    }

    const headers = {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420", // Skip ngrok browser warning
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(orgId ? { "x-organization-id": orgId } : {}),
        ...options.headers,
    };

    console.log(`[API] Fetching ${endpoint}`, { method: options.method || 'GET', hasToken: !!token, orgId });

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        console.log(`[API] Response ${response.status} from ${endpoint}`);

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: "An error occurred" }));
            
            // Redirect to login if token is expired or unauthorized
            if (response.status === 401 || (error.message && error.message.toLowerCase().includes("token"))) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("user");
                    localStorage.removeItem("organization");
                    window.location.href = "/login";
                }
            }
            
            throw new Error(error.message || "Failed to fetch data");
        }

        return response.json();
    } catch (err) {
        console.error(`[API] Error fetching ${endpoint}:`, err);
        throw err;
    }
}

export const api = {
    get: (endpoint: string) => fetcher(endpoint, { method: "GET" }),
    post: (endpoint: string, body: unknown) => fetcher(endpoint, { method: "POST", body: JSON.stringify(body) }),
    put: (endpoint: string, body: unknown) => fetcher(endpoint, { method: "PUT", body: JSON.stringify(body) }),
    patch: (endpoint: string, body: unknown) => fetcher(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
    delete: (endpoint: string) => fetcher(endpoint, { method: "DELETE" }),
    /** Upload FormData (e.g. image files). Omits Content-Type so browser sets multipart boundary. */
    upload: (endpoint: string, formData: FormData) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        return fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: formData,
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: "Upload failed" }));
                
                if (response.status === 401 || (error.message && error.message.toLowerCase().includes("token"))) {
                    if (typeof window !== "undefined") {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("user");
                        localStorage.removeItem("organization");
                        window.location.href = "/login";
                    }
                }
                
                throw new Error(error.message || "Upload failed");
            }
            return response.json();
        });
    },
};
