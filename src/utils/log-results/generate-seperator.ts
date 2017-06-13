function generateSeperator() {
  const cols = (process.stdout as any).columns;
  let seperator: string = "";

  for (let i = 0; i < cols; i++) {
    seperator += "_";
  }
  return seperator;
}

export default generateSeperator;
