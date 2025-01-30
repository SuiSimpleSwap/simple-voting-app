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
  packageId: "0x01fa087b355286482242d897e009141677dd7e66683de36a836ea3410e877090",
  adminCapId: "0xac2cfc37c1e540bfac3f13db201b16f8f518829f14a0db7c3d3d2841415eda2b",
  dashboardId: "0x51238d0bf9f360876237ea8ff5387644dbcab600adbc2d8018b0d308afa59f05",
  numProposals: 9, // Specify the number of proposals to generate
};

// Generate the command
const ptbCommand = generatePTBCommand(inputs);
console.log(ptbCommand);

