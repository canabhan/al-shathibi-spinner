import React, { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import AOS from "aos";

const BoxList = ({ items = [], handleUloomQuestion, widthClass = "w-2/4", isLocked = false }) => {
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const start       = page * ITEMS_PER_PAGE;
  const visible     = items.slice(start, start + ITEMS_PER_PAGE);

  // keep page in bounds if items array changes
  useEffect(() => {
    if (page > totalPages - 1) setPage(totalPages - 1);
  }, [items.length, totalPages, page]);

  useEffect(() => {
    AOS.refresh();
  }, [page, items]);

  return (
    <div className={`bg-[#fbf0e1] p-6 flex flex-col items-center justify-center ${widthClass} rounded-4xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] h-full`}>

      <h2 className="font-bold arabic py-2 pb-6 text-3xl text-[#cc4104]">علوم القرآن</h2>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {visible.map((item, idx) => {
          const globalIdx = start + idx;          // absolute position
          return (
            <div key={item.id ?? globalIdx}>
              {isLocked || item.locked || item.isOpen ?
                <div   className="bg-[#cc4104] w-28 h-28 rounded-3xl flex
                              items-center justify-center text-3xl shadow-4xl
                              font-bold text-[#fef7eb] border-6 border-[#f2e3ca]
                              hover:scale-105 transition-transform duration-300">
                 <FaLock /> 
              </div>:
                <div onClick={()=>handleUloomQuestion(item)}  className="bg-[#d7520d] w-28 h-28 rounded-3xl flex
                              items-center justify-center text-3xl shadow-4xl
                              font-bold text-[#fef7eb] border-6 border-[#f2e3ca]
                              hover:scale-105 transition-transform duration-300">
                {globalIdx + 1}
              </div>
            }
           
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 0}
          className="px-4 py-1 bg-[#d7520d] text-[#fef7eb] rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page >= totalPages - 1}
          className="px-4 py-1 bg-[#cc4104] text-[#fef7eb] rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BoxList;
