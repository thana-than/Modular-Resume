export const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8081/api";

export const populate = async (structure) => {
    console.log("requesting");
    const response = await fetch(`${BACKEND_URL}/populate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(structure)
    });
    console.log("response received");
    const json = await response.json();
    console.log("json", json);
    return json;
}