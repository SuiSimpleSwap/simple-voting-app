
module voting_system::dashboard;

public struct Dashboard has key {
    id: UID,
    proposals_ids: vector<ID>
}

public struct AdminCap has key {
    id: UID,
}

// hot potato pattern - struct with no abilities
// it cannot be stored, copied or discarded
public struct Potato {}

public struct ShoppingCart {
    items: vector<u64>
}

public struct DashboardConfig has drop {
    value: u64
}

public struct DASHBOARD has drop {}

fun init(otw: DASHBOARD, ctx: &mut TxContext) {
    let otw = otw;
    new(otw, ctx);

    transfer::transfer(
        AdminCap {id: object::new(ctx)},
        ctx.sender()
    );
}

public fun new(_otw: DASHBOARD, ctx: &mut TxContext) {
    let dashboard = Dashboard {
        id: object::new(ctx),
        proposals_ids: vector[]
    };

    let config = DashboardConfig {
        value: 100
    };

    let potato = Potato {};

    pass_potato(potato);
    consume_config(config);

    transfer::share_object(dashboard);
}

public fun checkout(shopping_cart: ShoppingCart) {

    payment(shopping_cart);
}

fun payment(shopping_cart: ShoppingCart) {
    let ShoppingCart { items } = shopping_cart;

}

fun pass_potato(potato: Potato) {
    pass_potato_2(potato);
}

fun pass_potato_2(potato: Potato) {
    let Potato {} = potato;
}

fun consume_config(_config: DashboardConfig) {

}

public fun register_proposal(self: &mut Dashboard, proposal_id: ID) {
    self.proposals_ids.push_back(proposal_id);
}

#[test_only]
public fun issue_admin_cap(ctx: &mut TxContext) {
    transfer::transfer(
        AdminCap {id: object::new(ctx)},
        ctx.sender()
    );
}

#[test]
fun test_module_init() {
    use sui::test_scenario;

    let creator = @0xCA;

    let mut scenario = test_scenario::begin(creator);
    {
        let otw = DASHBOARD{};
        init(otw, scenario.ctx());
    };

    scenario.next_tx(creator);
    {
        let dashboard = scenario.take_shared<Dashboard>();
        assert!(dashboard.proposals_ids.is_empty());
        test_scenario::return_shared(dashboard);
    };

    scenario.end();
}
