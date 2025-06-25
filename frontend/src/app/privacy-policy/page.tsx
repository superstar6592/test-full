"use client";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import React from 'react';

const PrivacyPolicy = () => {
  const router = useRouter();
    return (
      <div>
      <Header />
      <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg  my-10 font-serif">
         <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
      >
        ← Back
      </button>
        <h1 className="text-3xl font-bold mb-6 text-center">"Privacy Policy"</h1>

        <p className="mb-4">
          We “The Freelance Website” owned by AI Tech Solutions Limited, a limited liability company, organized and existing under the laws of Dubai, United Arab Emirates (“UAE”) with trade license number 190120, having its registered address at office number 2201, Desk D03, Floor 22, Sky Tower, Shams Abu Dhabi, Abu Dhabi, Al Reem Island, UAE (“us”, “we”, “our”) respect the privacy of all our users and are committed to protecting personal data collected through <a href="https://www.thefreelancewebsite.com" className="text-blue-600 underline" target="_blank">www.thefreelancewebsite.com</a>, and its associated mobile application (“Platform”).
        </p>

        <p className="mb-4">
         Your privacy is important to us at The Freelance Website. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you visit or use our platform (the “Website” or "Service"). This Policy is a legally binding agreement between you (“User”, “you” or “your”) and us. By accessing or using our website or services, you acknowledge that you have read, understood, and consent to the collection, use and disclosure of your information in accordance with this Privacy Policy. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Information We Collect</h2>
        <p className="mb-2 font-semibold">Personal Information</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Account Information:  When you create an account, we collect your name, email address, username, password, and any other information you choose to provide.
</li>
          <li>Payment Information: When making payments, we may collect billing details, including payment method and transaction history. Note that sensitive payment information is managed by our third-party payment processors.</li>
        </ul>
        <p className="mb-4">Personal information does not include information where there is no serious possibility that it can be used to identify an individual, whether on its own or in combination with other information, or personal information that has been anonymized such as to be considered anonymized information or no longer personal information under applicable laws</p>

        <p className="mb-2 font-semibold">Usage Information</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Log Data: We automatically collect data about your device and your use of our platform, including IP address, browser type, and page interactions.</li>
          <li>Cookies and Tracking Technologies: We use cookies, web beacons, and similar technologies to track your activity on our site, improving functionality and personalizing content.</li>
        </ul>

        <p className="mb-2 font-semibold">Communications</p>
        <p className="mb-4">We collect the content of any messages or communications sent to us, including support requests or other inquiries.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Provide, operate, and maintain our platform.</li>
          <li>Personalize and improve user experience.</li>
          <li>Process payments and manage transactions.</li>
          <li>Respond to customer service requests and offer support.</li>
          <li>Communicate updates, promotions, and relevant information, if you opt-in to receive such communications.</li>
          <li>Analyze usage to improve and develop our services.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Disclosure Of Your Information</h2>
        <p className="mb-4">We do not sell or rent your personal information to third parties. However, we may disclose information with trusted partners to help us operate our business. For example:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Service Providers: We may disclose information with third-party vendors who assist us in services such as payment processing, website hosting, and data analytics.
We require such third party’s to use the personal information we transfer to them only for the purpose for which it was transferred and not to retain it for longer than is required for fulfilling the said purpose. 
</li>
          <li>Legal Compliance: We may disclose your personal information for (1) to comply with applicable law, regulation, court order or other legal process; (2) to enforce your agreements with us, including this Privacy Policy; or (3) to respond to claims that your use of the service violates our rights, property, or safety or any third-party rights, property, or safety. If our service or our company is merged or acquired with another company, your information will be one of the assets that is transferred to the new owner. </li>
          <li>With your explicit consent, we may use your personal information to provide you with updates, promotional offers, service announcements, and information about services, features, or campaigns that may be of interest to you and enhance your experience on our Platform.</li>
          <li>These communications may be delivered through various channels including, but not limited to, email, push notifications, in-app messages, web notifications, WhatsApp messages, telephone, SMS or post.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Processing of Personal information</h2>
        <p className="mb-4">We may store or process your personal information in countries other than your own, where data protection laws may differ. When transferring personal information outside your country or the European Economic Area (EEA), including to locations that may not have the same level of data protection, we use appropriate safeguards—such as updated European Union (EU) Standard Contractual Clauses or equivalent measures—to protect your data. We take all reasonable steps to ensure your personal information is handled securely and in line with this policy.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Specific Provisions for EU, EEA, and UK Users</h2>
        <p className="mb-4">If you are located in the European Union (EU), European Economic Area (EEA), or United Kingdom (UK), your personal data is protected by the General Data Protection Regulation (GDPR) in the EU/EEA and by the UK GDPR and Data Protection Act 2018 in the UK. These regulations apply whether your data is processed locally or by organizations outside these regions that offer you goods or services or monitor your behavior.</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Know Your Rights</h3>
        <p className="mb-4">As a user in these regions, you have key rights regarding your personal information, including:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>The right to be informed about how your data is collected and used;</li>
          <li>The right to access, correct, or delete your data</li>
          <li>The right to restrict or object to certain processing activities</li>
          <li>The right to data portability (receive your data in a structured, machine-readable format)</li>
          <li>The right to withdraw consent at any time where consent is the basis for processing</li>
          <li>The right to lodge a complaint with your local data protection authority</li>
        </ul>
        <p className="mb-4">To exercise any of these rights, please contact us as outlined in the “Contact Us” section. In addition, you have the right to lodge a complaint with your local data protection authority if you believe your rights have been violated.</p>
        <p className="mb-4">Please note that some rights, such as access and erasure, are not absolute and may be limited by legal obligations or the rights and interests of others in accordance with local laws. We may request additional information to verify your identity before fulfilling your request, and we may retain certain data for legal, accounting, or fraud prevention purposes as permitted by law.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Specific Provisions for US Residents</h2>
        <p className="mb-4">If you are a resident of the United States, you have certain rights under applicable state and federal privacy laws. We may collect personal information including, but not limited to:</p>
        <ul><li>Identifiers such as name, postal address, email address, government-issued identification numbers, and online identifiers;</li>
        <li>Characteristics of protected classifications, including gender, facial images, and audio or electronic information;</li>
        <li>Professional, employment, and educational information;</li>
        <li>Commercial information, including purchase and service history;</li>
        <li>Internet or network activity data, including IP address, browser type, and session duration;</li>
        <li>Location data; and</li>
        <li>Inferences derived from the foregoing information to personalize user experience.</li>
        </ul>
        <p className="mb-4">Such information may be obtained directly from you, collected automatically through your use of our platform, or received from third-party sources.</p>
        <p className="mb-4">We use this information to operate, improve, and personalize our services and may disclose it to third parties for business and marketing purposes. While we do not sell personal information for monetary consideration, certain disclosures for targeted advertising may be deemed “sales” or “sharing” under applicable laws. You may exercise your right to opt out of such disclosures by visiting our “Do Not Sell or Share My Personal Information” page.</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Know Your Rights</h3>
        <p className="mb-4">Subject to applicable limitations and exceptions, you have the right to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Request access to the personal information we have collected about you;</li>
          <li>Request correction or deletion of your personal information;</li>
          <li>Opt out of the sale or sharing of your personal information and targeted advertising;</li>
          <li>Authorize an agent to submit requests on your behalf, subject to verification requirements; and</li>
          <li>Exercise your rights free from discrimination.</li>
        </ul>
         <p className="mb-4">To exercise these rights, please contact us as set forth in the “Contact Us” section. We will verify your identity using information associated with your account and may require government-issued identification to ensure security.</p>
         <p className="mb-4">Please note that some rights are not absolute and may be limited by legal obligations or the rights and interests of others in accordance with local laws. We may retain certain data for legal, accounting, or fraud prevention purposes as permitted by law.</p>


        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Affiliates</h2>
        <p className="mb-4">We may disclose information about you to our affiliates for the purpose of being able to offer you related or additional products and services. Any information relating to you that we provide to our affiliates will be treated by those affiliates in accordance with the terms of this Policy.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Data Security</h2>
        <p className="mb-4">We take your data security seriously and implement appropriate measures to protect it. This includes technical, administrative, and physical safeguards designed to prevent unauthorized access or misuse of your data. Access to these servers is tightly controlled. We maintain server and event logs, and by using our services, you authorize us to transfer and store your information in countries where we operate. However, please note that no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>
          <p className="mb-4">  We may retain your personal data if required by law, in cases of suspected fraud, or if you have ongoing disputes. While we use strong security measures to protect your information, including encryption and secure access controls, no method of online storage is completely secure, so absolute security cannot be guaranteed.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Your Privacy Choices</h2>
        <p>You have options to control your data and privacy on The Freelance Website:
</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Account Information: You can update or delete your account information by accessing your profile settings. Deleting your account permanently will remove all personal data, except information we are legally required to keep to meet our legal/compliance/regulatory requirements or need for ongoing payment or dispute matters. Account deletion may not be possible if you have pending payments, payouts, jobs, or disputes.</li>
          <li>Cookies: Most browsers allow you to manage cookies. You may choose to set your browser to reject cookies or to notify you when a cookie is being used.
</li>
          <li>Marketing Communications: You may withdraw your consent or opt out of receiving promotional emails from us at any time by following the unsubscribe link in those communications. </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Third-Party Links</h2>
        <p className="mb-4">Our website may contain links to third-party websites or services that are not owned, controlled or operated by us. This Privacy Policy does not apply to third-party sites, please be aware that we are not responsible for the privacy practices of such other resources or third parties. We recommend you to be aware when you leave the Website and Services and review their privacy policies before sharing any personal information.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Children’s Privacy</h2>
        <p className="mb-4">Our platform is not intended for children under the age of 13. We do not knowingly collect or solicit personal information from children under 13. If we learn that we have collected information from a child under 13 without verification of parental consent, we will take steps to delete that information.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Changes to this Privacy Policy</h2>
        <p className="mb-4">We reserve the right to  update/modify this Privacy Policy or its terms relating to the Website and Services from time to time in our discretion at any time without any prior notice to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated Privacy Policy on our website with a new "Last Updated" date. Any updated version of this Policy will be effective immediately or within 7 days from when the revised Policy is posted in the Service and your continued access or use of the Service after such time will constitute your acceptance of the revised Privacy Policy. However, we will not, without your consent, use your Personal Information in a manner materially different than what was stated at the time your Personal Information was collected. We encourage you to review this policy periodically.
</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Your Acceptance to this policy</h2>
        <p className="mb-4">You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and using our Platform and Services you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to access or use our Platform and Services.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 underline">Contact Us</h2>
        <p className="mb-4">If you have any queries or concerns about this Privacy Policy or our data practices, please contact us at  <a href="mailto:support@thefreelancewebsite.com" className="text-blue-600 underline">support@thefreelancewebsite.com</a>.</p>

        <p className="text-sm text-gray-600 mt-10">This Privacy Policy was last updated on May 23, 2025</p>
      </div>
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;
