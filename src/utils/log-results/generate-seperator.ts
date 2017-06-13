// generateSeperator is responsible for printing out a seperatorfor the logResults module
// It figures out the size of the seperator from the width of the terminal it's printing to
function generateSeperator() {
  const cols = (process.stdout as any).columns;
  let seperator: string = "";

  for (let i = 0; i < cols; i++) {
    seperator += "_";
  }
  return seperator;
}

export default generateSeperator;
