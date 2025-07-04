"use client";
import TableInvoices from "../components/tableInvoices";
import { useState, useEffect } from "react";
import { getInvoices } from "../fetch/getInvoices";
import type { Invoices } from "../types";
import ButtonInject from "../components/buttonInject";
import { postInject } from "../fetch/postInject";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Invoices[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedInvoices, setSelectedInvoices] = useState<Invoices[]>([]);
    const [ idsInject, setIdsInject ] = useState<string[]>([]);
    const limit_inject = 25;
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
        const totalInjections = selectedInvoices.length;
        const counterInjections = Math.ceil(selectedInvoices.length / limit_inject);
        for (let i = 0; i < counterInjections; i++) {
            const start = i * limit_inject;
            const end = start + limit_inject;
            const invoicesToInject = selectedInvoices.slice(start, end);
            setIdsInject(invoicesToInject.map(invoice => invoice.id));
            const usePostInject = async () => {
                try {
                    const response = await postInject(idsInject);
                    if (response) {
                        setInvoices(prev => prev.map(invoice => 
                            invoicesToInject.includes(invoice) ? { ...invoice, injected: true } : invoice
                        ));
                        setSelectedInvoices([]);
                        setInvoices(prev => prev.map(invoice => ({ ...invoice, selected: false })));
                        if (i === counterInjections - 1) {
                            alert(`Se inyectaron ${totalInjections} facturas correctamente`);
                        }
                    } else {
                        alert("Ocurrió un error al inyectar las facturas");
                    }
                } catch (error) {
                    console.error("Error injecting invoices:", error);
                    alert("Ocurrió un error al inyectar las facturas");
                }
            }
            usePostInject();
            
        }

    }

    if (error) {
        return <div className="text-red-500">Ocurrió un error, por favor recarga la página</div>;
    }

    return (
        <div className="overflow-x-auto w-screen">
            <div className="mt-2">
                <ButtonInject
                    selectedInvoices={selectedInvoices}
                    onInject={handleInject}

                />

                <TableInvoices 
                    InvoicesData={invoices} 
                    loading={loading} 
                    setInvoicesData={setInvoices}
                    setSelectedInvoices={setSelectedInvoices}
                />
            </div>
        </div>
    );
}