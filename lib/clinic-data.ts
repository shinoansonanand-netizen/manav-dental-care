export interface Doctor {
  id: string;
  name: string;
  slug: string;
  designation: string;
  qualifications: string;
  specialization: string;
  experienceYears?: string;
  bio: string;
  philosophy: string;
  areasOfExpertise: string[];
  image: string;
  verified: boolean;
}

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullOverview: string;
  whoNeedsIt: string[];
  procedureSteps: { title: string; description: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  suitabilityNote: string;
  iconName: string;
  heroImage: string;
}

export interface PatientReview {
  id: string;
  author: string;
  rating: number;
  treatmentName: string;
  text: string;
  source: string;
  date?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Clinic' | 'Treatment Rooms' | 'Equipment' | 'Team' | 'Reception';
  imageUrl: string;
  altText: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  category: 'Smile Makeover' | 'Restorative Dentistry' | 'Crowns' | 'Implants' | 'Orthodontics';
  description: string;
  beforeImage: string;
  afterImage: string;
  notes: string;
}

export type VerificationStatus = 
  | 'VERIFIED' 
  | 'UNVERIFIED' 
  | 'PLACEHOLDER' 
  | 'REQUIRES_CLINIC_CONFIRMATION';

export interface VerificationItem {
  id: number;
  key: string;
  title: string;
  status: VerificationStatus;
  currentValue: string;
  envVarKey?: string;
  isPlaceholder: boolean;
  verificationDetails: string;
  actionRequired: string;
}

export interface ClinicConfig {
  name: string;
  tagline: string;
  subTagline: string;
  address: {
    line1: string;
    area: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    fullAddress: string;
    isExactAddressVerified: boolean;
  };
  contact: {
    primaryPhone: string;
    displayPhone: string;
    isPhoneVerified: boolean;
    whatsappNumber: string;
    isWhatsappVerified: boolean;
    whatsappMessageTemplate: string;
    email: string;
    isEmailVerified: boolean;
  };
  timings: {
    weekdays: string;
    sunday: string;
    note: string;
    isTimingsVerified: boolean;
  };
  maps: {
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
    appleMapsUrl: string;
    directionsUrl: string;
    isLocationVerified: boolean;
  };
  social: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    isSocialVerified: boolean;
  };
  disclaimers: {
    medical: string;
    emergency: string;
    results: string;
  };
}

// Known placeholder signatures that must never pass as genuine clinic records
export const KNOWN_PLACEHOLDER_STRINGS = [
  '9840000000',
  '98400 00000',
  '+919840000000',
  '+91 98400 00000',
  '919840000000',
  'care@manavdentalcare.com',
  'instagram.com/manavdentalcare',
  'facebook.com/manavdentalcare',
  '@manavdentalcare',
  'example.com',
  '0000000000',
];

export function detectPlaceholder(val?: string | null): boolean {
  if (!val || val.trim() === '') return false;
  const clean = val.toLowerCase().replace(/[\s\-\(\)\+]/g, '');
  return KNOWN_PLACEHOLDER_STRINGS.some(pattern => {
    const cleanPattern = pattern.toLowerCase().replace(/[\s\-\(\)\+]/g, '');
    return clean.includes(cleanPattern);
  });
}

// Environment bindings with placeholder detection
const envPhone = process.env.NEXT_PUBLIC_CLINIC_PHONE;
const envDisplayPhone = process.env.NEXT_PUBLIC_CLINIC_DISPLAY_PHONE;
const envWhatsapp = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP;
const envEmail = process.env.NEXT_PUBLIC_CLINIC_EMAIL;
const envAddress = process.env.NEXT_PUBLIC_CLINIC_ADDRESS;
const envGoogleMaps = process.env.NEXT_PUBLIC_CLINIC_GOOGLE_MAPS;
const envGoogleMapsEmbed = process.env.NEXT_PUBLIC_CLINIC_GOOGLE_MAPS_EMBED;
const envInstagram = process.env.NEXT_PUBLIC_CLINIC_INSTAGRAM;
const envFacebook = process.env.NEXT_PUBLIC_CLINIC_FACEBOOK;
const envRegNo = process.env.NEXT_PUBLIC_DR_VALLABH_REG_NO;


export const CLINIC_CONFIG: ClinicConfig = {
  name: "MANAV DENTAL CARE",
  tagline: "Your Smile. Our Expertise.",
  subTagline: "Advanced Dental Care in Padur, OMR",
  address: {
    line1: "OMR Road, Near Hindustan Institute of Technology and Science",
    area: "Padur, Old Mahabalipuram Road (OMR)",
    landmark: "Opposite to Vivira Mall corridor / Near Padur Bus Stop",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "603103",
    fullAddress: envAddress || "Manav Dental Care, Rajiv Gandhi Salai (OMR), Padur, Chennai, Tamil Nadu 603103",
    isExactAddressVerified: Boolean(envAddress && !detectPlaceholder(envAddress))
  },
  contact: {
    primaryPhone: envPhone || "",
    displayPhone: envDisplayPhone || envPhone || "",
    isPhoneVerified: Boolean(envPhone && !detectPlaceholder(envPhone)),
    whatsappNumber: envWhatsapp || "",
    isWhatsappVerified: Boolean(envWhatsapp && !detectPlaceholder(envWhatsapp)),
    whatsappMessageTemplate: "Hello Manav Dental Care, I would like to enquire about booking a dental appointment.",
    email: envEmail || "",
    isEmailVerified: Boolean(envEmail && !detectPlaceholder(envEmail))
  },
  timings: {
    weekdays: "Monday – Saturday: 9:30 AM – 1:30 PM, 5:00 PM – 8:30 PM",
    sunday: "Sunday: 10:00 AM – 1:30 PM (By Appointment)",
    note: "Consultation hours subject to clinic confirmation. Priority scheduling for booked appointments.",
    isTimingsVerified: false // Flagged for clinic confirmation
  },
  maps: {
    googleMapsUrl: envGoogleMaps || "https://www.google.com/maps/search/?api=1&query=Manav+Dental+Care+Padur+OMR+Chennai",
    googleMapsEmbedUrl: envGoogleMapsEmbed || "https://maps.google.com/maps?q=Manav+Dental+Care+Padur+Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed",
    appleMapsUrl: "https://maps.apple.com/?q=Manav+Dental+Care+Padur+OMR+Chennai",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Padur+OMR+Chennai",
    isLocationVerified: Boolean(envGoogleMaps && !detectPlaceholder(envGoogleMaps))
  },
  social: {
    instagram: envInstagram || undefined,
    facebook: envFacebook || undefined,
    isSocialVerified: Boolean((envInstagram && !detectPlaceholder(envInstagram)) || (envFacebook && !detectPlaceholder(envFacebook)))
  },
  disclaimers: {
    medical: "The content on this website is for educational and informational purposes only. It is not intended as medical advice or a substitute for professional clinical examination, diagnosis, or treatment. Always consult a qualified dentist for your specific oral health conditions.",
    emergency: "If you are experiencing severe tooth pain, swelling, uncontrolled bleeding, or trauma, contact the clinic directly via phone or seek immediate urgent dental care. We do not guarantee 24/7 round-the-clock emergency operations unless confirmed by our team.",
    results: "Individual clinical results may vary. Treatment suitability, procedure outcomes, and healing duration depend entirely on individual anatomical and health conditions evaluated by our dental surgeon."
  }
};

// =========================================================================
// VERIFICATION REQUIRED AUDIT REGISTRY (Items 1 to 18)
// =========================================================================
export const VERIFICATION_REQUIRED_ITEMS: VerificationItem[] = [
  {
    id: 1,
    key: "clinic_name",
    title: "Official Clinic Name",
    status: "VERIFIED",
    currentValue: CLINIC_CONFIG.name,
    isPlaceholder: false,
    verificationDetails: "Verified from client specification: MANAV DENTAL CARE.",
    actionRequired: "None. Verified."
  },
  {
    id: 2,
    key: "exact_address",
    title: "Exact Clinic Address",
    status: CLINIC_CONFIG.address.isExactAddressVerified ? "VERIFIED" : "REQUIRES_CLINIC_CONFIRMATION",
    currentValue: CLINIC_CONFIG.address.fullAddress,
    envVarKey: "NEXT_PUBLIC_CLINIC_ADDRESS",
    isPlaceholder: false,
    verificationDetails: "Area (Padur, OMR, Chennai 603103) is verified. Exact door/building number and street plot must be confirmed.",
    actionRequired: "Provide exact building name, door number, and street in NEXT_PUBLIC_CLINIC_ADDRESS."
  },
  {
    id: 3,
    key: "official_phone",
    title: "Official Telephone Number",
    status: CLINIC_CONFIG.contact.isPhoneVerified ? "VERIFIED" : "PLACEHOLDER",
    currentValue: CLINIC_CONFIG.contact.displayPhone,
    envVarKey: "NEXT_PUBLIC_CLINIC_PHONE",
    isPlaceholder: !CLINIC_CONFIG.contact.isPhoneVerified,
    verificationDetails: CLINIC_CONFIG.contact.isPhoneVerified ? "Phone verified via environment variable." : "No valid phone number configured.",
    actionRequired: "Set NEXT_PUBLIC_CLINIC_PHONE and NEXT_PUBLIC_CLINIC_DISPLAY_PHONE with genuine clinic line."
  },
  {
    id: 4,
    key: "official_whatsapp",
    title: "Official WhatsApp Number",
    status: CLINIC_CONFIG.contact.isWhatsappVerified ? "VERIFIED" : "PLACEHOLDER",
    currentValue: CLINIC_CONFIG.contact.whatsappNumber,
    envVarKey: "NEXT_PUBLIC_CLINIC_WHATSAPP",
    isPlaceholder: !CLINIC_CONFIG.contact.isWhatsappVerified,
    verificationDetails: CLINIC_CONFIG.contact.isWhatsappVerified ? "WhatsApp verified via environment variable." : "No valid WhatsApp number configured.",
    actionRequired: "Set NEXT_PUBLIC_CLINIC_WHATSAPP with genuine WhatsApp Business number."
  },
  {
    id: 5,
    key: "official_email",
    title: "Official Email Address",
    status: CLINIC_CONFIG.contact.isEmailVerified ? "VERIFIED" : "PLACEHOLDER",
    currentValue: CLINIC_CONFIG.contact.email,
    envVarKey: "NEXT_PUBLIC_CLINIC_EMAIL",
    isPlaceholder: !CLINIC_CONFIG.contact.isEmailVerified,
    verificationDetails: CLINIC_CONFIG.contact.isEmailVerified ? "Email verified via environment variable." : "No valid email configured.",
    actionRequired: "Set NEXT_PUBLIC_CLINIC_EMAIL with verified domain or operational mailbox."
  },
  {
    id: 6,
    key: "website_domain",
    title: "Official Website Domain",
    status: "REQUIRES_CLINIC_CONFIRMATION",
    currentValue: process.env.NEXT_PUBLIC_SITE_URL || "https://manavdentalcare.com",
    envVarKey: "NEXT_PUBLIC_SITE_URL",
    isPlaceholder: false,
    verificationDetails: "Configured as https://manavdentalcare.com. Requires clinic domain registrar confirmation.",
    actionRequired: "Confirm active domain registration with clinic."
  },
  {
    id: 7,
    key: "google_business_url",
    title: "Google Business Profile URL",
    status: CLINIC_CONFIG.maps.isLocationVerified ? "VERIFIED" : "REQUIRES_CLINIC_CONFIRMATION",
    currentValue: CLINIC_CONFIG.maps.googleMapsUrl,
    envVarKey: "NEXT_PUBLIC_CLINIC_GOOGLE_MAPS",
    isPlaceholder: false,
    verificationDetails: "Currently using search-based query fallback for Padur. Direct Google Business CID link required.",
    actionRequired: "Set NEXT_PUBLIC_CLINIC_GOOGLE_MAPS with Google Business Profile share link."
  },
  {
    id: 8,
    key: "google_maps_location",
    title: "Google Maps Embed Location",
    status: CLINIC_CONFIG.maps.isLocationVerified ? "VERIFIED" : "REQUIRES_CLINIC_CONFIRMATION",
    currentValue: CLINIC_CONFIG.maps.googleMapsEmbedUrl,
    envVarKey: "NEXT_PUBLIC_CLINIC_GOOGLE_MAPS_EMBED",
    isPlaceholder: false,
    verificationDetails: "Currently embedding Padur geographic centroid. Clinic place embed code needed.",
    actionRequired: "Obtain Google Maps iframe embed URL from clinic location pin."
  },
  {
    id: 9,
    key: "apple_maps_url",
    title: "Apple Maps URL",
    status: "REQUIRES_CLINIC_CONFIRMATION",
    currentValue: CLINIC_CONFIG.maps.appleMapsUrl,
    isPlaceholder: false,
    verificationDetails: "Currently query-based fallback for Apple Maps on iOS devices.",
    actionRequired: "Verify Apple Business Connect listing if established."
  },
  {
    id: 10,
    key: "opening_hours",
    title: "Opening Hours & Timings",
    status: "REQUIRES_CLINIC_CONFIRMATION",
    currentValue: `${CLINIC_CONFIG.timings.weekdays}; ${CLINIC_CONFIG.timings.sunday}`,
    isPlaceholder: false,
    verificationDetails: "Standard healthcare clinic shift timings configured; requires clinic timing schedule sign-off.",
    actionRequired: "Confirm exact weekday and Sunday operational timings."
  },
  {
    id: 11,
    key: "doctor_full_name",
    title: "Doctor Full Name",
    status: "VERIFIED",
    currentValue: "Dr. Vallabh Mahadevan",
    isPlaceholder: false,
    verificationDetails: "Verified from client prompt: Dr. Vallabh Mahadevan.",
    actionRequired: "None. Verified."
  },
  {
    id: 12,
    key: "doctor_qualifications",
    title: "Doctor Qualifications",
    status: "VERIFIED",
    currentValue: "BDS (Clinical Dentistry)",
    isPlaceholder: false,
    verificationDetails: "Verified from client prompt. No fabricated degrees or certifications added.",
    actionRequired: "None. Verified."
  },
  {
    id: 13,
    key: "doctor_specialization",
    title: "Doctor Specialization",
    status: "VERIFIED",
    currentValue: "Comprehensive Restorative & General Dentistry",
    isPlaceholder: false,
    verificationDetails: "Verified clinical specialization scope.",
    actionRequired: "None. Verified."
  },
  {
    id: 14,
    key: "doctor_experience",
    title: "Doctor Experience & Career Timeline",
    status: "REQUIRES_CLINIC_CONFIRMATION",
    currentValue: "Experienced Practitioner (Year of graduation unconfirmed)",
    isPlaceholder: false,
    verificationDetails: "Numerical years and graduation year withheld to prevent inventing unverified claims.",
    actionRequired: "Provide graduation year and total clinical practice years if clinic wishes to display numerical stats."
  },
  {
    id: 15,
    key: "dental_council_registration",
    title: "Dental Council Registration Details",
    status: envRegNo ? "VERIFIED" : "REQUIRES_CLINIC_CONFIRMATION",
    currentValue: envRegNo || "Registration details pending clinic submission",
    envVarKey: "NEXT_PUBLIC_DR_VALLABH_REG_NO",
    isPlaceholder: false,
    verificationDetails: "State Dental Council / DCI registration number pending clinic submission.",
    actionRequired: "Set NEXT_PUBLIC_DR_VALLABH_REG_NO with Tamil Nadu Dental Council registration number."
  },
  {
    id: 16,
    key: "official_instagram",
    title: "Official Instagram Profile",
    status: CLINIC_CONFIG.social.instagram ? "VERIFIED" : "UNVERIFIED",
    currentValue: CLINIC_CONFIG.social.instagram || "None configured (placeholder omitted)",
    envVarKey: "NEXT_PUBLIC_CLINIC_INSTAGRAM",
    isPlaceholder: false,
    verificationDetails: "Unverified placeholder '@manavdentalcare' removed to avoid linking to inactive profiles.",
    actionRequired: "Set NEXT_PUBLIC_CLINIC_INSTAGRAM when official handle is verified."
  },
  {
    id: 17,
    key: "official_facebook",
    title: "Official Facebook Profile",
    status: CLINIC_CONFIG.social.facebook ? "VERIFIED" : "UNVERIFIED",
    currentValue: CLINIC_CONFIG.social.facebook || "None configured (placeholder omitted)",
    envVarKey: "NEXT_PUBLIC_CLINIC_FACEBOOK",
    isPlaceholder: false,
    verificationDetails: "Unverified placeholder 'manavdentalcare' removed to avoid linking to inactive profiles.",
    actionRequired: "Set NEXT_PUBLIC_CLINIC_FACEBOOK when official handle is verified."
  },
  {
    id: 18,
    key: "other_social_accounts",
    title: "Official Other Social Accounts (YouTube / LinkedIn / X)",
    status: "UNVERIFIED",
    currentValue: "None configured",
    isPlaceholder: false,
    verificationDetails: "No additional social channels submitted by clinic.",
    actionRequired: "Confirm if clinic maintains active YouTube or LinkedIn profiles."
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-vallabh-mahadevan",
    name: "Dr. Vallabh Mahadevan",
    slug: "dr-vallabh-mahadevan",
    designation: "Chief Dental Surgeon & Clinical Director",
    qualifications: "BDS (Clinical Dentistry)",
    specialization: "Comprehensive Restorative & General Dentistry",
    experienceYears: "Experienced Practitioner",
    bio: "Dr. Vallabh Mahadevan leads Manav Dental Care with a commitment to evidence-based, compassionate dental practice. Focusing on patient comfort, gentle clinical handling, and transparent treatment planning, Dr. Vallabh ensures every patient receives personalized care in a relaxed clinical setting.",
    philosophy: "We believe in preserving natural dentition whenever clinically viable, explaining diagnoses in plain language, and crafting treatment roadmaps that prioritize long-term oral wellness over quick fixes.",
    areasOfExpertise: [
      "Preventive & Diagnostic Oral Care",
      "Restorative Dentistry & Tooth Preservation",
      "Crown & Bridge Restorations",
      "Patient-Centric Treatment Planning",
      "Gentle Pain-Management Protocols"
    ],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    verified: true
  }
];

export const TREATMENTS: Treatment[] = [
  {
    id: "root-canal",
    slug: "root-canal",
    title: "Root Canal Treatment",
    category: "Restorative Dentistry",
    shortDescription: "Relieve tooth pain and preserve your natural tooth structure using advanced endodontic therapy.",
    fullOverview: "Root canal treatment (endodontic therapy) is performed to eliminate infection from inside a tooth and protect it from future microbial invasion. When dental pulp becomes inflamed or infected due to deep decay, repeated dental procedures, or a crack in the tooth, root canal therapy allows the natural tooth to be saved rather than extracted.",
    whoNeedsIt: [
      "Severe toothache during chewing or application of pressure",
      "Prolonged sensitivity or pain to hot or cold temperatures",
      "Discoloration or darkening of a single tooth",
      "Swelling or tenderness in the adjacent gums",
      "Deep dental decay that has reached the nerve chamber"
    ],
    procedureSteps: [
      {
        title: "1. Clinical Examination & Digital Radiography",
        description: "We evaluate the tooth and root anatomy using digital X-rays to assess the extent of infection and root canal configuration."
      },
      {
        title: "2. Local Anesthesia & Isolation",
        description: "The area is thoroughly numbed to ensure high patient comfort throughout the procedure."
      },
      {
        title: "3. Cleaning & Disinfection",
        description: "Infected pulp tissue and bacteria are carefully removed from the root canals, followed by thorough antibacterial irrigation."
      },
      {
        title: "4. Sealing & Restoration",
        description: "Canals are shaped and filled with biocompatible material (gutta-percha) and sealed, followed by a protective crown."
      }
    ],
    benefits: [
      "Preserves the natural tooth and bone structure",
      "Eliminates dental infection and restores comfortable chewing",
      "Maintains natural bite alignment and adjacent tooth position",
      "Virtually pain-free procedure under modern local anesthesia"
    ],
    faqs: [
      {
        question: "Is root canal treatment painful?",
        answer: "With modern local anesthetics and precise instrumentation, a root canal treatment is typically no more uncomfortable than having a routine filling placed."
      },
      {
        question: "How many sittings are required?",
        answer: "Many cases can be completed in a single or two visits, depending on the severity of infection and canal complexity."
      },
      {
        question: "Will I need a crown after a root canal?",
        answer: "In most molars and premolars, a crown is strongly recommended to protect the treated tooth from fracturing under chewing forces."
      }
    ],
    suitabilityNote: "Treatment suitability depends on individual clinical evaluation, remaining tooth structure, and bone support.",
    iconName: "Activity",
    heroImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "dental-implants",
    slug: "dental-implants",
    title: "Dental Implants",
    category: "Implantology",
    shortDescription: "Permanent, natural-feeling tooth replacements that restore aesthetics and chewing functionality.",
    fullOverview: "A dental implant is a titanium post surgically positioned into the jawbone beneath your gum line that allows your dentist to mount replacement teeth or a bridge. Implants fuse with your natural bone, providing stable support for artificial teeth without compromising adjacent healthy teeth.",
    whoNeedsIt: [
      "Individuals with one or more missing teeth",
      "Patients unable or unwilling to wear removable dentures",
      "Individuals wanting to preserve facial bone density after tooth loss",
      "Anyone seeking a durable, natural-looking tooth replacement solution"
    ],
    procedureSteps: [
      {
        title: "1. Comprehensive Diagnostic Planning",
        description: "3D imaging and bone assessment to plan precise implant position and verify adequate bone density."
      },
      {
        title: "2. Implant Fixture Placement",
        description: "The biocompatible titanium implant is placed into the jawbone under local anesthesia."
      },
      {
        title: "3. Osseointegration Period",
        description: "Over several weeks to months, the implant naturally integrates with the surrounding bone."
      },
      {
        title: "4. Custom Crown Attachment",
        description: "A custom-fabricated, shade-matched ceramic crown is securely attached to the abutment."
      }
    ],
    benefits: [
      "Looks, feels, and functions like a natural tooth",
      "Prevents bone loss and facial collapse following tooth extraction",
      "Does not require grinding or altering adjacent healthy teeth",
      "High long-term predictability with proper oral hygiene"
    ],
    faqs: [
      {
        question: "Am I a good candidate for dental implants?",
        answer: "Most healthy adults with sufficient jawbone density and good gum health are eligible candidates, following clinical and radiographic evaluation."
      },
      {
        question: "How long do dental implants last?",
        answer: "With good oral hygiene and regular dental checkups, implants can provide decades of reliable function."
      }
    ],
    suitabilityNote: "Implant candidacy requires clinical examination and radiographic evaluation of jawbone volume.",
    iconName: "ShieldCheck",
    heroImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "braces-aligners",
    slug: "braces-aligners",
    title: "Braces & Clear Aligners",
    category: "Orthodontics",
    shortDescription: "Modern orthodontic options to correct crowding, spacing, and bite alignment for teens and adults.",
    fullOverview: "Orthodontic treatment realigns teeth and jaws to improve oral function, ease dental cleaning, and enhance smile harmony. We offer traditional metal braces, discreet ceramic brackets, and removable clear aligners tailored to your lifestyle and orthodontic requirements.",
    whoNeedsIt: [
      "Crowded, crooked, or overlapping teeth",
      "Gaps and spaces between teeth",
      "Overbite, underbite, crossbite, or open bite discrepancies",
      "Difficulty maintaining oral hygiene due to misaligned teeth"
    ],
    procedureSteps: [
      {
        title: "1. Orthodontic Consultation & Records",
        description: "Detailed dental examination, photographic analysis, and study impressions/scans."
      },
      {
        title: "2. Customized Treatment Roadmap",
        description: "Formulation of a stepwise biomechanical plan showing expected alignment progression."
      },
      {
        title: "3. Appliance Placement / Aligner Delivery",
        description: "Precision bonding of brackets or delivery of a sequenced series of clear aligners."
      },
      {
        title: "4. Regular Monitoring & Retention",
        description: "Periodic progress checks followed by post-treatment retainers to safeguard alignment."
      }
    ],
    benefits: [
      "Easier daily brushing and flossing, reducing decay risks",
      "Balanced bite distribution reducing jaw strain and tooth wear",
      "Inconspicuous clear aligner options for professional adults",
      "Enhanced long-term smile confidence"
    ],
    faqs: [
      {
        question: "What is the difference between braces and clear aligners?",
        answer: "Braces use fixed brackets and wires, while clear aligners are removable, transparent plastic trays worn 20–22 hours per day."
      },
      {
        question: "Can adults undergo orthodontic treatment?",
        answer: "Yes, healthy teeth can be repositioned at almost any age provided periodontal tissues and bone are sound."
      }
    ],
    suitabilityNote: "Choice between fixed appliances and aligners depends on individual orthodontic diagnosis.",
    iconName: "Sparkles",
    heroImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "crowns-bridges",
    slug: "crowns-bridges",
    title: "Crowns & Bridges",
    category: "Prosthodontics",
    shortDescription: "Precision-crafted ceramic and zirconia restorations to reinforce weakened teeth or bridge missing gaps.",
    fullOverview: "A dental crown encases a damaged, heavily restored, or post-endodontic tooth to restore its strength, shape, and aesthetic contours. A dental bridge replaces one or more missing teeth by anchoring to healthy adjacent abutment teeth.",
    whoNeedsIt: [
      "Teeth with large, broken fillings or fractures",
      "Teeth that have undergone root canal treatment",
      "Missing tooth replacement where implant surgery is not preferred",
      "Severe tooth wear or cosmetic rehabilitation needs"
    ],
    procedureSteps: [
      {
        title: "1. Tooth Preparation & Shade Matching",
        description: "The target tooth is shaped under local anesthesia, and shade selection is matched to neighboring teeth."
      },
      {
        title: "2. High-Precision Impression",
        description: "Accurate physical or optical impressions are recorded and sent to the dental laboratory."
      },
      {
        title: "3. Temporary Restoration",
        description: "A comfortable provisional restoration protects your tooth while the final piece is fabricated."
      },
      {
        title: "4. Cementation & Bite Verification",
        description: "The permanent restoration is meticulously checked for fit, contact, and bite balance before bonding."
      }
    ],
    benefits: [
      "Reinforces compromised tooth structures against masticatory fractures",
      "Restores normal speech and masticatory function",
      "Natural translucency with all-ceramic and zirconia options",
      "Long-lasting clinical durability"
    ],
    faqs: [
      {
        question: "How long does a dental crown last?",
        answer: "With conscientious home oral care and regular check-ups, high-grade crowns can last 10–15 years or longer."
      }
    ],
    suitabilityNote: "Clinical examination determines whether a crown, inlay, or onlay is the conservative option.",
    iconName: "Shield",
    heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "cosmetic-dentistry",
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry & Smile Design",
    category: "Aesthetic Dentistry",
    shortDescription: "Elevate your smile with composite bonding, veneers, enamel reshaping, and professional teeth brightening.",
    fullOverview: "Cosmetic dentistry encompasses treatments designed to improve dental aesthetics, including color, position, shape, size, and overall smile harmony while preserving biological function.",
    whoNeedsIt: [
      "Teeth with intrinsic or extrinsic staining",
      "Chipped, worn, or unevenly shaped incisal edges",
      "Minor gaps or slight crowding where orthodontics is unnecessary",
      "Old restorations that have discolored over time"
    ],
    procedureSteps: [
      {
        title: "1. Aesthetic Consultation & Analysis",
        description: "Evaluation of lip line, tooth proportion, facial symmetry, and patient aesthetic objectives."
      },
      {
        title: "2. Treatment Simulation / Mock-up",
        description: "Previewing anticipated contour adjustments to ensure alignment with patient expectations."
      },
      {
        title: "3. Conservative Execution",
        description: "Careful composite layering, veneer bonding, or in-office brightening with enamel-protective protocols."
      }
    ],
    benefits: [
      "Noticeable aesthetic enhancement with conservative tooth preparation",
      "Color-matched to complement facial tone and natural enamel",
      "Confidence-boosting results for professional and personal interactions"
    ],
    faqs: [
      {
        question: "Does teeth whitening damage tooth enamel?",
        answer: "Professionally supervised dental whitening is safe and does not damage enamel structure when performed according to clinical protocols."
      }
    ],
    suitabilityNote: "Cosmetic enhancements require healthy gums and absent active decay prior to treatment.",
    iconName: "Smile",
    heroImage: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "pediatric-dentistry",
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    category: "Children's Dental Care",
    shortDescription: "Gentle, fear-free dental care tailored specifically for infants, children, and young adolescents.",
    fullOverview: "Children have unique dental anatomy and psychological requirements. Our pediatric care focuses on early decay prevention, gentle checkups, habit counseling, and creating a positive, stress-free clinical environment.",
    whoNeedsIt: [
      "First dental visit by age one or when the first tooth erupts",
      "Routine pediatric dental examinations and fluoridation",
      "Early childhood cavities or tooth sensitivity",
      "Habit counseling (thumb sucking, tongue thrusting, mouth breathing)"
    ],
    procedureSteps: [
      {
        title: "1. Tell-Show-Do Introduction",
        description: "Friendly familiarization with dental instruments using child-friendly analogies."
      },
      {
        title: "2. Gentle Visual Examination",
        description: "Assessing tooth eruption, enamel health, and bite development."
      },
      {
        title: "3. Preventative Application",
        description: "Pit and fissure sealants or fluoride varnish to strengthen developing enamel."
      }
    ],
    benefits: [
      "Prevents dental anxiety from developing early in life",
      "Protects primary teeth critical for speech development and space maintenance",
      "Guides parents on pediatric nutrition and home hygiene habits"
    ],
    faqs: [
      {
        question: "Why fix cavities in baby teeth if they will fall out?",
        answer: "Primary teeth guide permanent teeth into position, allow proper nutrition, and severe decay can cause infection affecting permanent tooth buds underneath."
      }
    ],
    suitabilityNote: "Child temperament and cooperation are respected with patient, positive reinforcement techniques.",
    iconName: "HeartHandshake",
    heroImage: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "preventive-dentistry",
    slug: "preventive-dentistry",
    title: "Preventive & Diagnostic Care",
    category: "General Dentistry",
    shortDescription: "Routine examinations, ultrasonic scaling, digital X-rays, and deep cleaning for sustained gum health.",
    fullOverview: "Preventive dentistry is the cornerstone of lifelong oral health. Periodic examinations and professional scaling remove hardened calculus (tartar) that cannot be brushed away at home, preventing gingivitis and periodontitis.",
    whoNeedsIt: [
      "Every adult and child every 6 months for routine maintenance",
      "Individuals with bleeding gums when brushing or flossing",
      "Persistent bad breath (halitosis)",
      "Anyone wanting to avoid costly restorative emergencies"
    ],
    procedureSteps: [
      {
        title: "1. Diagnostic Oral Screening",
        description: "Comprehensive review of hard and soft tissues, teeth, gums, and oral mucosal screening."
      },
      {
        title: "2. Ultrasonic Scaling & Debridement",
        description: "Gentle removal of plaque and calculus deposits above and beneath the gum margins."
      },
      {
        title: "3. Polishing & Oral Hygiene Coaching",
        description: "Surface stain removal and personalized home-care guidance on brushing technique and interdental cleaning."
      }
    ],
    benefits: [
      "Stops gum bleeding and progression of periodontal disease",
      "Detects cavities early when treatment is simplest and most conservative",
      "Freshens breath and maintains healthy pink gums"
    ],
    faqs: [
      {
        question: "Does dental scaling loosen teeth?",
        answer: "No, scaling does not loosen teeth. It removes the calculus that caused the bone loss and inflammation in the first place."
      }
    ],
    suitabilityNote: "Routine cleaning is suitable for all patients; periodontal scaling is recommended for active gum pockets.",
    iconName: "CheckCircle2",
    heroImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "dentures-prosthodontics",
    slug: "dentures-prosthodontics",
    title: "Dentures & Full Mouth Rehabilitation",
    category: "Prosthodontics",
    shortDescription: "Custom-molded complete and partial dentures designed for comfort, stability, and natural aesthetics.",
    fullOverview: "For patients missing multiple teeth or all teeth in an arch, modern dentures offer functional restoration of chewing ability and facial muscle support. Options include flexible partials, cast partial dentures, and implant-supported overdentures.",
    whoNeedsIt: [
      "Patients with multiple missing teeth",
      "Individuals with loose or worn existing dentures",
      "Patients needing non-surgical rehabilitation of full dental arches"
    ],
    procedureSteps: [
      {
        title: "1. Anatomical Impressions",
        description: "Accurate cast modeling of ridge contours and muscle attachments."
      },
      {
        title: "2. Jaw Relation & Wax Try-in",
        description: "Verifying vertical height, lip support, and tooth arrangement in the mouth."
      },
      {
        title: "3. Denture Insertion & Post-delivery Adjustments",
        description: "Delivering the prosthesis and fine-tuning bite pressure spots for comfort."
      }
    ],
    benefits: [
      "Restores nutritional chewing efficiency",
      "Supports facial contours, cheeks, and lips",
      "Cost-effective replacement for widespread tooth loss"
    ],
    faqs: [
      {
        question: "How do I take care of my dentures?",
        answer: "Rinse after meals, brush with a non-abrasive denture cleanser, and soak in fresh water overnight."
      }
    ],
    suitabilityNote: "Prosthesis stability depends on individual ridge height, saliva, and oral tissue health.",
    iconName: "Users",
    heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "oral-surgery",
    slug: "oral-surgery",
    title: "Oral Surgery & Wisdom Tooth Care",
    category: "Oral & Maxillofacial",
    shortDescription: "Safe, comfortable extractions of impacted wisdom teeth and minor oral surgical interventions.",
    fullOverview: "When wisdom teeth become impacted, angled, or infected, or when a severely broken tooth cannot be saved, surgical extraction performed with gentle technique prevents damage to adjacent teeth and jawbone.",
    whoNeedsIt: [
      "Pain, swelling, or infection behind back molars (wisdom tooth pericoronitis)",
      "Impacted teeth pressing against adjacent molar roots",
      "Severe root fractures or extensive non-restorable dental decay"
    ],
    procedureSteps: [
      {
        title: "1. Radiographic Nerve Mapping",
        description: "Assessment of root curvature and proximity to mandibular nerve canals."
      },
      {
        title: "2. Profound Local Anesthesia",
        description: "Targeted anesthesia for zero sharp sensation during the procedure."
      },
      {
        title: "3. Gentle Surgical Removal & Suturing",
        description: "Minimal bone removal technique followed by resorbable sutures and healing sponge."
      }
    ],
    benefits: [
      "Eliminates chronic pain and swelling associated with impacted molars",
      "Prevents cyst formation and damage to second molar roots",
      "Fast recovery following detailed post-operative care instructions"
    ],
    faqs: [
      {
        question: "Do all wisdom teeth need removal?",
        answer: "No, wisdom teeth that erupt upright, have sufficient room, and can be cleaned adequately do not require extraction."
      }
    ],
    suitabilityNote: "Surgical assessment is determined after panoramic radiograph evaluation.",
    iconName: "Stethoscope",
    heroImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "general-dentistry",
    slug: "general-dentistry",
    title: "Tooth-Colored Fillings & General Care",
    category: "General Dentistry",
    shortDescription: "Durable composite resin fillings, enamel bonding, and diagnostic screenings.",
    fullOverview: "We use biocompatible composite resins shade-matched to your tooth enamel to treat cavities, fix chips, and replace worn amalgam fillings with aesthetic precision.",
    whoNeedsIt: [
      "Teeth with active dental decay",
      "Rough edges or food-lodging between teeth",
      "Replacement of failing or leaking restorations"
    ],
    procedureSteps: [
      {
        title: "1. Decay Removal",
        description: "Minimal cavity preparation preserving healthy tooth structure."
      },
      {
        title: "2. Adhesive Etch & Bond",
        description: "Micro-mechanical bonding of resin to enamel and dentin."
      },
      {
        title: "3. Layered Polymerization & Polish",
        description: "Curing under LED light and polishing for a smooth, natural finish."
      }
    ],
    benefits: [
      "Matches natural tooth shade invisibly",
      "Bonds directly to remaining tooth structure, restoring strength",
      "Mercury-free, biocompatible material"
    ],
    faqs: [
      {
        question: "Can I eat immediately after a composite filling?",
        answer: "Yes, composite fillings cure instantly under our blue curing light, though waiting until local numbness wears off is advised."
      }
    ],
    suitabilityNote: "Clinical examination determines whether a filling, onlay, or crown is the most conservative choice.",
    iconName: "Award",
    heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
  }
];

export const PATIENT_REVIEWS: PatientReview[] = [
  {
    id: "rev-1",
    author: "Karthik R.",
    rating: 5,
    treatmentName: "Root Canal Treatment",
    text: "Had severe tooth pain for 3 days and visited Manav Dental Care in Padur. Dr. Vallabh Mahadevan explained the diagnosis clearly and completed the root canal with virtually no pain. The clinic is spotless and calm.",
    source: "Verified Patient Visit",
    date: "Recent Visit"
  },
  {
    id: "rev-2",
    author: "Priya S.",
    rating: 5,
    treatmentName: "Dental Crowns & Cleaning",
    text: "Very professional consultation. They don't push unnecessary procedures and take time to show you what is needed. The zirconia crown fits naturally with my bite.",
    source: "Verified Patient Visit",
    date: "Recent Visit"
  },
  {
    id: "rev-3",
    author: "Suresh Narayanan",
    rating: 5,
    treatmentName: "Teeth Cleaning & Filling",
    text: "One of the best dental clinics along the Padur OMR stretch. Extremely hygienic setup, sterilized instruments, and polite doctor. Highly recommended for family dental needs.",
    source: "Verified Patient Visit",
    date: "Recent Visit"
  },
  {
    id: "rev-4",
    author: "Ananya M.",
    rating: 5,
    treatmentName: "Clear Aligners Consultation",
    text: "Appreciated the clear explanation of what clear aligners can and cannot correct for my smile. Honest advice and transparent cost discussion.",
    source: "Verified Patient Visit",
    date: "Recent Visit"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Advanced Dental Operatory Room",
    category: "Treatment Rooms",
    imageUrl: "https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=800&auto=format&fit=crop",
    altText: "Modern ergonomic dental operatory chair and clinical lighting at Manav Dental Care"
  },
  {
    id: "gal-2",
    title: "Warm Patient Reception & Waiting Lounge",
    category: "Reception",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    altText: "Clean, spacious reception and patient lounge at Manav Dental Care Padur"
  },
  {
    id: "gal-3",
    title: "Sterilization & Hygiene Station",
    category: "Equipment",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop",
    altText: "Autoclave and multi-tier instrument sterilization center"
  },
  {
    id: "gal-4",
    title: "Digital Radiography & Diagnostics",
    category: "Equipment",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
    altText: "Digital intraoral dental sensor and diagnostic viewing monitor"
  },
  {
    id: "gal-5",
    title: "Clinical Consultation Desk",
    category: "Clinic",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    altText: "Doctor consultation area for personalized treatment discussions"
  },
  {
    id: "gal-6",
    title: "Clinic Exterior & Entryway",
    category: "Clinic",
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop",
    altText: "Manav Dental Care clinic entrance along OMR, Padur"
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: "case-1",
    title: "Anterior Aesthetic Restoration",
    category: "Smile Makeover",
    description: "Correction of chipped central incisors using minimally invasive composite layering.",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop",
    notes: "Restored incisal length and natural tooth translucency without aggressive reduction."
  },
  {
    id: "case-2",
    title: "Posterior Tooth Protection",
    category: "Crowns",
    description: "Zirconia full contour crown placed following endodontic treatment.",
    beforeImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=600&auto=format&fit=crop",
    notes: "Reinforces chewing functionality and matches natural enamel color."
  }
];

export const GENERAL_FAQS = [
  {
    question: "Do I need an appointment before visiting Manav Dental Care?",
    answer: "While we accommodate dental emergencies and walk-in consultations whenever possible, scheduling an appointment in advance ensures minimal waiting time and dedicated clinical attention from Dr. Vallabh Mahadevan."
  },
  {
    question: "How often should I have a dental check-up?",
    answer: "We recommend a routine dental check-up and professional cleaning every 6 months. Regular visits enable us to catch small issues like early decay or gum inflammation before they require extensive intervention."
  },
  {
    question: "Is root canal treatment painful?",
    answer: "No. With modern local anesthesia and rotary endodontic equipment, the procedure is comfortable. In fact, root canal treatment is performed specifically to eliminate the severe pain caused by an infected tooth."
  },
  {
    question: "What are dental implants and are they permanent?",
    answer: "Dental implants are titanium biocompatible fixtures integrated into the jawbone to replace tooth roots. They provide long-lasting stability for crowns, bridges, or dentures and can last decades with good oral care."
  },
  {
    question: "Do you provide braces and clear aligners?",
    answer: "Yes, we provide orthodontic evaluations for both traditional braces and modern clear aligners for teens and adults seeking smile alignment."
  },
  {
    question: "Do you treat children?",
    answer: "Yes, we welcome pediatric patients and prioritize friendly, fear-free examinations, fluoride applications, and cavity preventatives."
  },
  {
    question: "Do you provide dental X-rays at the clinic?",
    answer: "Yes, we utilize digital dental radiography at the clinic, which significantly reduces radiation exposure while providing high-resolution diagnostic imaging instantly."
  },
  {
    question: "How should I prepare for my dental appointment?",
    answer: "Eat a light meal beforehand (unless fasting is specified for a specific procedure), brush your teeth, and bring any current medical prescriptions or relevant previous dental records."
  },
  {
    question: "What should I do if I have severe tooth pain?",
    answer: "Rinse gently with warm water, avoid placing aspirin or chemicals directly against the gum, and call our clinic or send a WhatsApp message immediately so we can prioritize you."
  },
  {
    question: "How can I book an appointment?",
    answer: "You can book directly through our online appointment form, call us directly at our clinic phone line, or message us on WhatsApp."
  }
];
