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
  packageId: "0x95120f4f689ef4b8056c286373480dd84401a960794f6891585c1777b890cb61",
  adminCapId: "0xfe0c04b2708fd4c6c72f24eacd229542abbff7481beca4d0475c4589e36b5ccd",
  dashboardId: "0xe6fecf3c4d8e9a61923a9bce261f1b7ffdff414d6e2231e50d0ceb67fcb4d63f",
  numProposals: 3, // Specify the number of proposals to generate
};

// Generate the command
const ptbCommand = generatePTBCommand(inputs);
console.log(ptbCommand);
