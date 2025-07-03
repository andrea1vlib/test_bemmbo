
const ButtonInject = ({selectedInvoices, onInject}: {
    selectedInvoices: any[];
    onInject: (invoices: any[]) => void;
    }) => {
    const handleInject = () => {
        if (selectedInvoices.length === 0) {
        alert("Please select at least one invoice to inject.");
        return;
        }
        onInject(selectedInvoices);
    };
    
    return (
        <div className="flex">
            <button
            className="text-white px-4 py-2 rounded mb-8 mr-12 ml-auto bg-[#8b92a9]"
            onClick={handleInject}
            >
            Inyectar
            </button>
        </div>
    );
    }   
export default ButtonInject;
