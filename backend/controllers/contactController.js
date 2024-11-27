const asyncHandler = require('express-async-handler')

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler((req, res) => {
    res.status(200).json({ message: "Get all contacts"})
})

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler((req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}`})
})

//@desc Create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler((req, res) => {
    console.log('The req body is', req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone) {
       res.status(400)
       throw new Error('All fields are mandatory!') 
    }
    res.status(201).json({ message: "Create Contact"})
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler((req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}`})
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler((req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}`})
})

module.exports = { 
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact 
}