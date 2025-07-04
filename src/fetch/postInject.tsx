const API_URL = import.meta.env.VITE_API_URL || "https://recruiting.data.bemmbo.com";
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export async function postInject(ids: string[], retries = 5): Promise<boolean> {

  if (!API_URL || !AUTH_TOKEN) {
    throw new Error("API URL or Auth Token is not defined");
  }

  const body_to_Send = {
    invoiceIds: ids,
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${API_URL}/invoices/inject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": AUTH_TOKEN,
        },
        body: JSON.stringify(body_to_Send),
      });

      if (response.ok) {
        return true;
      } else {
        console.warn(`Attempt ${attempt} failed: ${response.statusText}`);
      }
    } catch (error) {
      console.warn(`Attempt ${attempt} encountered an error:`, error);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  console.error("Failed to inject invoices after multiple attempts");
  return false;
}
