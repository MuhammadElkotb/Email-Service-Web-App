package Controller.ContactsFilter;

import Controller.Profile.Elements.Contacts.ContactI;

import java.util.ArrayList;

public class ContactsSearchingCustomizedCriteria implements ContactsCriteriaI {
    private String target;

    public ContactsSearchingCustomizedCriteria(String target){
        this.target = target;
    }

    @Override
    public ArrayList<ContactI> meetCriteria(ArrayList<ContactI> contacts) {
        ArrayList<ContactI> filteredContacts = new ArrayList<>();

        for(ContactI contact:contacts){
            if((contact.getUsername().toLowerCase()).concat(contact.getEmailAddresses().toString().toLowerCase()
                    ).contains(this.target.toLowerCase())){
                filteredContacts.add(contact);
            }
        }
        return filteredContacts;
    }
}
