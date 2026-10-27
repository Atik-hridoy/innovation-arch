import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy — Innovation Ark', description: 'How Innovation Ark handles information submitted through this website.' };

export default function PrivacyPage() {
  return <LegalPage eyebrow="Legal" title="Privacy policy" intro="This policy explains what information this website collects, why it is used, and the choices available to you." sections={[
    { title: 'Information you provide', body: 'When you use a contact or booking form, we may receive your name, email address, preferred meeting time, project type, and any context you choose to share.' },
    { title: 'How we use it', body: 'We use submitted information to respond to enquiries, assess whether we can help, arrange meetings, and maintain relevant business correspondence. We do not sell personal information.' },
    { title: 'Website preferences', body: 'The site may store essential preferences, such as your selected color theme and cookie-consent choice, in your browser. These preferences support the requested website experience.' },
    { title: 'Services and retention', body: 'Form submissions are sent to our website backend. Map, font, or media providers may receive standard technical request data when their content loads. We retain enquiry information only as long as reasonably needed for communication, record-keeping, or legal obligations.' },
    { title: 'Your choices', body: 'You may ask to access, correct, or delete personal information you submitted, subject to applicable obligations. You can also clear locally stored preferences through your browser.' },
    { title: 'Contact', body: 'For privacy questions or requests, email hello@innovationark.co.' },
  ]} />;
}
