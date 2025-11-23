// Algerian Payroll Service - Legislation compliance (Code du Travail & Sécurité Sociale)

export interface PayrollCalculation {
  employeeName: string;
  baseSalary: number;
  allowances: AllowancesBreakdown;
  deductions: DeductionsBreakdown;
  grossSalary: number;
  netSalary: number;
  month: string;
}

export interface AllowancesBreakdown {
  housingAllowance?: number;
  transportAllowance?: number;
  mealAllowance?: number;
  responsibilityBonus?: number;
  other?: number;
  total: number;
}

export interface DeductionsBreakdown {
  cnss: number; // Caisse Nationale de Sécurité Sociale - 8%
  assuranceChomage: number; // Unemployment insurance - 0.5%
  irg: number; // Income Tax (Impôt sur le Revenu Global)
  other?: number;
  total: number;
}

export class PayrollService {
  /**
   * Calculate IRG (Income Tax) according to Algerian 2024 rates
   * Progressive tax system
   */
  private calculateIRG(taxableIncome: number): number {
    // Algerian progressive tax brackets (2024)
    if (taxableIncome <= 120000) return 0;
    if (taxableIncome <= 180000) return (taxableIncome - 120000) * 0.10;
    if (taxableIncome <= 540000) return 6000 + (taxableIncome - 180000) * 0.20;
    if (taxableIncome <= 1080000) return 78000 + (taxableIncome - 540000) * 0.30;
    return 240000 + (taxableIncome - 1080000) * 0.35;
  }

  /**
   * Calculate monthly payroll with all deductions and allowances
   */
  calculateMonthlyPayroll(
    employeeName: string,
    baseSalary: number,
    allowances: AllowancesBreakdown = { total: 0 },
    month: string
  ): PayrollCalculation {
    // Gross salary before deductions
    const grossSalary = baseSalary + allowances.total;

    // Mandatory Algerian social contributions (employer deducts from employee)
    const cnss = baseSalary * 0.08; // 8% CNSS
    const assuranceChomage = baseSalary * 0.005; // 0.5% Unemployment

    // IRG calculation
    const irg = this.calculateIRG(grossSalary);

    // Total deductions
    const totalDeductions = cnss + assuranceChomage + irg;

    // Net salary (take-home pay)
    const netSalary = grossSalary - totalDeductions;

    return {
      employeeName,
      baseSalary,
      allowances,
      deductions: {
        cnss,
        assuranceChomage,
        irg,
        total: totalDeductions,
      },
      grossSalary,
      netSalary,
      month,
    };
  }

  /**
   * Generate HTML payslip from payroll calculation
   */
  generatePayslipHTML(payroll: PayrollCalculation): string {
    const formatCurrency = (value: number) => `${value.toFixed(2)} DA`;

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Fiche de Paie - ${payroll.month}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
          .company-name { font-size: 18px; font-weight: bold; margin: 10px 0; }
          .payslip-title { font-size: 16px; font-weight: bold; margin: 10px 0; }
          .employee-info { margin-bottom: 20px; }
          .employee-info p { margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f9f9f9; font-weight: bold; }
          .amount { text-align: right; }
          .section-header { background-color: #f0f0f0; font-weight: bold; }
          .total-row { background-color: #e8f5e9; font-weight: bold; border-top: 2px solid #333; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
          .date-issued { text-align: right; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="company-name">Rail Electr & GCF</div>
            <div class="payslip-title">FICHE DE PAIE</div>
            <p>Mois: ${payroll.month}</p>
          </div>

          <div class="employee-info">
            <p><strong>Employé(e):</strong> ${payroll.employeeName}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>ELEMENTS DE SALAIRE</th>
                <th class="amount">MONTANT (DA)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Salaire de base</td>
                <td class="amount">${formatCurrency(payroll.baseSalary)}</td>
              </tr>
              ${payroll.allowances.housingAllowance ? `
              <tr>
                <td>Indemnité de logement</td>
                <td class="amount">${formatCurrency(payroll.allowances.housingAllowance)}</td>
              </tr>
              ` : ''}
              ${payroll.allowances.transportAllowance ? `
              <tr>
                <td>Indemnité de transport</td>
                <td class="amount">${formatCurrency(payroll.allowances.transportAllowance)}</td>
              </tr>
              ` : ''}
              ${payroll.allowances.mealAllowance ? `
              <tr>
                <td>Indemnité de repas</td>
                <td class="amount">${formatCurrency(payroll.allowances.mealAllowance)}</td>
              </tr>
              ` : ''}
              <tr class="section-header">
                <td>SALAIRE BRUT</td>
                <td class="amount">${formatCurrency(payroll.grossSalary)}</td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>DEDUCTIONS</th>
                <th class="amount">MONTANT (DA)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CNSS (8%)</td>
                <td class="amount">-${formatCurrency(payroll.deductions.cnss)}</td>
              </tr>
              <tr>
                <td>Assurance Chômage (0.5%)</td>
                <td class="amount">-${formatCurrency(payroll.deductions.assuranceChomage)}</td>
              </tr>
              <tr>
                <td>Impôt sur le Revenu Global (IRG)</td>
                <td class="amount">-${formatCurrency(payroll.deductions.irg)}</td>
              </tr>
              <tr class="total-row">
                <td>SALAIRE NET A PERCEVOIR</td>
                <td class="amount">${formatCurrency(payroll.netSalary)}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <p><strong>Observations:</strong></p>
            <ul>
              <li>Les cotisations sociales sont calculées selon le Code du Travail algérien</li>
              <li>L'IRG est appliqué selon le barème progressif 2024</li>
              <li>Cette fiche de paie est établie selon la législation algérienne en vigueur</li>
            </ul>
          </div>

          <div class="date-issued">
            <p>Établi à Hussein Dey, Alger</p>
            <p>Le: _________________</p>
            <p style="margin-top: 30px;">Signature Responsable RH</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const payrollService = new PayrollService();
