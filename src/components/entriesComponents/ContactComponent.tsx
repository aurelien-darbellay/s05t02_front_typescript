// ContactComponent.tsx
import React from 'react';
import { Contact } from '../../model/concreteEntries/Contact';

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

      <h3>ContainerEntry Fields</h3>
      <p><strong>Projected:</strong> {contact.projected ? 'Yes' : 'No'}</p>
      <p><strong>Highlighted:</strong> {contact.highlighted ? 'Yes' : 'No'}</p>
      <p>
        <strong>Position:</strong> x={contact.position.xCord}, y={contact.position.yCord}
      </p>
      <p><strong>Color:</strong> {contact.color}</p>
      <p><strong>Size:</strong> {contact.size}</p>
      <p>
        <strong>Previous Entry:</strong> projected={contact.previousEntry.projected ? 'Yes' : 'No'}
        , highlighted={contact.previousEntry.highlighted ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Next Entry:</strong> projected={contact.nextEntry.projected ? 'Yes' : 'No'}
        , highlighted={contact.nextEntry.highlighted ? 'Yes' : 'No'}
      </p>
    </div>
  );
};
