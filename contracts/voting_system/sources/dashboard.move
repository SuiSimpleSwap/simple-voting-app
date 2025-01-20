
module voting_system::dashboard;

public struct Dashboard has key {
    id: UID,
    proposals_ids: vector<ID>
}

fun init(ctx: &mut TxContext) {
    new(ctx);
}

public fun new(ctx: &mut TxContext) {
    let dashboard = Dashboard {
        id: object::new(ctx),
        proposals_ids: vector[]
    };

    transfer::share_object(dashboard);
}

public fun register_proposal(self: &mut Dashboard, proposal_id: ID) {
    self.proposals_ids.push_back(proposal_id);
}
