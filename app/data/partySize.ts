interface PartySizeDto {
  label: string;
  value: number;
}

export const partySize = (size: number): PartySizeDto[] => {
  if (size <= 0 || size > 20) throw new Error(`size must be between 0 and 20`);
  return new Array(size).fill(0).map((_, indx) => {
    return {
      value: indx + 1,
      label: `${indx + 1} ${indx === 0 ? "person" : "people"}`,
    };
  });
};
