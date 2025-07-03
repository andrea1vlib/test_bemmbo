import type { Invoices } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "https://recruiting.data.bemmbo.com";
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

const testInvoices: Invoices[] = [
  {
    id: "1",
    receiverName: "John Doe",
    amount: 1000,
    currency: "CLP",
    injected: true
  },
  {
    id: "2",
    receiverName: "Jane Smith",
    amount: 2000,
    currency: "USD"
  },
  {
    id: "3",
    receiverName: "Alice Johnson",
    amount: 1500,
    currency: "CLP"
  },
  {
    id: "4",
    receiverName: "Bob Brown",
    amount: 3000,
    currency: "USD"
  }
];

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
  // console.log("Using test invoices");
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log("Returning test invoices");
  //     console.log(testInvoices);
  //     testInvoices.forEach(invoice => {
  //       invoice.selected = false; // Ensure selected is always false
  //     });
  //     resolve(testInvoices);
  //   }, 1000); // Simulate network delay
  // });

}
