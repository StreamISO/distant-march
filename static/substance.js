function print_substance() {
    if (current_page != 'menu1') return;
    if (scrollY != 0) scrollTo(0, 0);
    if (mach_broken) {
        if (velocity.low_get() >= 7.92e3) {
            document.getElementById('t_reset1').innerHTML = '落心来获得 ' + f_sci_num(break_mach_upgrade_formula(0, 0), 1) + ' 马赫点数, 并获得 ' + f_sci_num(break_mach_upgrade_formula(0, 1), 1) + ' 碎心';
        } else
            document.getElementById('t_reset1').innerHTML = '音爆来获得 ' + f_sci_num(break_mach_upgrade_formula(0, 0), 1) + ' 马赫点数 (' + f_sci_num(low_div(break_mach_upgrade_formula(0, 0), (statistics[3] / 6000))) + '/分)';
    }
    document.getElementById('t_booster_force').innerHTML = f_sci_num(booster_force);
    document.getElementById('t_counter_mult').innerHTML = sci_num(counter_mult);
    document.getElementById('t_turbo_mult').innerHTML = sci_num(turbo_mult);
    document.getElementById('t_flow_dec').innerHTML = sci_num(flow_dec * 100);
    document.getElementById('ss5i_val1').innerHTML = f_sci_num(stellar_charge);
    document.getElementById('ss5i_val2').innerHTML = f_sci_num(hard_limit, 1);
    if (stars_upgrade_unlocked[13]) document.getElementById('ss5i_val3').innerHTML = '与整流罩';
    else document.getElementById('ss5i_val3').innerHTML = '';
    if (break_mach_upgrade_unlocked[2][2])
        document.getElementById('t_flow_0_dec').innerHTML = ', E0 -' + sci_num(flow_0_dec * 100) + '%';
    for (let i = 1; i <= substance_category_cnt; i++) {
        document.getElementById('t_cnt' + String(i)).innerHTML = substance_cnt[i];
        if (i == 3) {
            if (break_mach_upgrade_unlocked[1][3]) {
                document.getElementById('t_turbo_reset').innerHTML = '';
            } else {
                document.getElementById('t_turbo_reset').innerHTML = '重置推进器与计数器数量, 速度与位移, ';
            }
            if (stars_upgrade_unlocked[25]) {
                document.getElementById('t_flow_reset').innerHTML = '';
            } else {
                document.getElementById('t_flow_reset').innerHTML = '重置推进器, 计数器与涡轮机数量, 速度与位移, ';
            }
            if (challenges_level[1] > 0) {
                document.getElementById('t_cnt' + String(i)).innerHTML += ' + ' + String(Math.floor(substance_cnt[3] * challenges_reward[1][challenges_level[1]] / 100.00));
            }
            if (substance_cnt[5] == 1) {
                document.getElementById('t_cnt3e').innerHTML = ' + ' + String(stars_formula(-1));
                if (stars_upgrade_unlocked[13]) {
                    document.getElementById('t_cnt4e').innerHTML = ' + ' + String(stars_formula(13));
                }
            } else {
                document.getElementById('t_cnt3e').innerHTML = '';
                document.getElementById('t_cnt4e').innerHTML = '';
            }
        }
        if (i == 3 || i == 4) {
            document.getElementById('b_ss' + String(i)).innerHTML = String(Math.floor(substance_cost[i].low_get())) + ' 推进器';
        } else if (i == 5 && substance_cnt[5] == 1) {
            document.getElementById('b_ss' + String(i)).innerHTML = '已购买';
        } else {
            document.getElementById('b_ss' + String(i)).innerHTML = f_sci_num(substance_cost[i]);
        }
    }
}
function substance_affordable(n) {
    if (n == 5 && substance_cnt[5] == 1) return false;
    if (n == 4) return substance_cnt[1] >= substance_cost[n].low_get() && (current_challenge != 4 && current_challenge != 6);
    if (n == 3) return substance_cnt[1] >= substance_cost[n].low_get() && !restriction_activated[4];
    return high_largere(distance, substance_cost[n]);
}
function buy_substance(n, op) {
    function small_reset() {
        substance_cnt[1] = 0;
        substance_cnt[2] = 0;
        substance_cost[1] = substance_base[1];
        distance = start_distance;
        velocity.to(0, 0), mass = base_mass;
    }
    if (destinies_unlocked[1] && n == 4 && substance_affordable(n)) {
        do {
            substance_cnt[n] += 1;
            star_challenge_2_dist_mult *= 0.998;
            substance_cost[n] = low_sub(substance_cost[n], substance_creep[n]);
        } while (substance_affordable(n));
        if (!stars_upgrade_unlocked[25]) {
            small_reset();
            substance_cnt[3] = 0;
        }
    } else if (mach_upgrade_unlocked[6][4] && n == 3 && substance_affordable(n)) {
        do {
            substance_cnt[n] += 1;
            star_challenge_2_dist_mult *= 0.998;
            substance_cost[n] = low_sub(substance_cost[n], substance_creep[n]);
        } while (substance_affordable(n));
        if (!break_mach_upgrade_unlocked[1][3])
            small_reset();
    } else {
        do {
            if (substance_affordable(n)) {
                if (n == 1 && current_challenge == 1) challenges_01_tick = 0;
                substance_cnt[n] += 1;
                star_challenge_2_dist_mult *= 0.998;
                if (n == 4) {
                    if (!stars_upgrade_unlocked[25]) {
                        small_reset();
                        substance_cnt[3] = 0;
                    }
                } else if (n == 3) {
                    if (!break_mach_upgrade_unlocked[1][3])
                        small_reset();
                } else
                    distance = high_sub(distance, substance_cost[n]);
                if (substance_creep[n] > 0) {
                    substance_cost[n] = low_mul(substance_cost[n], substance_creep[n]);
                } else if (n != 5)
                    substance_cost[n] = low_sub(substance_cost[n], substance_creep[n]);
            } else break;
        } while (op);
    }
}