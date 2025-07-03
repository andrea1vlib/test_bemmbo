const getPaginationRange = (
  totalPages: number,
  currentPage: number,
  siblingCount: number = 1
): (number | string)[] => {
  const range: (number | string)[] = [];

  const totalVisiblePages = siblingCount * 2 + 5;

  if (totalPages <= totalVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);

  range.push(1);

  if (leftSiblingIndex > 2) {
    range.push("...");
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    range.push(i);
  }

  if (rightSiblingIndex < totalPages - 1) {
    range.push("...");
  }

  range.push(totalPages);

  return range;
};



export default getPaginationRange;