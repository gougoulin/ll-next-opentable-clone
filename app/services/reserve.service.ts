export const reserve = {
  simple: function (sortedTables: { id: string; seats: number }[], bookingSize: number) {
    const total: number = sortedTables.reduce((acc, table) => acc + table.seats, 0);
    if (total < bookingSize) return null;
    let remain = bookingSize,
      reserved: string[] = [];
    while (remain > 0) {
      let table: { id: string; seats: number };
      if (remain <= 2) {
        table = sortedTables.pop() as any;
      } else {
        table = sortedTables.shift() as any;
      }
      remain -= table.seats;
      reserved.push(table.id);
    }
    return reserved;
  },
};
