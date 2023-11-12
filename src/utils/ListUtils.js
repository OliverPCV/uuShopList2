export const getListNameById = (lists, id) => {
    const list = lists.find((list) => list.id === id);
    return list ? list.name : `List ${id}`;
  };