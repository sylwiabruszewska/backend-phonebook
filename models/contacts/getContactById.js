import { readContacts } from "./readContacts.js";

export const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw new Error(`Not found`);
  }

  return contact;
};
