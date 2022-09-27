const contacts = require("./contacts");

const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log (argv)

const invokeAction = async({ action, id, name, email, phone })=> {
  switch (action) {
    case "list":
          const allContacts = await contacts.listContacts();
          console.log(allContacts);
      break;

    case "get":
          const contact = await contacts.getContactById(id);
          console.log(contact);
      break;

    case "add":
          const newContact = await contacts.addContact({ name, email, phone });
          console.log(newContact);
      break;

    case "remove":
          const removeContact = await contacts.removeContact(id);
          console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({action:"list"})
// invokeAction({action:"get", id:"2"});
// invokeAction({ action: "add", name: "Mango", email: "mango@gmail.com", phone: "322-22-22" });
// invokeAction({action: "remove", id:"3"})

(async () => {
invokeAction(argv);
})();

