import { useState} from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  return {
    page,
    perPage,
    totalPages,
    setPage,
    setPerPage,
    setTotalPages,
  };
};
