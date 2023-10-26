import { readContacts } from "./readContacts.js";

export const listContacts = async () => {
  const contacts = await readContacts();

  if (!contacts) {
    throw new Error(`Not found`);
  }

  return contacts;
};
