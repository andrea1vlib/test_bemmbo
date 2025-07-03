import type { Invoices } from "../types";
import { HiOutlineXCircle } from "react-icons/hi2";
import { GrStatusGood } from "react-icons/gr";
import { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import getPaginationRange from "../utils/getPaginationRange";

type TableInvoicesProps = {
  InvoicesData: Invoices[];
  loading: boolean;
  setInvoicesData: (data: Invoices[]) => void;
};

export default function TableInvoices({ InvoicesData, loading, setInvoicesData }: TableInvoicesProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentInvoices = InvoicesData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(InvoicesData.length / itemsPerPage);
    const pagination = getPaginationRange(totalPages, currentPage);

    const handleChangeCheckbox = (invoice: Invoices) => {
        console.log("Checkbox clicked for invoice:", invoice.id);
        console.log("Current selection state:", invoice.selected);
        const updated = InvoicesData.map((inv) =>
          inv.id === invoice.id ? { ...inv, selected: !inv.selected } : inv
        );
        setInvoicesData(updated);
        console.log("New selection state:", invoice.selected);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-blue-600 text-2xl">Cargando...</div>
            </div>
        );
    }
  return (
   <div className="overflow-x-auto w-full px-12">
      <table className="w-full table-auto ">
        <thead className="bg-[#f3f5f7]">
          <tr>
            <th></th>
            <th className="py-2 pl-4 pr-8  text-black text-left">Emisor</th>
            <th className="py-2 pl-4 pr-1 text-black text-left">Monto</th>
            <th className="py-2 pl-0 pr-4 text-black text-left">Moneda</th>
            <th className="py-2 pl-auto pr-0 text-black text-left">Inyectado</th>
          </tr>
        </thead>
        <tbody>
            {currentInvoices.map((invoice) => (
                <tr key={invoice.id}>
                <td className="py-4 pr-0 pl-2 border-b bg-transparent border-b-[#f3f5f7]">
                    <input
                      type="checkbox"
                      className={`
                        appearance-none
                        h-5 w-5
                        border-2 border-gray-400
                        rounded
                        bg-white
                        checked:bg-[#464955]
                        cursor-pointer
                      `}
                      checked={invoice.selected || false}
                      onChange={() => handleChangeCheckbox(invoice)}
                    />
                </td>
                <td className="py-4 pl-4 pr-8 border-b text-black border-b-[#f3f5f7]">{invoice.receiverName}</td>
                <td className="py-4 pl-4 pr-0 border-b text-[#464955] border-b-[#f3f5f7]">${invoice.amount.toLocaleString("es-CL")}</td>
                <td className="py-4 pl-0 pr-4 border-b text-[#464955] border-b-[#f3f5f7]">{invoice.currency}</td>
                <td className="py-4 px-4 border-b text-black text-center border-b-[#f3f5f7]">
                     {invoice.injected ? <GrStatusGood className="text-green-600" /> : <HiOutlineXCircle className="text-red-600" />}
                </td>
                </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4 px-12 gap-4 flex-wrap mb-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="py-2 text-black"
        >
          <MdOutlineArrowBackIos />
        </button>


        <div className="flex gap-2 flex-wrap items-center justify-center mt-4">
          {pagination.map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(Number(page))}
                className={`py-2 text-black ${
                  currentPage === page
                    ? "bg-[#f3f5f7]"
                    : "bg-tranparent"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>


        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="py-2 text-black"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>

      
    </div>
  );
}