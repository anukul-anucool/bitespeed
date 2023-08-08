import { Request, Response } from "express";
import { Op } from "sequelize";
import Contact from "./models/contact";

interface RequestBody {
  email?: string;
  phoneNumber?: string;
}

interface ConsolidatedContact {
  primaryContactId: number;
  emails: string[];
  phoneNumbers: string[];
  secondaryContactIds: number[];
}

export async function identifyHandler(req: Request, res: Response): Promise<void> {
  try{
    const { email, phoneNumber } = req.body as RequestBody;
    const { primaryContactId, secondaryContactIds } = await findContacts(email, phoneNumber);
  
    // Filter out undefined values from the arrays and cast to string[]
    const emails = [email].filter(Boolean) as string[];
    const phoneNumbers = [phoneNumber].filter(Boolean) as string[];
  
    // Respond with the consolidated contact information
    const response: { contact: ConsolidatedContact } = {
      contact: {
        primaryContactId,
        emails,
        phoneNumbers,
        secondaryContactIds,
      },
    };
  
    res.status(200).json(response);
  }
  catch (error) {
    console.error("Error in identifyHandler:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
  
}

// Function to find primary contact and secondary contact IDs
async function findContacts(
  email?: string,
  phoneNumber?: string
): Promise<{ primaryContactId: number; secondaryContactIds: number[] }> {
  const contacts = await Contact.findAll({
    where: {
      [Op.or]: [
        {
          email: { [Op.eq]: email },
        },
        {
          phoneNumber: { [Op.eq]: phoneNumber },
        },
      ],
    },
    order: [["linkPrecedence", "ASC"], ["createdAt", "ASC"]],
  });

  if (contacts.length === 0) {
    // If no existing contacts found, create a new primary contact
    const newContact = await Contact.create({
      phoneNumber,
      email,
      linkedId: null,
      linkPrecedence: "primary",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      primaryContactId: newContact.id!,
      secondaryContactIds: [],
    };
  } else {
    // If existing contacts found, return primary contact and secondary contact IDs
    const primaryContactId = contacts[0].id!;
    const secondaryContactIds = contacts.slice(1).map((contact) => contact.id!);

    return {
      primaryContactId,
      secondaryContactIds,
    };
  }
}
