import React from "react";
import Image from "next/image";
import { paginationProps } from "@/types";

const Pagination = ({
  handlePageChange,
  currentPage,
  totalPage,
}: paginationProps) => {
  return (
    <div className="space-x-4 flex text-md md:text-lg my-1 md:my-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <Image
          src="/previous-arrow.svg"
          width={17}
          height={17}
          alt="back arrow icon"
          className=""
        />
      </button>
      <span className="font-bold text-neutral-400">
        Page {currentPage + 1} out of {totalPage}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage + 1 >= totalPage}
      >
        <Image
          src="/next-arrow.svg"
          width={17}
          height={17}
          alt="back arrow icon"
          className=""
        />
      </button>
    </div>
  );
};

export default Pagination;
