

const PROPOSAL_COUNT = 3;

const ProposalItem = () => {
  return (
    <div>
      <div>Title: Hello There</div>
      <div>Desc: What is your vote ?</div>
    </div>
  )
}

const ProposalView = () => {

  return (
    <div>
      { new Array(PROPOSAL_COUNT).fill(1).map((id) =>
        <ProposalItem key={id * Math.random()}/>
      )}
    </div>
  )
}

export default ProposalView;
