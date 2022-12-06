const CreateArray = (from: number, to: number) => {
  if (from > to) return [];
  let result: number[] = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
}
export default CreateArray;