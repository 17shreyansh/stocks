const mongoose = require('mongoose');
const Page = require('../models/Page');
require('dotenv').config();

const investorCharterData = {
  name: 'investor-charter',
  title: 'Investor Charter',
  breadcrumb: 'Home › Investor Charter',
  sections: [
    {
      id: 'vision',
      title: 'Vision',
      type: 'text',
      content: 'To follow highest standards of ethics and compliances while facilitating the trading by clients in securities in a fair and transparent manner, so as to contribute in creation of wealth for investors.'
    },
    {
      id: 'mission',
      title: 'Mission',
      type: 'list',
      content: [
        'To provide high quality and dependable service through innovation, capacity enhancement and use of technology.',
        'To establish and maintain a relationship of trust and ethics with the investors.',
        'To observe highest standard of compliances and transparency.',
        'To always keep protection of investors interest as goal while providing service.'
      ]
    },
    {
      id: 'services',
      title: 'Services provided to investors',
      type: 'list',
      content: [
        'Execution of trades on behalf of investors.',
        'Issuance of Contract Notes.',
        'Issuance of intimations regarding margin due payments.',
        'Facilitate execution of early pay-in obligation instructions.',
        'Settlement of client\'s funds.',
        'Intimation of securities held in Client Unpaid Securities Account (CUSA) Account.',
        'Issuance of retention statement of funds.',
        'Risk management systems to mitigate operational and market risk.',
        'Facilitate client profile changes in the system as instructed by the client.',
        'Information sharing with the client w.r.t. exchange circulars.',
        'Redressal of Investor\'s grievances.'
      ]
    },
    {
      id: 'rights',
      title: 'Rights of Investors',
      type: 'list',
      content: [
        'Ask for and receive information from a firm about the work history and background of the person handling your account, as well as information about the firm itself.',
        'Receive complete information about the risks, obligations, and costs of any investment before investing.',
        'Receive recommendations consistent with your financial needs and investment objectives.',
        'Receive a copy of all completed account forms and agreements.',
        'Receive account statements that are accurate and understandable.',
        'Understand the terms and conditions of transactions you undertake.',
        'Access your funds in a timely manner and receive information about any restrictions or limitations on access.',
        'Receive complete information about maintenance or service charges, transaction or redemption fees, and penalties.',
        'Discuss your grievances with compliance officer of the firm and receive prompt attention to and fair consideration of your concerns.'
      ]
    },
    {
      id: 'grievance',
      title: 'Grievance Redressal Mechanism',
      type: 'text',
      content: '<strong>Level 1</strong> – Approach the Stock Broker at the designated Investor Grievance e-mail ID of the stock broker. The Stock Broker will strive to redress the grievance immediately, but not later than 30 days of the receipt of the grievance.<br><br><strong>Level 2</strong> - Approach the Stock Exchange using the grievance mechanism mentioned at the website of the respective exchange.<br><br><strong>Level 3</strong> – The complaint not redressed at Stock Broker / Stock Exchange level, may be lodged with SEBI on SCORES (a web based centralized grievance redressal system of SEBI) @ https://scores.gov.in/scores/Welcome.html'
    },
    {
      id: 'default-handling',
      title: 'Handling of Investor\'s claims / complaints in case of default of a Trading Member / Clearing Member (TM/CM)',
      type: 'text',
      content: 'Following steps are carried out by Stock Exchange for benefit of investor, in case stock broker defaults:<br><br>• Circular is issued to inform about declaration of Stock Broker as Defaulter.<br>• Information of defaulter stock broker is disseminated on Stock Exchange website.<br>• Public Notice is issued informing declaration of a stock broker as defaulter and inviting claims within specified period.<br>• Intimation to clients of defaulter stock brokers via emails and SMS for facilitating lodging of claims within the specified period.<br><br>Following information is available on Stock Exchange website for information of investors:<br><br>• Norms for eligibility of claims for compensation from IPF.<br>• Claim form for lodging claim against defaulter stock broker.<br>• FAQ on processing of investors\' claims against Defaulter stock broker.<br>• Provision to check online status of client\'s claim.'
    }
  ],
  tables: [
    {
      id: 'activities',
      title: 'Various activities of stock brokers with timelines',
      headers: ['S.No.', 'Activity', 'Expected Timelines'],
      rows: [
        ['1', 'KYC entered into KRA System and CKYCR', '10 days of account opening'],
        ['2', 'Client Onboarding', 'Immediate, but not later than one week'],
        ['3', 'Order execution', 'Immediate on receipt of order, but not later than the same day'],
        ['4', 'Allocation of Unique Client Code', 'Before trading'],
        ['5', 'Copy of duly completed Client Registration Documents to clients', '7 days from the date of upload of Unique Client Code to the Exchange by the trading member'],
        ['6', 'Issuance of contract notes', '24 hours of execution of trades'],
        ['7', 'Collection of upfront margin from client', 'Before initiation of trade'],
        ['8', 'Issuance of intimations regarding other margin due payments', 'At the end of the T day'],
        ['9', 'Settlement of client funds', '30 days / 90 days for running account settlement (RAS) as per the preference of client. If consent not given for RAS – within 24 hours of pay-out'],
        ['10', '\'Statement of Accounts\' for Funds, Securities and Commodities', 'Weekly basis (Within four trading days of following week)'],
        ['11', 'Issuance of retention statement of funds/commodities', '5 days from the date of settlement'],
        ['12', 'Issuance of Annual Global Statement', '30 days from the end of the financial year'],
        ['13', 'Investor grievances redressal', '30 days from the receipt of the complaint']
      ]
    },
    {
      id: 'dos-donts',
      title: 'DOs & DON\'Ts for investors',
      headers: ['S.No.', 'DOs', 'DON\'Ts'],
      rows: [
        ['1', 'Read all documents and conditions being agreed before signing the account opening form.', 'Do not deal with unregistered stock broker.'],
        ['2', 'Receive a copy of KYC, copy of account opening documents and Unique Client Code.', 'Do not forget to strike off blanks in your account opening and KYC'],
        ['3', 'Read the product / operational framework / timelines related to various Trading and Clearing & Settlement processes.', 'Do not submit an incomplete account opening and KYC form'],
        ['4', 'Receive all information about brokerage, fees and other charges levied.', 'Do not forget to inform any change in information linked to trading account and obtain confirmation of updation in the system.'],
        ['5', 'Register your mobile number and email ID in your trading, demat and bank accounts to get regular alerts on your transactions.', 'Do not transfer funds, for the purposes of trading to anyone other than a stock broker. No payment should be made in name of employee of stock broker'],
        ['6', 'If executed, receive a copy of Power of Attorney. However, Power of Attorney is not a mandatory requirement as per SEBI / Stock Exchanges. Before granting Power of Attorney, carefully examine the scope and implications of powers being granted.', 'Do not ignore any emails / SMSs received with regards to trades done, from the Stock Exchange and raise a concern, if discrepancy is observed.'],
        ['7', 'Receive contract notes for trades executed, showing transaction price, brokerage, GST and STT etc. as applicable, separately, within 24 hours of execution of trades.', 'Do not opt for digital contracts, if not familiar with computers'],
        ['8', 'Receive funds and securities / commodities on time within 24 hours from pay-out', 'Do not share trading password.'],
        ['9', 'Verify details of trades, contract notes and statement of account and approach relevant authority for any discrepancies. Verify trade details on the Exchange websites from the trade verification facility provided by the Exchanges.', 'Do not fall prey to fixed / guaranteed returns schemes.'],
        ['10', 'Receive statement of accounts periodically. If opted for running account settlement, account has to be settled by the stock broker as per the option given by the client (30 or 90 days).', 'Do not fall prey to fraudsters sending emails and SMSs luring to trade in stocks / securities promising huge profits.'],
        ['11', 'In case of any grievances, approach stock broker or Stock Exchange or SEBI for getting the same resolved within prescribed timelines.', 'Do not follow herd mentality for investments. Seek expert and professional advice for your investments.']
      ]
    },
    {
      id: 'complaint-timelines',
      title: 'Timelines for complaint resolution process at Stock Exchanges against stock brokers',
      headers: ['S.No.', 'Activity', 'Expected Timelines'],
      rows: [
        ['1', 'Receipt of Complaint', 'Day of complaint (C Day).'],
        ['2', 'Additional information sought from the investor, if any, and provisionally forwarded to stock broker.', 'C + 7 Working days.'],
        ['3', 'Registration of the complaint and forwarding to the stock broker', 'C+8 Working Days i.e. T day.'],
        ['4', 'Amicable Resolution.', 'T+15 Working Days.'],
        ['5', 'Refer to Grievance Redressal Committee (GRC), in case of no amicable resolution.', 'T+16 Working Days.'],
        ['6', 'Complete resolution process post GRC.', 'T + 30 Working Days.'],
        ['7', 'In case where the GRC Member requires additional information, GRC order shall be completed within.', 'T + 45 Working Days.'],
        ['8', 'Implementation of GRC Order.', 'On receipt of GRC Order, if the order is in favour of the investor, debit the funds of the stock broker. Order for debit is issued immediately or as per the directions given in GRC order.'],
        ['9', 'In case the stock broker is aggrieved by the GRC order, will provide intention to avail arbitration', 'Within 7 days from receipt of order.'],
        ['10', 'If intention from stock broker is received and the GRC order amount is upto Rs.20 lakhs', 'Investor is eligible for interim relief from Investor Protection Fund (IPF).The interim relief will be 50% of the GRC order amount or Rs.2 lakhs whichever is less. The same shall be provided after obtaining an Undertaking from the investor.'],
        ['11', 'Stock Broker shall file for arbitration', 'Within 6 months from the date of GRC recommendation'],
        ['12', 'In case the stock broker does not file for arbitration within 6 months', 'The GRC order amount shall be released to the investor after adjusting the amount released as interim relief, if any.']
      ]
    },
    {
      id: 'complaint-details',
      title: 'Annexure C - INVESTOR COMPLAINT DETAILS',
      headers: ['Month', 'Equity', 'F&O', 'DP'],
      rows: [['July 2025', '-', '-', '-']],
      downloadLinks: [
        { cell: 0, fileName: 'Investor Charter' },
        { cell: 1, fileName: 'Annexure A' },
        { cell: 2, fileName: 'Complaint Details' }
      ]
    }
  ]
};

async function seedInvestorCharter() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Page.findOneAndUpdate(
      { name: 'investor-charter' },
      investorCharterData,
      { upsert: true, new: true }
    );

    console.log('Investor Charter data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedInvestorCharter();