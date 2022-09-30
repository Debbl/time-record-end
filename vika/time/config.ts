import { vika } from "../config";

const dataSheet = vika.datasheet("dstnxBkVTZyTNu5m40");

const getUserTime = async (username: string, startTime: number, endTime: number) => {
  const response = await dataSheet.records.query({
    filterByFormula: `AND(
    {username}="${username}",
    VALUE({startTime})>VALUE(${startTime}),
    VALUE({endTime})<VALUE(${endTime})
    )`,
  });
  return response;
};

export { dataSheet, getUserTime };
