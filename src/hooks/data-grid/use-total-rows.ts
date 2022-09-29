import { useEffect, useState } from 'react';

export function useTotalRows(totalDataElements?: number): number {
  const [totalRows, setTotalRows] = useState(totalDataElements ?? 0);

  useEffect(() => {
    setTotalRows((prevState) => totalDataElements ?? prevState);
  }, [totalDataElements]);

  return totalRows;
}
