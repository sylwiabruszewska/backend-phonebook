import { Request } from "express";

interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

type SendVerificationMailProps = {
  userEmail: string;
  verificationToken: string;
};

// contacts/getContacts
interface PostContactBody {
  name: string;
  email: string;
  phone?: string;
  favorite?: boolean;
}

// contacts/patchContactStatus
interface PatchContactStatusBody {
  favorite: boolean;
}

// contacts/patchContact
interface ContactData {
  name?: string;
  email?: string;
  phone?: string;
  favorite?: boolean;
}

interface ContactDocument extends Document, ContactData {}

// contacts/getContacts
export interface GetContactsQuery {
  page?: string;
  limit?: string;
  favorite?: string;
  query?: string;
}
