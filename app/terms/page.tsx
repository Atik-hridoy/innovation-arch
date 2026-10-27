import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Website Terms — Innovation Ark', description: 'Terms governing use of the Innovation Ark website.' };

export default function TermsPage() {
  return <LegalPage eyebrow="Legal" title="Website terms" intro="These terms apply to your use of the Innovation Ark website. Project engagements are governed by their own written agreements." sections={[
    { title: 'Website purpose', body: 'This website provides general information about Innovation Ark, its capabilities, selected work, and ways to contact the studio. Content is informational and is not a binding offer.' },
    { title: 'Project information', body: 'Examples and case studies describe selected work at a high level. Scope, deliverables, schedules, fees, support, intellectual-property terms, and performance commitments are agreed separately in writing for each engagement.' },
    { title: 'Acceptable use', body: 'You may not misuse the site, attempt unauthorized access, disrupt its operation, submit unlawful material, or use its content in a misleading way.' },
    { title: 'Intellectual property', body: 'Unless otherwise stated, the site design and original written content belong to Innovation Ark. Client and technology names, marks, and product materials remain the property of their respective owners.' },
    { title: 'Availability and liability', body: 'We aim to keep the site accurate and available, but do not warrant uninterrupted operation or that all content is error-free. To the extent permitted by law, use of the site is at your own discretion.' },
    { title: 'Contact', body: 'Questions about these terms can be sent to hello@innovationark.co.' },
  ]} />;
}
