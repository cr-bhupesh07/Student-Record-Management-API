const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const dataFile = path.join(__dirname, "..", "contacts.json");

// Read contacts from JSON file
function getContacts() {
  const data = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(data);
}

// Save contacts to JSON file
function saveContacts(contacts) {
  fs.writeFileSync(
    dataFile,
    JSON.stringify(contacts, null, 2)
  );
}

// POST - Add a new contact
router.post("/", (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    company
  } = req.body;

  // Basic validation
  if (!name || !email || !phone) {
    return res.status(400).json({
      error: "Name, email and phone are required"
    });
  }

  const contacts = getContacts();

  // Check duplicate email or phone
  const duplicate = contacts.find(
    contact =>
      contact.email.toLowerCase() === email.toLowerCase() ||
      contact.phone === phone
  );

  if (duplicate) {
    return res.status(409).json({
      error: "Contact with this email or phone already exists"
    });
  }

  const newContact = {
    id: contacts.length > 0
      ? contacts[contacts.length - 1].id + 1
      : 1,
    name,
    email,
    phone,
    address: address || "",
    company: company || ""
  };

  contacts.push(newContact);
  saveContacts(contacts);

  res.status(201).json({
    message: "Contact created successfully",
    contact: newContact
  });
});

// GET - Get all contacts
// Supports search, sorting and pagination

router.get("/", (req, res) => {
  let contacts = getContacts();

  const {
    search = "",
    sort = "id",
    order = "asc",
    page = 1,
    limit = 10
  } = req.query;

  // -------------------------
  // SEARCH
  // -------------------------
  if (search) {
    const searchText = search.toLowerCase();

    contacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchText) ||
      contact.email.toLowerCase().includes(searchText) ||
      contact.phone.includes(searchText)
    );
  }

  // -------------------------
  // SORTING
  // -------------------------
  const allowedSortFields = [
    "id",
    "name",
    "email",
    "phone",
    "company"
  ];

  if (!allowedSortFields.includes(sort)) {
    return res.status(400).json({
      error: "Invalid sort field",
      allowedFields: allowedSortFields
    });
  }

  if (!["asc", "desc"].includes(order.toLowerCase())) {
    return res.status(400).json({
      error: "Order must be either asc or desc"
    });
  }

  contacts.sort((a, b) => {
    const valueA = String(a[sort]).toLowerCase();
    const valueB = String(b[sort]).toLowerCase();

    if (valueA < valueB) {
      return order.toLowerCase() === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return order.toLowerCase() === "asc" ? 1 : -1;
    }

    return 0;
  });

  // -------------------------
  // PAGINATION
  // -------------------------
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1
  ) {
    return res.status(400).json({
      error: "Page must be a positive number"
    });
  }

  if (
    !Number.isInteger(limitNumber) ||
    limitNumber < 1
  ) {
    return res.status(400).json({
      error: "Limit must be a positive number"
    });
  }

  const totalContacts = contacts.length;
  const totalPages = Math.ceil(totalContacts / limitNumber);

  const startIndex = (pageNumber - 1) * limitNumber;

  const paginatedContacts = contacts.slice(
    startIndex,
    startIndex + limitNumber
  );

  res.status(200).json({
    count: paginatedContacts.length,
    totalContacts,
    page: pageNumber,
    limit: limitNumber,
    totalPages,
    contacts: paginatedContacts
  });
});

// GET - Get contact by ID
router.get("/:id", (req, res) => {
  const contacts = getContacts();

  const id = Number(req.params.id);

  const contact = contacts.find(
    contact => contact.id === id
  );

  if (!contact) {
    return res.status(404).json({
      error: "Contact not found"
    });
  }

  res.status(200).json(contact);
});

// PUT - Update contact
router.put("/:id", (req, res) => {
  const contacts = getContacts();

  const id = Number(req.params.id);

  const index = contacts.findIndex(
    contact => contact.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Contact not found"
    });
  }

  const {
    name,
    email,
    phone,
    address,
    company
  } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      error: "Name, email and phone are required"
    });
  }

  // Check duplicate email or phone
  const duplicate = contacts.find(
    contact =>
      contact.id !== id &&
      (
        contact.email.toLowerCase() === email.toLowerCase() ||
        contact.phone === phone
      )
  );

  if (duplicate) {
    return res.status(409).json({
      error: "Another contact with this email or phone already exists"
    });
  }

  contacts[index] = {
    id,
    name,
    email,
    phone,
    address: address || "",
    company: company || ""
  };

  saveContacts(contacts);

  res.status(200).json({
    message: "Contact updated successfully",
    contact: contacts[index]
  });
});

// DELETE - Delete contact
router.delete("/:id", (req, res) => {
  const contacts = getContacts();

  const id = Number(req.params.id);

  const index = contacts.findIndex(
    contact => contact.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Contact not found"
    });
  }

  const deletedContact = contacts.splice(index, 1)[0];

  saveContacts(contacts);

  res.status(200).json({
    message: "Contact deleted successfully",
    contact: deletedContact
  });
});

module.exports = router;