function fall_reset(rainbow = 0) {
    if (velocity.low_get() <= 7.92e3) return;
    unlock_achievements(1);
    if (statistics[3] < statistics[9]) statistics[9] = parseInt(statistics[3]);
    mach_point = high_add(mach_point, break_mach_upgrade_formula(0, 0, rainbow));
    broken_heart = high_add(broken_heart, break_mach_upgrade_formula(0, 1, rainbow));
    statistics[8] += 1;
    if (!rainbow)
        soft_reset();
}
function print_break_mach() {
    if (stars_upgrade_unlocked[6]) {
        max_level = 7;
        if (achievements_unlocked[19]) {
            break_mach_upgrade_unlocked[4][2] = 7;
            break_mach_upgrade_unlocked[4][3] = 7;
        }
    } else {
        max_level = 5;
        if (break_mach_upgrade_unlocked[4][2] > 5) break_mach_upgrade_unlocked[4][2] = 5;
        if (break_mach_upgrade_unlocked[4][3] > 5) break_mach_upgrade_unlocked[4][3] = 5;
    }
    if (current_page != 'menu4') return;
    document.getElementById('break_mhp_cnt').innerHTML = f_sci_num(mach_point, 1);
    document.getElementById('break_bh_cnt').innerHTML = f_sci_num(broken_heart, 1);
    if (broken_heart.low_get() >= 1) document.getElementById('break_bh_cnti').innerHTML = sci_num(break_mach_upgrade_formula(0, 2));
    document.getElementById('break_mhptextii_a').innerHTML = sci_num(air_force_a_mult, 0);
    document.getElementById('break_mhptextii_d').innerHTML = sci_num(air_force_d_mult, 0);
    document.getElementById('break_mhptextii_l').innerHTML = sci_num(air_force_l_mult, 0);
    document.getElementById('break_mhptextii_e0').innerHTML = sci_num(E0, 0);
    document.getElementById('break_mhptextii_e1').innerHTML = sci_num(1 + E1, 0);
    if (velocity.low_get() < 7.92e3) document.getElementById('break_mhptexti_mhp_mult').innerHTML = f_sci_num(mach_reset_base, 1);
    else if (velocity.low_get() < 1.00e5) document.getElementById('break_mhptexti_mhp_mult').innerHTML = f_sci_num(fall_mach_reset_base);
    else if (velocity.low_get() < 1.00e6) document.getElementById('break_mhptexti_mhp_mult').innerHTML = f_sci_num(star_mach_reset_base);
    else document.getElementById('break_mhptexti_mhp_mult').innerHTML = f_sci_num(star2_mach_reset_base);
    document.getElementById('b_break_machup22_val').innerHTML = sci_num(break_mach_upgrade_formula(2, 2));
    document.getElementById('b_break_machup31_val').innerHTML = sci_num(break_mach_upgrade_formula(3, 1));
    document.getElementById('b_break_machup33_val').innerHTML = sci_num(break_mach_upgrade_formula(3, 3));
    document.getElementById('b_break_machup42_val').innerHTML = sci_num(break_mach_upgrade_formula(4, 2), 0, 3);
    document.getElementById('b_break_machup43_val').innerHTML = sci_num(break_mach_upgrade_formula(4, 3));
    if (mach_broken == 1) document.getElementById('b_break_mach').innerHTML = '音障已突破', document.getElementById('b_break_mach').style.backgroundColor = '#ff9900';
    else document.getElementById('b_break_mach').innerHTML = '突破音障', document.getElementById('b_break_mach').style.backgroundColor = '';
    for (let i = 1; i <= break_mach_row; i++) {
        for (let j = 1; j <= break_mach_col; j++) {
            let str = '';
            if (i == 4 && (j == 2 || j == 3) && break_mach_upgrade_unlocked[i][j] < max_level && break_mach_upgrade_unlocked[i][j] != 0) {
                str = sci_num(break_mach_upgrade_cost[i][j], 1) + '马赫点数(已购买: ' + String(break_mach_upgrade_unlocked[i][j]) + '次)';
                document.getElementById('b_break_machup' + String(i) + String(j)).style.backgroundColor = '';
                document.getElementById('b_break_machup' + String(i) + String(j)).style.color = '';
            }
            else if (break_mach_upgrade_unlocked[i][j] == 0) {
                str = sci_num(break_mach_upgrade_cost[i][j], 1) + '马赫点数';
                document.getElementById('b_break_machup' + String(i) + String(j)).style.backgroundColor = '';
                document.getElementById('b_break_machup' + String(i) + String(j)).style.color = '';
            }
            else {
                document.getElementById('b_break_machup' + String(i) + String(j)).style.backgroundColor = '#ff9900';
                document.getElementById('b_break_machup' + String(i) + String(j)).style.color = '#000000';
            }
            document.getElementById('b_break_machup' + String(i) + String(j) + '_cost').innerHTML = str;
        }
    }
}
function switch_break_mach() {
    mach_broken = 1 - mach_broken;
}
function break_mach_upgradable(x, y) {
    if (x > 1 && break_mach_upgrade_unlocked[x - 1][y] == 0) return false;
    if (x == 4 && (y == 2 || y == 3) && break_mach_upgrade_unlocked[x][y] >= max_level) return false;
    if (break_mach_upgrade_unlocked[x][y] && (x != 4 || y == 1)) return false;
    if (mach_point.low_get() < break_mach_upgrade_cost[x][y]) return false;
    return true;
}
function break_mach_upgrade(x, y) {
    if (break_mach_upgradable(x, y)) {
        mach_point = low_sub(mach_point, break_mach_upgrade_cost[x][y]);
        if (x == 4 && (y == 2 || y == 3)) break_mach_upgrade_unlocked[x][y] += 1;
        else break_mach_upgrade_unlocked[x][y] = 1;
    }
}
function get_flow_cnt() {
    let res = substance_cnt[4];
    if (stars_upgrade_unlocked[13]) res += stars_formula(13);
    if (stars_upgrade_unlocked[5]) res *= stars_formula(5);
    res *= (1 + (challenges_reward[4][challenges_level[4]] / 100));
    if (stars_upgrade_unlocked[20]) res *= (1 + stars_formula(20) / 100.0);
    if (stars_upgrade_unlocked[38]) res *= (1 + stars_formula(38) / 100.0);
    if (blackhole_mode) res = 0;
    return res;
}
function get_bh() {
    let res = high_log10(broken_heart);
    res *= (break_mach_upgrade_formula(3, 1) * break_mach_upgrade_unlocked[3][1]);
    res *= (1 + 0.015 * (current_challenge == 3 || current_challenge == 6) * substance_cnt[4]);
    res *= (1 + 0.01 * challenges_reward[3][challenges_level[3]]);
    if (dream_mode) res *= dream_val;
    return res;
}
function break_mach_upgrade_formula(x, y, rainbow = 0) {//0,0 代表音爆计算公式; 0,1 代表落心计算公式; 0,2 代表碎心-E0公式
    let dv = new Float(7.92, 3), sv = new Float(1.00, 5), sv2 = new Float(1.00, 6);
    if (x == 0 && y == 0) {
        if (stars_upgrade_unlocked[24]) {
            mach_reset_step.to(3.13, 2);
            fall_mach_reset_step.to(3.13, 2);
            star_mach_reset_step.to(3.13, 2);
            star2_mach_reset_step.to(3.13, 2);
        } else {
            mach_reset_step.to(3.4, 2);
            fall_mach_reset_step.to(3.4, 2);
            star_mach_reset_step.to(3.4, 2);
            star2_mach_reset_step.to(3.4, 2);
        }
        let res = new Float(0, 0);
        if (current_challenge == 9) res = new Float(1, 0);
        if (velocity.low_get() <= 340.00) res = new Float(1, 0);
        else if (velocity.low_get() <= 7.92e3) res = high_pow(mach_reset_base, high_div(velocity, mach_reset_step));
        else if (velocity.low_get() <= 1.00e5) res = high_mul(high_pow(mach_reset_base, high_div(dv, mach_reset_step)), high_pow(fall_mach_reset_base, high_div(high_sub(velocity, dv), fall_mach_reset_step)));
        else if (velocity.low_get() <= 1.00e6) res = high_mul(high_mul(high_pow(mach_reset_base, high_div(dv, mach_reset_step)), high_pow(fall_mach_reset_base, high_div(high_sub(sv, dv), fall_mach_reset_step))), high_pow(star_mach_reset_base, high_div(high_sub(velocity, sv), star_mach_reset_step)));
        else res = high_mul(high_mul(high_mul(high_pow(mach_reset_base, high_div(dv, mach_reset_step)), high_pow(fall_mach_reset_base, high_div(high_sub(sv, dv), fall_mach_reset_step))), high_pow(star_mach_reset_base, high_div(high_sub(sv2, sv), star_mach_reset_step))), high_pow(star2_mach_reset_base, high_div(high_sub(velocity, sv2), star2_mach_reset_step)));
        if (rainbow && relative_upgrade_unlocked[3][2]) res = high_mul(res, relative_formula(32));
        if (dream_mode) res = low_pow(res, dream_val);
        return high_mul(mach_upgrade_formula(0, 0), res);
    } else if (x == 0 && y == 1) {
        let bh = low_pow(low_add(high_div(high_sub(velocity, dv), mach_reset_step), 1), break_mach_upgrade_formula(3, 2));
        if (stars_upgrade_unlocked[12]) bh = low_mul(bh, stars_formula(12));
        if (stars_upgrade_unlocked[25]) bh = low_mul(bh, stars_formula(25));
        if (stars_upgrade_unlocked[26]) bh = low_mul(bh, stars_formula(26));
        if (stars_upgrade_unlocked[27]) bh = low_mul(bh, stars_formula(27));
        if (rainbow && relative_upgrade_unlocked[3][2]) bh = high_mul(bh, relative_formula(32));
        if (dream_mode) bh = low_pow(bh, dream_val);
        return bh;
    } else if (x == 0 && y == 2) {
        if (blackhole_mode || broken_heart.low_get() <= 10.00) return 1;
        return Math.pow(broken_heart_0_dec, get_bh());
    } else if (x == 1 && y == 1) {
        return 0.5;
    } else if (x == 1 && y == 2) {
        return 0.85;
    } else if (x == 2 && y == 1) {
        return 1;
    } else if (x == 2 && y == 2) {
        return Math.pow(1 - flow_0_dec, get_flow_cnt());
    } else if (x == 2 && y == 3) {
        return 2;
    } else if (x == 3 && y == 1) {
        return 1 + achievements_level * 0.01;
    } else if (x == 3 && y == 2) {
        if (break_mach_upgrade_unlocked[3][2]) return 2;
        else return 1;
    } else if (x == 3 && y == 3) {
        if (statistics[5] <= 1) return 0;
        return Math.floor(Math.log2(statistics[5]));
    } else if (x == 4 && y == 2) {
        return 0.003 * break_mach_upgrade_unlocked[4][2];
    } else if (x == 4 && y == 3) {
        return 0.2 * break_mach_upgrade_unlocked[4][3];
    }
}