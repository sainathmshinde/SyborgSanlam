import { useState, useEffect } from "react";
import { produce } from "immer";
import { Separator } from "./separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import { Trash2Icon, FilePenIcon } from "lucide-react";
import { Dialog, DialogContent } from "./dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import PropTypes from "prop-types";
import { Label } from "./label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { SelectItem } from "@radix-ui/react-select";
import { Input } from "./input";

const ContactDetails = ({ contacts, updateContacts }) => {
  const [contactList, setContactList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  const handleContactRemove = (index) => {
    const newList = produce(contactList, (draft) => {
      draft.splice(index, 1);
    });
    setContactList(newList);
    updateContacts(newList);
  };

  const handleContactEdit = (index) => {
    setNewContact(contactList[index]);
    setEditIndex(index);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAddOrUpdateContact = () => {
    const newList = produce(contactList, (draft) => {
      if (isEditing && editIndex !== null) {
        draft[editIndex] = newContact;
      } else {
        draft.push(newContact);
      }
    });
    setContactList(newList);
    updateContacts(newList);
    setNewContact({
      id: 0,
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      designation: "",
    });
    setErrors({});
    setIsEditing(false);
    setEditIndex(null);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div>
          <h4 className="text-sm font-medium leading-none mb-2">Contact</h4>
        </div>

        <div className="rounded-lg shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead className="text-right">
                  <DialogTrigger>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setNewContact({
                          id: 0,
                          firstName: "",
                          lastName: "",
                          mobile: "",
                          email: "",
                        });
                      }}
                    >
                      +
                    </Button>
                  </DialogTrigger>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactList?.length ? (
                contactList.map((contact, index) => (
                  <TableRow key={index}>
                    <TableCell>{contact.firstName}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell>{contact.mobile}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.designation}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleContactEdit(index)}
                      >
                        <FilePenIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleContactRemove(index)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No contacts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DialogContent>
          <div>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={newContact.firstName}
                onChange={handleChange}
                error={errors?.firstName}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                label="Last Name"
                isRequired={true}
                type="text"
                name="lastName"
                value={newContact.lastName}
                onChange={handleChange}
                error={errors?.lastName}
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                label="Mobile Number"
                isRequired={true}
                type="text"
                name="mobile"
                value={newContact.mobile}
                onChange={handleChange}
                error={errors?.mobile}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                label="Email"
                isRequired={true}
                type="text"
                name="email"
                value={newContact.email}
                onChange={handleChange}
                error={errors?.email}
              />
            </div>
            <div className=" space-y-2">
              <Label htmlFor="assignedUser">Designation</Label>
              <Select
                id="assignedUser"
                // value={newContact.assignedUser}
                // onValueChange={(value) =>
                //   setNewContact({ ...newContact, assignedUser: value })
                // }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Doe">Manager</SelectItem>
                  <SelectItem value="Jane Smith">Sales Manager</SelectItem>
                  <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAddOrUpdateContact}>
            {isEditing ? "Update Contact" : "Save Contact"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

ContactDetails.defaultProps = {
  contacts: [],
  updateContacts: () => {},
};

ContactDetails.propTypes = {
  contacts: PropTypes.array,
  updateContacts: PropTypes.func,
};

export default ContactDetails;
