"use client";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import React from 'react';

const TermsOfUse = () => {
  const router = useRouter();
  return (
    <div>
      <Header/>
      <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg  my-10 font-serif">
        <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center">"Terms of Use"</h1>

      <p className="text-base leading-relaxed mb-4">
        Welcome to The Freelance Website (<a href="https://www.thefreelancewebsite.com" className="text-blue-600 underline" target="_blank">www.thefreelancewebsite.com</a>) owned by AI Tech Solutions Limited, a limited liability company, organized and existing under the laws of Dubai, United Arab Emirates (“UAE”) with trade license number 190120, having its registered address located at office number 2201, Desk D03, Floor 22, Sky Tower, Shams Abu Dhabi, Abu Dhabi, Al Reem Island, UAE.
      </p>

      <p className="text-base leading-relaxed mb-4">
        These Terms of Use, together with our Privacy Policy (<a href="https://www.thefreelancewebsite.com/privacy-policy" className="text-blue-600 underline" target="_blank">www.thefreelancewebsite.com/privacy-policy</a>), and any other applicable policies or guidelines referenced herein (collectively, the “Legal Documents”), govern your access to and use of the website, services, and tools (collectively, the “Platform”) offered by The Freelance Website. You can find our Terms and policies here at: (<a href="https://www.thefreelancewebsite.com/terms-of-use" className="text-blue-600 underline" target="_blank">www.thefreelancewebsite.com/terms-of-use.</a>).
      </p>

      <p className="text-base leading-relaxed mb-4">
        By accessing or using the Platform, you acknowledge that you have read and understood, and you agree to be bound by, these Terms of Use and the Legal Documents with immediate effect. If you do not agree, you must not access or use the Platform.
      </p>

      <p className="text-base leading-relaxed mb-4">
        For the purposes of these Terms:
        <ul className="list-disc ml-8 mb-4 underline">
          <li>“The Freelance Website,” “we,” “us,” or “our” refers to AI Tech Solutions Limited, including its affiliates, subsidiaries, and related entities operating under the brand.</li>
          <li>“You,” “your,” “yourself,” or “user” refers to any individual or entity who visits, accesses, registers, or uses the Platform in any manner, whether as a client, freelancer, or visitor.</li>
        </ul>
        Each of The Freelance Website and the user may be referred to individually as a “Party”, and collectively as the “Parties.”
      </p>
<ul className="list-disc ml-8 mb-4">
     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Platform Overview</h2></li>
      <p className="text-base leading-relaxed mb-4">
        The Freelance Website serves as a digital marketplace that enables freelancers (“Sellers”) to offer their services and clients (“Buyers”) to discover, connect, communicate, collaborate, and engage Sellers for the completion of projects.
      </p>

     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Acceptance of Terms</h2></li>
      <p className="text-base leading-relaxed mb-4">
        By registering for, accessing, or using The Freelance Website, you agree to be bound by these Terms. These Terms apply to all users, including freelancers, clients, and anyone else who accesses the Platform.
      </p>

     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Eligibility</h2></li>
      <p className="text-base leading-relaxed mb-4">
        By using the Platform, you confirm that you meet the following eligibility criteria:
        <ul className="list-decimal ml-8 mb-4">
          <li>You have attained the age of at least 18 years or older; and,</li>
          <li>You are legally capable and eligible of entering into a binding agreement.</li>
        </ul>
      </p>

    <li>  <h2 className="text-lg font-bold mt-6 mb-4 underline"> Account Registration</h2></li>
      <p className="text-base leading-relaxed mb-4">
        <strong className='mr-3'> 4.1</strong> To access features of the Platform, you shall need to create an account. As part of the registration process, you must provide specific information. Failure to provide the required details may result in the rejection of your registration. We reserve the right to decline any registration without explanation and to conduct necessary identity verification checks.
      </p>
      <p className="text-base leading-relaxed mb-4">
        Once your registration is successfully completed, your account will remain active indefinitely, unless suspended or terminated in accordance with Clause 4.2 of these Terms of Use or you choose to delete your account from the Platform.
      </p>
      <p className="text-base leading-relaxed mb-4">
        By registering, you agree to provide accurate and complete information and to keep your account details updated. You must not impersonate anyone else when registering for or using the Platform. Your account is personal, and you are solely responsible for its security, including keeping your password confidential and safeguarding your account from unauthorized use. We are not liable to you or anyone else for any loss or damage resulting from unauthorized access due to your failure to protect your account credentials. You must notify us immediately of any unauthorized access or security breach and take all necessary steps to minimize potential harm, including preserving evidence and contacting relevant authorities.
      </p>
      <p className="text-base leading-relaxed mb-4">
        The Freelance Website has no obligation to provide you with multiple accounts.
      </p>
      <h3 className="text-base font-bold mt-4 mb-2">4.2 Account Termination</h3>
      <p className="text-base leading-relaxed mb-4">
        We reserve the right, but not the obligation, to suspend or terminate your account, or block your email or IP address from accessing or using the Platform at any time, with or without notice to you. We further reserve the right to remove and/or discard any content from the Platform immediately if we find, or believe or have reasons to believe that you have violated or have acted inconsistently with, the letter or spirit of these Terms or the Legal Documents. You agree and acknowledge that we shall not, directly or indirectly, be liable to you or to any third-party for any such suspension, termination, or restriction of your access to the Platform.
      </p>

     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Use of the Platform</h2></li>
      <p className="text-base leading-relaxed mb-4">
        The Platform acts solely as a venue for Users to market, offer, and request digital services. It does not participate in the delivery of services or in the negotiation or execution of service agreements between Users. You agree to use the Platform solely for lawful and legitimate purposes, in compliance with these Terms of Use, Legal Documents and all applicable laws and regulations.
      </p>
      <h3 className="text-base font-bold mt-4 mb-2">5.1 Service Transactions and Responsibilities</h3>
      <p className="text-base leading-relaxed mb-4">
       <strong> A. Requests and Offers:</strong> All service requests by Buyers and all offers by Sellers shall be affected through the Platform.
      </p>
      <p className="text-base leading-relaxed mb-4">
       <strong> B. Service Performance:</strong> Once selected, Sellers agree to perform and deliver services in accordance with the specifications, pricing, and deadlines agreed upon with the Buyer.
      </p>
      <p className="text-base leading-relaxed mb-4">
        It is the responsibility of the Buyer and Seller to mutually agree on the cost and process for revising any unsatisfactory work. The Platform bears no responsibility for service quality or outcomes.
      </p>
      <p className="text-base leading-relaxed mb-4">
       <strong> 5.2 Independent Contractor Relationship:</strong> Buyers acknowledge and agree that all Sellers are independent contractors and are not employees, agents, or representatives of the Platform. Buyers shall not direct, supervise, or control the manner in which Sellers perform their services, and shall not treat Sellers as employees for any purpose.
      </p>
      <h3 className="text-base font-bold mt-4 mb-2">5.3 Prohibited Activities</h3>
      <p className="text-base leading-relaxed mb-4">
        By using the Platform, Buyers and Sellers agree not to engage in any of the following prohibited activities:
        <ul className="list-disc ml-8 mb-4">
          <li>Posting false, misleading, or inaccurate information;</li>
          <li>Harassing or abusing, or threatening other users;</li>
          <li>Circumventing or attempting to circumvent the Platform’s payment or communication systems, including making or requesting payments outside the Platform;</li>
          <li>Uploading, sharing, or transmitting harmful code, viruses, malware, or any content intended to disrupt or damage the Platform or its users;</li>
          <li>Disrupting, interfering with, or attempting to disrupt the operations, security, or integrity of the Platform;</li>
          <li>Engaging in fraud, including fraudulent billing, scams, or misrepresentation;</li>
          <li>Impersonating others or misrepresenting your identity or affiliation;</li>
          <li>Using the Platform for scams, such as Ponzi schemes, unlicensed securities sales, or any other fraudulent or illegal schemes;</li>
          <li>Attempting to reverse engineer, decompile, or otherwise tamper with the Platform’s software or systems;</li>
          <li>Causing harm to the Platform’s business, reputation, employees, or users.</li>
        </ul>
      </p>

    <li>  <h2 className="text-lg font-bold mt-6 mb-4 underline"> Payments and Transactions</h2></li>
      <p className="text-base leading-relaxed mb-4">
        Our Platform offers various payment options, including cryptocurrency. By using these options, you agree to abide by all payment terms.
      </p>
      <h3 className="text-base font-bold mt-4 mb-2">6.1 Fees</h3>
      <p className="text-base leading-relaxed mb-4">
        Fees may apply to certain transactions or membership plans. By using the Platform, you agree to pay all applicable fees as required for your selected services or subscription plan.
      </p>
      <h3 className="text-base font-bold mt-4 mb-2">Subscription and Pricing Model</h3>
      <p className="text-base leading-relaxed mb-4">
        The Platform offers a range of subscription plans designed to provide Users with flexible access to premium features and AI-powered services:
        <ul className="list-disc ml-8 mb-4 underline">
          <li><strong>Monthly Plan:</strong> Grants access to basic features along with limited use of AI-powered services. Pricing is as follows: Essential – $10, Advance – $15, Ultimate – $20 per month.</li>
          <li><strong>Quarterly Plan:</strong> Includes extended access to AI services, task management, and messaging modules. Pricing is as follows: Essential – $27, Advance – $41, Ultimate – $54 per quarter.</li>
          <li><strong>Yearly Plan:</strong> Provides full access to all premium functionalities, including priority support, maximum usage quotas for AI-generated features, and exclusive enhancements in task management, messaging, and video calling. Pricing is as follows: Essential – $96, Advance – $144, Ultimate – $192 per year.</li>
        </ul>
        Users on free plans shall have limited or restricted access to certain AI-powered features, including but not limited to auto-generated proposals, project drafts, and advanced task management tools.
      </p>
      <p className="text-base leading-relaxed mb-4">
        All pricing and included services are subject to modification at the Platform's discretion. Changes will be communicated and updated in the pricing section, and Users will be informed of any material alterations to their subscribed plans.
      </p>
      <h3 className="text-base font-bold mt-4 mb-2">6.2 Refunds</h3>
      <p className="text-base leading-relaxed mb-4">
        We aim to offer flexibility and clarity in how you use our Platform. Please note that all subscription fees are non-refundable once a plan is purchased.
      </p>
      <p className="text-base leading-relaxed mb-4">
        You’re free to cancel your subscription at any time through your account settings. After cancellation, your plan will remain active until the end of the current billing cycle.
      </p>
      <p className="text-base leading-relaxed mb-4">
        We encourage you to review our plans carefully and contact our support team with any questions before subscribing.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> User Content and Feedback</h2></li>
      <p className="text-base leading-relaxed mb-4">
        You retain ownership of all content you post on the Platform, including project descriptions, messages, files, images, feedback and other information you share. You acknowledge and agree that, by posting content, you grant the Platform a non-exclusive, royalty-free, fully paid, perpetual, irrecoverable, worldwide license to use, display, and distribute your content as necessary to operate and improve the Platform. This license allows the Platform to provide its services effectively but does not transfer ownership of your content.
      </p>
      <p className="text-base leading-relaxed mb-4">
        You are responsible for ensuring that you have the rights to share any content you post and that it complies with these Terms and all applicable laws.
      </p>
      <h3 className="text-base font-bold mt-4 mb-2">7.1 Content Restrictions</h3>
      <p className="text-base leading-relaxed mb-4">
        Content posted or shared on the Platform must not:
        <ul className="list-disc ml-8 mb-4">
          <li>Violate any applicable laws or regulations;</li>
          <li>Upload, share, or transmit any content without proper rights or permissions or Infringe upon any third party’s intellectual property rights, including copyright, trademark, patent, trade secret, or other proprietary;</li>
          <li>Be abusive, defamatory, obscene or offensive, discriminatory, or otherwise objectionable contents.</li>
        </ul>
      </p>
      <h3 className="text-base font-bold mt-4 mb-2">7.2 Feedback Rights</h3>
      <p className="text-base leading-relaxed mb-4">
        To the extent you provide any comments, suggestions, or other feedback regarding the Platform and services offered by the Platform (collectively, the “Feedback”), you grant us an exclusive, royalty-free, fully paid, perpetual, irrevocable, worldwide ownership right in the Feedback. The Platform is under no obligation to implement any Feedback it may receive from users.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> User Warranties and Compliance Obligations</h2></li>
      <p className="text-base leading-relaxed mb-4">
        By creating an account and using the Platform, you represent and warrant that you possess all licenses, permits, and authorizations required by applicable law to offer your services, and that you are legally permitted to provide such services in any part of the world. You agree to provide supporting documentation to verify your location details and compliance with these requirements upon request. The Platform reserves the right to immediately suspend or terminate your account if you are found to be in breach of these warranties. You further agree to indemnify and hold the Platform harmless from any losses, damages, penalties, or sanctions resulting from such a breach.
      </p>

     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Privacy</h2></li>
      <p className="text-base leading-relaxed mb-4">
        Your privacy is important to us. Please review our Privacy Policy (link to Privacy Policy) to understand how we collect, use, and safeguard your information. By using the Platform, you acknowledge and agree to the terms outlined in our Privacy Policy.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> Intellectual Property</h2></li>
      <p className="text-base leading-relaxed mb-4">
        All content and materials available on the Platform including, but not limited to, text, graphics, logos, images, software, and other digital assets are the exclusive property of the Platform or its licensors and are protected by copyright, trademark, and other applicable intellectual property laws.
      </p>
      <p className="text-base leading-relaxed mb-4">
        You are strictly prohibited from using, copying, reproducing, modifying, distributing, transmitting, displaying, publishing, or creating derivative works from any content on the Platform without the express prior written consent of the Platform or the respective rights holder. Any unauthorized use of the Platform’s content or materials is strictly forbidden and may result in legal action.
      </p>
      <p className="text-base leading-relaxed mb-4">
        Nothing in these Terms shall be construed as granting any license or right to use any intellectual property of the Platform or its licensors, except as expressly permitted in writing.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> Confidentiality Obligations of Sellers</h2></li>
      <p className="text-base leading-relaxed mb-4">
        Sellers acknowledge that Buyers may need to share confidential information necessary for the delivery of Services in the Platform. Sellers agree to safeguard this information against unauthorized use or disclosure and to treat all such information as highly sensitive and strictly confidential. Specifically, Sellers agree to:
        <ul className="list-[lower-roman] ml-8 mb-4">
          <li>maintain the confidentiality of all information received from Buyers;</li>
          <li>refrain from disclosing any such information to third parties;</li>
          <li>use the information solely for the purpose of providing the agreed Services; and</li>
          <li>not copy or reproduce any part of the information without the Buyer’s explicit consent.</li>
        </ul>
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> User Identity Disclaimer</h2></li>
      <p className="text-base leading-relaxed mb-4">
        We do not guarantee the true identity of any User on the Platform. While we may offer information such as risk scores, location data, or results from third-party background checks, this information is based solely on data provided by Users. Such details are offered for your convenience and do not constitute an introduction, endorsement, or recommendation by us.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> No Guarantees</h2></li>
      <p className="text-base leading-relaxed mb-4">
        The Freelance Website is provided as is, without any warranties, expressed or implied. We do not guarantee about the accuracy, reliability, or availability of content or user conduct or uninterrupted or error-free access or virus-free downloads. Users are responsible for implementing their own data security measures.
      </p>
      <p className="text-base leading-relaxed mb-4">
        Information on the Platform is provided for general informational purposes only and does not constitute legal, financial, tax, or professional advice.
      </p>

     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Limitation of Liability</h2></li>
      <p className="text-base leading-relaxed mb-4">
        The Freelance Website and its affiliates shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages, including but not limited to loss of revenue, anticipated profits, business opportunities, or goodwill, arising out of or in connection with any transaction, interaction, or service provided or received through The Freelance Website. This includes, without limitation, claims related to service quality, delivery timelines, pricing, intellectual property infringement, or compliance with applicable laws.
      </p>
      <p className="text-base leading-relaxed mb-4">
        To the maximum extent permitted by law, under no circumstances shall The Freelance Website’s total liability for any direct damages arising out of or relating to any service exceed the total subscription fees paid by you for the relevant billing period during which the event giving rise to the claim occurred. This limitation applies regardless of the form of action, whether in contract, tort (including negligence), strict liability, or otherwise, even if The Freelance Website has been advised of the possibility of such damages.
      </p>

     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Indemnification</h2></li>
      <p className="text-base leading-relaxed mb-4">
        You agree to be solely responsible and liable for any services you offer, perform, request, or receive through The Freelance Website. You further agree to indemnify and hold harmless The Freelance Website, its affiliates, and employees from any and all claims, damages, liabilities, expenses, or third-party claims arising from your use of The Freelance Website, including but not limited to those resulting from negligence, misconduct, misrepresentation, fraud, data breach, or your violation of these Terms and the Legal Documents.
      </p>

     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Changes to Terms</h2></li>
      <p className="text-base leading-relaxed mb-4">
        These Terms of Use and the Legal Documents are subject to change by us at any time, at our sole discretion, with or without notice. We are not liable for any disruption or loss resulting from such actions. Your continued use of the Platform following any such change constitutes your agreement to these Terms of Use and Legal Documents as so modified. We recommend you review and follow these Term and the Legal Documents on a regular interval.
      </p>

     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Governing Law</h2></li>
      <p className="text-base leading-relaxed mb-4">
        This Agreement shall be governed by and construed in accordance with the laws of the Abu Dhabi Global Market (ADGM), Abu Dhabi, United Arab Emirates.
      </p>
      <p className="text-base leading-relaxed mb-4">
        The parties are encouraged to first attempt to resolve any dispute amicably, including through mediation or alternative dispute resolution mechanisms available within the ADGM.
      </p>
      <p className="text-base leading-relaxed mb-4">
        Subject to the foregoing, any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of the Abu Dhabi Global Market (ADGM), Abu Dhabi, United Arab Emirates.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> Legal Limitations</h2></li>
      <p className="text-base leading-relaxed mb-4">
        Some jurisdictions may not allow certain liability exclusions or limitations in these Terms of Use. Where prohibited, our liability will be limited to the maximum extent permitted by law. These Terms may be used as a defense in any claim related to your use of the Platform.
      </p>
      <p className="text-base leading-relaxed mb-4">
        Disputes must be resolved on an individual basis only, not as part of any class or representative action. Relief granted by the courts will apply only to the individual parties involved. Although courts have exclusive jurisdiction, parties are encouraged to attempt mediation or other alternative dispute resolution first.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> Force Majeure</h2></li>
      <p className="text-base leading-relaxed mb-4">
        Neither party shall be held liable for any delay or failure to fulfill its obligations under this Agreement (except for payment obligations) resulting from events beyond its reasonable control, including but not limited to natural disasters, war, civil unrest, government actions, labor disputes, power or communication failures, fire, or floods.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> Assignment</h2></li>
      <p className="text-base leading-relaxed mb-4">
        Users may not assign, transfer, sublicense, subcontract, or otherwise convey any part of this Agreement, whether by law or otherwise, without the Platform’s prior written consent, which may be withheld at the Platform’s sole discretion.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> Severability</h2></li>
      <p className="text-base leading-relaxed mb-4">
        If any provision of this User Agreement is found to be invalid or unenforceable, that provision will be removed, but the rest of the Agreement will remain in effect. We may assign this Agreement to an affiliated company or to a third party, such as in the case of a sale or transfer of our assets, without your consent. In such cases, you will still be bound by this Agreement.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> Interpretation</h2></li>
      <p className="text-base leading-relaxed mb-4">
        Section headings are provided for convenience only and do not affect the meaning or interpretation of any part of this Agreement.
      </p>

      <li><h2 className="text-lg font-bold mt-6 mb-4 underline"> No Waiver</h2></li>
      <p className="text-base leading-relaxed mb-4">
        If we do not enforce any part of this Agreement in response to a breach, it does not mean we waive our right to enforce it in the future or in similar situations. This does not limit or exclude liability for fraud or fraudulent misrepresentation.
      </p>

     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Communications</h2></li>
      <p className="text-base leading-relaxed mb-4">
        You agree to receive all notices and information regarding the Website and Services electronically. If you withdraw this consent, we may suspend or terminate your account.
      </p>

     <li> <h2 className="text-lg font-bold mt-6 mb-4 underline"> Contact Us</h2></li>
      <p className="text-base leading-relaxed mb-4">
        If you have any queries or concerns about these Terms and the Legal Documents, please contact us at <a href="mailto:support@thefreelancewebsite.com" className="text-blue-600 underline">support@thefreelancewebsite.com</a>.
      </p>
      </ul>

      <p className="text-base leading-relaxed mt-6">
        This Terms of Use was last updated on May 26, 2025
      </p>
    </div>
    <Footer/>
    </div>
  );
};

export default TermsOfUse;
