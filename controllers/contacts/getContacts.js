import * as contactsActions from "../../models/contacts/index.js";

export async function getContacts(req, res, next) {
  try {
    const contacts = await contactsActions.listContacts();

    res.status(200).json({
      data: contacts,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}
