// ContactComponent.tsx
import React from 'react';
import { Contact } from '../../../model/concreteEntries/Contact';

interface ContactComponentProps {
  contact: Contact;
}

export const ContactComponent: React.FC<ContactComponentProps> = ({ contact }) => {
  return (
    <div>
      <p><strong>Phone Number:</strong> {contact.phoneNumber}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>LinkedIn:</strong> {contact.linkedInAccount}</p>
      <p><strong>GitHub:</strong> {contact.gitHubAccount}</p>
      <p><strong>Instagram:</strong> {contact.instagramAccount}</p>
      <p><strong>Facebook:</strong> {contact.facebookAccount}</p>
      <p><strong>City of Residence:</strong> {contact.cityOfResidence}</p>
      <p><strong>Zip Code:</strong> {contact.zipCode}</p>
    </div>
  );
};
