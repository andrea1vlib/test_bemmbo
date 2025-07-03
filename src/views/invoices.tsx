"use client";
import TableInvoices from "../components/tableInvoices";
import { useState, useEffect } from "react";
import { getInvoices } from "../fetch/getInvoices";
import type { Invoices } from "../types";
import ButtonInject from "../components/buttonInject";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Invoices[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const data = await getInvoices();
                setInvoices(data);
            } catch (err) {
                setError("Failed to fetch invoices");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchInvoices();
    }, []);
    const handleInject = (selectedInvoices: Invoices[]) => {
        if (selectedInvoices.length === 0) {
            alert("Please select at least one invoice to inject.");
            return;
        }
        // Here you would typically send the selected invoices to the server
        console.log("Injecting invoices:", selectedInvoices);
        // For now, just mark them as injected in the local state
        // const updatedInvoices = invoices.map(invoice => 
        //     selectedInvoices.includes(invoice) ? { ...invoice, injected: true } : invoice
        // );
        // setInvoices(updatedInvoices);
    }

    return (
        <div className="overflow-x-auto w-screen">
            <div className="mt-2">
                <ButtonInject
                    selectedInvoices={invoices.filter(invoice => invoice.selected)}
                    onInject={handleInject}
                />

                <TableInvoices InvoicesData={invoices} loading={loading}/>
            </div>
        </div>
    );
}
