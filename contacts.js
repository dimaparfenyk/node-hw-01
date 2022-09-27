const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const updateContacts= async (contacts)=> await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts=async ()=> {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
};

const getContactById= async (contactId) => {
    const contacts = await listContacts();
    const res = contacts.find(item => item.id === contactId);
    return res || null;
};

const removeContact= async (contactId) =>{
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    };
    const [res]=contacts.splice(index, 1);
    await updateContacts(contacts);
    return res;
};

const addContact = async ({ name, email, phone }) => {
    try {
        const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }; 
    const newContactsArr = [...contacts, newContact];
        await updateContacts(newContactsArr);
    return newContact;
    } catch (error) {
        error.message = "Can't add book";
        throw error;
    };  
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}