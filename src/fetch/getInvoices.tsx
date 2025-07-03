import type { Invoices } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "https://recruiting.data.bemmbo.com";
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;



export async function getInvoices(): Promise<Invoices[]> {
  if (!API_URL || !AUTH_TOKEN) {
    throw new Error("API URL or Auth Token is not defined");
  }
  const response = await fetch(`${API_URL}/invoices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": AUTH_TOKEN
    }
  }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  } 
  const response_json = await response.json();
  response_json.forEach((invoice:Invoices) => {
    invoice.selected = false; // Ensure selected is always false
  });
  console.log("Successfully fetched invoices");
  return response_json;


}
