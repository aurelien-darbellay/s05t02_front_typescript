// ContactComponent.tsx
import React from 'react';
import { Contact } from '../../../model/concreteEntries/Contact';

import {
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Mail,
  Phone,
} from 'lucide-react';

interface ContactComponentProps {
  contact: Contact;
}

export const ContactComponent: React.FC<ContactComponentProps> = ({
  contact,
}) => {
  const isNonEmpty = (value?: string | null) =>
    value !== undefined && value !== null && value !== '';

  const linkClass =
    'text-purple-600 underline hover:text-purple-800 inline-flex items-center gap-2';

  return (
    <div className="space-y-1">
      {isNonEmpty(contact.phoneNumber) && (
        <p className="flex items-center gap-2">
          <Phone size={16} />
          {contact.phoneNumber}
        </p>
      )}

      {isNonEmpty(contact.email) && (
        <p>
          <a href={`mailto:${contact.email}`} className={linkClass}>
            <Mail size={16} />
            {contact.email}
          </a>
        </p>
      )}

      {isNonEmpty(contact.linkedInAccount) && (
        <p>
          <a
            href={contact.linkedInAccount}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </p>
      )}

      {isNonEmpty(contact.gitHubAccount) && (
        <p>
          <a
            href={contact.gitHubAccount}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Github size={16} />
            GitHub
          </a>
        </p>
      )}

      {isNonEmpty(contact.instagramAccount) && (
        <p>
          <a
            href={contact.instagramAccount}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Instagram size={16} />
            Instagram
          </a>
        </p>
      )}

      {isNonEmpty(contact.facebookAccount) && (
        <p>
          <a
            href={contact.facebookAccount}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Facebook size={16} />
            Facebook
          </a>
        </p>
      )}

      {(isNonEmpty(contact.cityOfResidence) || isNonEmpty(contact.zipCode)) && (
        <p>
          {contact.cityOfResidence}
          {isNonEmpty(contact.zipCode) && ` (${contact.zipCode})`}
        </p>
      )}
    </div>
  );
};
