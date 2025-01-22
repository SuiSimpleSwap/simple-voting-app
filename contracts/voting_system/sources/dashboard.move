
module voting_system::dashboard;

public struct Dashboard has key {
    id: UID,
    proposals_ids: vector<ID>
}

public struct AdminCap has key {
    id: UID,
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

    transfer::share_object(dashboard);
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

use std::debug;

// public struct Container has copy, drop {
//     value: u64,
// }

public struct Car has drop {}

#[test]
fun playing_around() {
    // primitive types are numbers, booleans and address and also vector if it contain primitive type
    // primitive types are copied, they have Copy and Drop ability
    // let mut a = 10;
    // let mut b = a;

    // a = a + 2;
    // b = a * 2;

    // debug::print(&b"------a------".to_string());
    // debug::print(&a);

    // debug::print(&b"------b------".to_string());
    // debug::print(&b);

    // let mut a = 10;
    // let b = &mut a;

    // *b = 200;

    // debug::print(&b"------b------".to_string());
    // debug::print(&*b);

    // debug::print(&b"------a------".to_string());
    // debug::print(&a);

    // let a = Container { value: 10};
    // let mut b = a;

    // b.value = 1000;

    // debug::print(&b"------b------".to_string());
    // debug::print(&b.value);

    // let Container { value: _} = b;

    // let mut a = Container { value: 10};
    // let b = &mut a;

    // b.value = 1000;

    // debug::print(&b"------b------".to_string());
    // debug::print(&b.value);

    // debug::print(&b"------a------".to_string());
    // debug::print(&a.value);

    // let Container { value: _} = a;

    // let mut a = Container {value: 10};
    // let mut b = a;

    // a.value = 100;
    // b.value = 200;

    // debug::print(&b"------a------".to_string());
    // debug::print(&a.value);

    // debug::print(&b"------b------".to_string());
    // debug::print(&b.value);

    let new_car = Car{};

    rent_car(&new_car);

    debug::print(&new_car);
}

fun rent_car(car: &Car) {

}
