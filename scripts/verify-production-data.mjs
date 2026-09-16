/**
 * MANAV DENTAL CARE — PRODUCTION DATA VERIFICATION SCRIPT
 * Audits all 18 clinic data points, flags placeholders, and validates production readiness.
 *
 * Usage:
 *   node scripts/verify-production-data.mjs
 *   STRICT_PRODUCTION_VERIFICATION=true node scripts/verify-production-data.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Load .env or .env.local if present
const envLocalPath = path.join(projectRoot, '.env.local');
const envPath = path.join(projectRoot, '.env');

function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const key = trimmed.substring(0, idx).trim();
          let val = trimmed.substring(idx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  }
}

loadEnvFile(envLocalPath);
loadEnvFile(envPath);

const KNOWN_PLACEHOLDER_STRINGS = [
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

function isPlaceholder(val) {
  if (!val || typeof val !== 'string' || val.trim() === '') return false;
  const clean = val.toLowerCase().replace(/[\s\-\(\)\+]/g, '');
  return KNOWN_PLACEHOLDER_STRINGS.some(pattern => {
    const cleanPattern = pattern.toLowerCase().replace(/[\s\-\(\)\+]/g, '');
    return clean.includes(cleanPattern);
  });
}

// 18-point audit definition
const envPhone = process.env.NEXT_PUBLIC_CLINIC_PHONE;
const envDisplayPhone = process.env.NEXT_PUBLIC_CLINIC_DISPLAY_PHONE;
const envWhatsapp = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP;
const envEmail = process.env.NEXT_PUBLIC_CLINIC_EMAIL;
const envAddress = process.env.NEXT_PUBLIC_CLINIC_ADDRESS;
const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const envGoogleMaps = process.env.NEXT_PUBLIC_CLINIC_GOOGLE_MAPS;
const envGoogleMapsEmbed = process.env.NEXT_PUBLIC_CLINIC_GOOGLE_MAPS_EMBED;
const envInstagram = process.env.NEXT_PUBLIC_CLINIC_INSTAGRAM;
const envFacebook = process.env.NEXT_PUBLIC_CLINIC_FACEBOOK;
const envRegNo = process.env.NEXT_PUBLIC_DR_VALLABH_REG_NO;
const strictMode = process.env.STRICT_PRODUCTION_VERIFICATION === 'true';

const auditItems = [
  {
    id: 1,
    name: 'Official clinic name',
    status: 'VERIFIED',
    value: 'MANAV DENTAL CARE',
    notes: 'Verified directly from client specification'
  },
  {
    id: 2,
    name: 'Exact clinic address',
    status: (envAddress && !isPlaceholder(envAddress)) ? 'VERIFIED' : 'REQUIRES CLINIC CONFIRMATION',
    value: envAddress || 'Manav Dental Care, Rajiv Gandhi Salai (OMR), Padur, Chennai, Tamil Nadu 603103',
    notes: 'Locality & Pincode verified; specific door/plot number requires confirmation'
  },
  {
    id: 3,
    name: 'Official telephone number',
    status: (envPhone && !isPlaceholder(envPhone)) ? 'VERIFIED' : 'PLACEHOLDER',
    value: envPhone || envDisplayPhone || 'NOT CONFIGURED',
    notes: 'Requires genuine clinic number'
  },
  {
    id: 4,
    name: 'Official WhatsApp number',
    status: (envWhatsapp && !isPlaceholder(envWhatsapp)) ? 'VERIFIED' : 'PLACEHOLDER',
    value: envWhatsapp || 'NOT CONFIGURED',
    notes: 'Requires genuine clinic WhatsApp'
  },
  {
    id: 5,
    name: 'Official email',
    status: (envEmail && !isPlaceholder(envEmail)) ? 'VERIFIED' : 'PLACEHOLDER',
    value: envEmail || 'NOT CONFIGURED',
    notes: 'Requires operational mailbox'
  },
  {
    id: 6,
    name: 'Official website domain',
    status: 'REQUIRES CLINIC CONFIRMATION',
    value: envSiteUrl || 'https://manavdentalcare.com',
    notes: 'Assigned domain subject to clinic DNS and registrar confirmation'
  },
  {
    id: 7,
    name: 'Google Business Profile URL',
    status: (envGoogleMaps && !isPlaceholder(envGoogleMaps)) ? 'VERIFIED' : 'REQUIRES CLINIC CONFIRMATION',
    value: envGoogleMaps || 'https://www.google.com/maps/search/?api=1&query=Manav+Dental+Care+Padur+OMR+Chennai',
    notes: 'Currently using geographic search query fallback; requires direct verified Place CID link'
  },
  {
    id: 8,
    name: 'Google Maps location embed',
    status: (envGoogleMapsEmbed && !isPlaceholder(envGoogleMapsEmbed)) ? 'VERIFIED' : 'REQUIRES CLINIC CONFIRMATION',
    value: envGoogleMapsEmbed ? 'Verified custom embed' : 'Padur OMR regional centroid embed',
    notes: 'Requires verified Google Maps pin iframe embed URL'
  },
  {
    id: 9,
    name: 'Apple Maps URL',
    status: 'REQUIRES CLINIC CONFIRMATION',
    value: 'https://maps.apple.com/?q=Manav+Dental+Care+Padur+OMR+Chennai',
    notes: 'Currently query fallback; Apple Business Connect listing requires confirmation'
  },
  {
    id: 10,
    name: 'Opening hours',
    status: 'REQUIRES CLINIC CONFIRMATION',
    value: 'Mon–Sat: 9:30 AM – 1:30 PM, 5:00 PM – 8:30 PM; Sun: 10:00 AM – 1:30 PM',
    notes: 'Standard clinic consultation shifts configured; requires doctor approval'
  },
  {
    id: 11,
    name: 'Doctor full name',
    status: 'VERIFIED',
    value: 'Dr. Vallabh Mahadevan',
    notes: 'Verified directly from client specification'
  },
  {
    id: 12,
    name: 'Doctor qualifications',
    status: 'VERIFIED',
    value: 'BDS (Clinical Dentistry)',
    notes: 'Verified clinical degree. No unverified certifications or awards invented'
  },
  {
    id: 13,
    name: 'Doctor specialization',
    status: 'VERIFIED',
    value: 'Comprehensive Restorative & General Dentistry',
    notes: 'Verified clinical specialization scope'
  },
  {
    id: 14,
    name: 'Doctor experience',
    status: 'REQUIRES CLINIC CONFIRMATION',
    value: 'Experienced Practitioner',
    notes: 'Exact graduation year and numerical years in practice withheld to avoid false claims'
  },
  {
    id: 15,
    name: 'Dental Council registration details',
    status: envRegNo ? 'VERIFIED' : 'REQUIRES CLINIC CONFIRMATION',
    value: envRegNo || 'Pending clinic submission (NEXT_PUBLIC_DR_VALLABH_REG_NO)',
    notes: 'State Dental Council / DCI registration number requires clinic submission'
  },
  {
    id: 16,
    name: 'Official Instagram',
    status: (envInstagram && !isPlaceholder(envInstagram)) ? 'VERIFIED' : 'UNVERIFIED',
    value: envInstagram || 'None (dummy @manavdentalcare link disabled)',
    notes: 'Placeholder removed to avoid linking to inactive or unverified account'
  },
  {
    id: 17,
    name: 'Official Facebook',
    status: (envFacebook && !isPlaceholder(envFacebook)) ? 'VERIFIED' : 'UNVERIFIED',
    value: envFacebook || 'None (dummy manavdentalcare link disabled)',
    notes: 'Placeholder removed to avoid linking to inactive or unverified account'
  },
  {
    id: 18,
    name: 'Official other social accounts',
    status: 'UNVERIFIED',
    value: 'None configured',
    notes: 'No YouTube, LinkedIn, or other accounts registered'
  }
];

console.log('================================================================');
console.log('       MANAV DENTAL CARE — PRODUCTION DATA VERIFICATION AUDIT    ');
console.log('================================================================\n');

const verified = [];
const unverified = [];
const placeholder = [];
const requiresConfirmation = [];

auditItems.forEach(item => {
  if (item.status === 'VERIFIED') verified.push(item);
  else if (item.status === 'PLACEHOLDER') placeholder.push(item);
  else if (item.status === 'UNVERIFIED') unverified.push(item);
  else if (item.status === 'REQUIRES CLINIC CONFIRMATION') requiresConfirmation.push(item);

  console.log(`[${item.status}] ${item.id}. ${item.name}`);
  console.log(`   Value: ${item.value}`);
  console.log(`   Notes: ${item.notes}`);
  console.log('----------------------------------------------------------------');
});

console.log('\n================================================================');
console.log('                   AUDIT SUMMARY BY CATEGORY                    ');
console.log('================================================================');

console.log(`\n1. VERIFIED (${verified.length} items):`);
verified.forEach(i => console.log(`   • ${i.name}: "${i.value}"`));

console.log(`\n2. PLACEHOLDER (${placeholder.length} items):`);
placeholder.forEach(i => console.log(`   • [ACTION REQUIRED] ${i.name}: "${i.value}"`));

console.log(`\n3. REQUIRES CLINIC CONFIRMATION (${requiresConfirmation.length} items):`);
requiresConfirmation.forEach(i => console.log(`   • ${i.name}: ${i.notes}`));

console.log(`\n4. UNVERIFIED (${unverified.length} items):`);
unverified.forEach(i => console.log(`   • ${i.name}: ${i.notes}`));

console.log('\n================================================================');

if (placeholder.length > 0) {
  console.log(`\n⚠️  PRODUCTION WARNING: ${placeholder.length} PLACEHOLDER VALUE(S) DETECTED!`);
  console.log('   The following contact points must be set via environment variables');
  console.log('   or verified before deploying to production:');
  placeholder.forEach(p => console.log(`   - ${p.name}`));
  
  if (strictMode) {
    console.error('\n❌ STRICT PRODUCTION CHECK FAILED: Cannot deploy with placeholder contact details.');
    process.exit(1);
  } else {
    console.log('\nℹ️  Non-strict mode: Set STRICT_PRODUCTION_VERIFICATION=true to enforce strict blocking.');
  }
} else {
  console.log('\n✅ All contact details are free of known placeholder values.');
}

process.exit(0);
