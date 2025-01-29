const generatePTBCommand = ({ packageId, adminCapId, dashboardId, numProposals }) => {
  let command = "sui client ptb";

  for (let i = 1; i <= numProposals; i++) {
    // Generate timestamp: current date + 1 year + incremental seconds
    const currentDate = new Date();
    const oneYearFromNow = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    const timestamp = oneYearFromNow.getTime() + i * 1000; // Add 1 second per proposal
    const timestampId = Math.floor(Math.random() * 100000 * i);

    const title = `Proposal ${timestampId}`;
    const description = `Proposal description ${timestampId}`;

    // Add proposal creation command
    command += ` \\
  --move-call ${packageId}::proposal::create \\
  @${adminCapId} \\
  '"${title}"' '"${description}"' ${timestamp} \\
  --assign proposal_id`;

    // Add dashboard registration command
    command += ` \\
  --move-call ${packageId}::dashboard::register_proposal \\
  @${dashboardId} \\
  @${adminCapId} proposal_id`;
  }

  return command;
};

// Inputs
const inputs = {
  packageId: "0x058171d13219e409423faf756b48abbe6f50c6f902e5ba39efa3b7524321b9f6",
  adminCapId: "0x7c09192cf36d236fc0d8c0885ae6e20c58644fceff8d72a3b2cc7285dc3cbedf",
  dashboardId: "0x592fc09dddf7217aa3e47471fc72aae92760c890a82056dff0be818b8e73f8f0",
  numProposals: 3, // Specify the number of proposals to generate
};

// Generate the command
const ptbCommand = generatePTBCommand(inputs);
console.log(ptbCommand);
