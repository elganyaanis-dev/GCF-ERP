import nodemailer from 'nodemailer';

// Configure nodemailer transporter
// Using environment variables or default SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: options.from || process.env.SMTP_FROM || 'erp@raileelectr-gcf.dz',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Algerian administrative document templates
export const documentTemplates = {
  attestationTravail: (nom: string, poste: string, dateDebut: string, dateEmission: string) => `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><title>Attestation de Travail</title></head>
    <body style="font-family:Arial;padding:40px">
      <div style="text-align:center;margin-bottom:30px">
        <h1>ATTESTATION DE TRAVAIL</h1>
      </div>
      <div style="margin:30px 0">
        <p>Je soussigne, Directeur de Rail Electr & GCF,</p>
        <p>Atteste par la présente que Monsieur/Madame <strong>${nom}</strong></p>
        <p>Occupant le poste de <strong>${poste}</strong></p>
        <p>Est employé(e) dans notre entreprise depuis le <strong>${dateDebut}</strong></p>
        <p>Son contrat est en cours.</p>
      </div>
      <div style="margin-top:50px">
        <p>La présente attestation est délivrée pour servir et valoir ce que de droit.</p>
      </div>
      <div style="margin-top:50px;text-align:right">
        <p>Établi à Hussein Dey, Alger</p>
        <p>Le ${dateEmission}</p>
        <p style="margin-top:50px">_________________</p>
        <p>Direction Générale</p>
      </div>
    </body>
    </html>
  `,

  fichePaie: (nom: string, mois: string, salaireBrut: number, cotisations: number, salaireNet: number) => `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><title>Fiche de Paie</title></head>
    <body style="font-family:Arial;padding:20px;background:#f5f5f5">
      <div style="background:white;padding:30px;margin:20px auto;max-width:600px">
        <div style="text-align:center;margin-bottom:30px;border-bottom:2px solid #333;padding-bottom:20px">
          <h1>FICHE DE PAIE</h1>
          <p style="margin:5px">Rail Electr & GCF</p>
          <p style="margin:5px;color:#666">Mois: ${mois}</p>
        </div>
        
        <div style="margin:20px 0">
          <p><strong>Employé(e):</strong> ${nom}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr style="border-bottom:1px solid #ddd">
            <td style="padding:10px"><strong>Rubriques</strong></td>
            <td style="padding:10px;text-align:right"><strong>Montant (DA)</strong></td>
          </tr>
          <tr style="background:#f9f9f9">
            <td style="padding:10px">Salaire de base</td>
            <td style="padding:10px;text-align:right">${salaireBrut.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding:10px"><strong>Total Cotisations Sociales</strong></td>
            <td style="padding:10px;text-align:right;color:red"><strong>-${cotisations.toFixed(2)}</strong></td>
          </tr>
          <tr style="background:#e8f5e9;border-top:2px solid #333;border-bottom:2px solid #333">
            <td style="padding:10px"><strong>SALAIRE NET A PERCEVOIR</strong></td>
            <td style="padding:10px;text-align:right"><strong>${salaireNet.toFixed(2)}</strong></td>
          </tr>
        </table>

        <div style="margin-top:30px;font-size:12px;color:#666">
          <p>Détail cotisations:</p>
          <ul>
            <li>CNSS: 8%</li>
            <li>Assurance chômage: 0.5%</li>
            <li>Impôt sur le revenu: À déterminer selon barème</li>
          </ul>
        </div>

        <div style="margin-top:30px;text-align:right;color:#666;font-size:11px">
          <p>Établi à Hussein Dey, Alger</p>
          <p>Signature Autorisée</p>
        </div>
      </div>
    </body>
    </html>
  `,

  ordreDeService: (numero: string, nom: string, affectation: string, dateEffet: string) => `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><title>Ordre de Service</title></head>
    <body style="font-family:Arial;padding:40px;max-width:700px;margin:0 auto">
      <div style="text-align:center;margin-bottom:30px;border-bottom:2px solid #000;padding-bottom:15px">
        <h2>ORDRE DE SERVICE N°${numero}</h2>
        <p style="margin:5px">Rail Electr & GCF</p>
        <p style="margin:5px">Direction Générale - Hussein Dey, Alger</p>
      </div>
      
      <div style="margin:30px 0">
        <p><strong>OBJET:</strong> Affectation du personnel</p>
      </div>

      <div style="margin:30px 0;line-height:1.8">
        <p>Par le présent ordre de service, nous informons que:</p>
        <p style="margin:15px 0;padding:15px;background:#f5f5f5">
          Monsieur/Madame <strong>${nom}</strong><br/>
          Est affecté(e) au poste de <strong>${affectation}</strong><br/>
          À compter du <strong>${dateEffet}</strong>
        </p>
      </div>

      <div style="margin:30px 0">
        <p>Cet ordre prend effet à compter de la date indiquée ci-dessus. L'intéressé(e) est prié(e) de prendre connaissance de ses nouvelles fonctions et responsabilités.</p>
      </div>

      <div style="margin-top:50px">
        <div style="display:inline-block;width:45%;">
          <p>Pour l'Administration,</p>
          <p style="margin-top:40px">_________________</p>
          <p>Le Directeur Général</p>
        </div>
        <div style="display:inline-block;width:45%;text-align:right">
          <p>L'intéressé(e) accuse réception,</p>
          <p style="margin-top:40px">_________________</p>
          <p>Signature et Cachet</p>
        </div>
      </div>
    </body>
    </html>
  `,

  certificatAdhesion: (nom: string, regime: string, dateAdhesion: string) => `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><title>Certificat d'Adhésion</title></head>
    <body style="font-family:Arial;padding:40px">
      <div style="text-align:center;margin-bottom:30px">
        <h1>CERTIFICAT D'ADHESION A LA SECURITE SOCIALE</h1>
      </div>
      <div style="margin:30px 0">
        <p>Nous certifions que Monsieur/Madame <strong>${nom}</strong></p>
        <p>Est assuré(e) social(e) depuis le <strong>${dateAdhesion}</strong></p>
        <p>Sous le régime: <strong>${regime}</strong></p>
      </div>
      <div style="margin-top:50px">
        <p>Ce certificat est délivré sur demande et pour servir et valoir ce que de droit.</p>
      </div>
      <div style="margin-top:50px;text-align:right">
        <p>Établi à Hussein Dey, Alger</p>
        <p style="margin-top:40px">_________________</p>
        <p>Responsable RH</p>
      </div>
    </body>
    </html>
  `,
};

export type DocumentTemplate = keyof typeof documentTemplates;
